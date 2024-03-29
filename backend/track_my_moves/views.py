from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import user_passes_test
from django.urls import reverse
from rest_framework import serializers, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema

from .activityRecognition import manageModelAI

from .models.account import Account
from .models.activity_type import ActivityType
from .models.sensors_interval import SensorsInterval
from .models.activity_interval import ActivityInterval
from .models.activity import Activity
from .models.user import User
from .serializers import UserSerializer, AccountSerializer, ActivityTypeSerializer, SensorsIntervalSerializer, ActivityIntervalSerializer, ActivitySerializer
from .activityRecognition import ManageActivityAI

####################################################################################################
#   Partie application
####################################################################################################

APP_DIR_PATH = "track_my_moves/"

def adminUser(user):
    return user.is_authenticated and user.is_superuser and user.is_active

def home(request):
    user = request.user
    if adminUser(user):
        # utilisateur connecté
        return HttpResponseRedirect("usersAdmin")
    else:
        return HttpResponseRedirect("logIn")

def logIn(request):
    if request.method == "POST":
        logInEmail = request.POST["logInEmail"]
        logInPassword = request.POST["logInPassword"]
        
        user = authenticate(request, username=logInEmail, password=logInPassword)
        if user is not None:
            if user.is_superuser and user.is_active:
                login(request, user)
                account = Account.objects.get(user_id=user.id)
                return HttpResponseRedirect(reverse("usersAdminStats", kwargs={"accountId": account.id}))
            alertLogIn = "You don't have required permissions"
        else:
            alertLogIn = "Log in failed, please retry"
            
        return render(request, APP_DIR_PATH + "logIn.html", {"alertLogIn": alertLogIn})
    
    return render(request, APP_DIR_PATH + "logIn.html")

def logOut(request):
    logout(request)
    return HttpResponseRedirect("logIn")

@user_passes_test(adminUser, login_url="logIn")
def usersAdmin(request):
    account = Account.objects.get(user_id=request.user.id)
    return HttpResponseRedirect(reverse("usersAdminStats", kwargs={"accountId": account.id}))

def getActivitiesCount(activities):
    activitiesCount = []
    
    for activityType in ActivityType.objects.all():
        count = activities.filter(activity_type_id=activityType.id).count()
        if count > 0:
            activitiesCount.append([activityType.label, count])
    
    return activitiesCount

def getNbDistinctActivities(activitiesCount):
    nb = 0
    
    for count in activitiesCount:
        if count[1] > 0:
            nb += 1
    return nb

def getMostActivities(activitiesCount):
    max = 0
    best = ""
    
    for count in activitiesCount:
        if count[1] > max:
            best = count[0]
            max = count[1]
    return best

@user_passes_test(adminUser, login_url="logIn")
def usersAdminStats(request, accountId):
    adminId = Account.objects.get(user_id=request.user.id).id
    currentAccount = Account.objects.get(id=accountId)
    
    if request.method == "POST":
        if "delete" in request.POST:
            currentAccount.user.delete()
            return HttpResponseRedirect(reverse("usersAdminStats", kwargs={"accountId": adminId}))
        elif "resetPassword" in request.POST:
            currentAccount.user.set_password("ResetPassword")
        else:
            currentAccount.user.is_superuser = "isSuperuser" in request.POST
            currentAccount.user.is_active = "isActive" in request.POST
        currentAccount.user.save()
    
    accounts = Account.objects.all()
    
    currentStats = {"lastLogin": currentAccount.user.last_login}
    userActivities = Activity.objects.filter(user_id=currentAccount.user_id)
    currentStats["totalActivities"] = userActivities.count()
    currentStats["activitiesCount"] = getActivitiesCount(userActivities)
    currentStats["distinctActivities"] = getNbDistinctActivities(currentStats["activitiesCount"])
    currentStats["mostActivities"] = getMostActivities(currentStats["activitiesCount"])
    
    return render(request, APP_DIR_PATH + "usersAdmin.html", {"accounts": accounts, "adminId": adminId, "currentAccount": currentAccount, "currentStats": currentStats})


####################################################################################################
#   Partie API Rest
####################################################################################################

@swagger_auto_schema(method="POST", request_body=AccountSerializer())
@api_view(['POST'])
def registerAPIViewDeco(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method="POST", request_body=UserSerializer(), responses={200: '{"token": apiToken, "account": AccountObject}', 400: "Error message"})
@api_view(['POST'])
def logInAPIViewDeco(request):
    logInEmail = request.data["email"]
    logInPassword = request.data["password"]
    
    user = authenticate(request, username=logInEmail, password=logInPassword)
    if user is not None:
        login(request, user)
        
        token, created = Token.objects.get_or_create(user=user)
        account = Account.objects.get(user_id=user.id)
        serializer = AccountSerializer(account)
        return Response({"token": token.key, "account": serializer.data}, status=status.HTTP_200_OK)
    
    users = User.objects.filter(email=logInEmail)
    if users.count() == 0: # wrong email => 0 user found
        return Response({"message": "enter a valid e-mail address."}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"message": "enter a valid password."}, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method="GET", security=[{'Bearer': []}], responses={200: "log out successed", 401: "Error: Unauthorized"})
@api_view()
@permission_classes([IsAuthenticated])
def logOutAPIViewDeco(request):
    current_token = Token.objects.get(user=request.user)
    
    current_token.delete()
    logout(request)
    return Response({"message": "log out successed"}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet):
    
    @swagger_auto_schema(responses={200: UserSerializer(many=True)})
    def list(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # def create(self, request):
    #     serializer = UserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def retrieve(self, request, pk):
    #     user = User.objects.get(id=pk)
    #     serializer = UserSerializer(user)
    #     return Response(serializer.data, status=status.HTTP_200_OK)
    
    # def update(self, request, pk):
    #     user = User.objects.get(id=pk)
    #     serializer = UserSerializer(user, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def partial_update(self, request, pk):
    #     user = User.objects.get(id=pk)
    #     serializer = UserSerializer(user, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def destroy(self, request, pk):
    #     user = User.objects.get(id=pk)
    #     user.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)


class AccountViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    # def list(self, request):
    #     accounts = Account.objects.all()
    #     serializer = AccountSerializer(accounts, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)
    
    # def create(self, request):
    #     serializer = AccountSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(security=[{'Bearer': []}], responses={200: AccountSerializer(), 401: "Error: Unauthorized"})
    def retrieve(self, request, pk):
        """Retrieve the current account (ignore id in request)"""
        
        account = Account.objects.get(user_id=request.user.id)
        serializer = AccountSerializer(account)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(security=[{'Bearer': []}], request_body=AccountSerializer(), responses={401: "Error: Unauthorized"})
    def update(self, request, pk):
        account = Account.objects.get(id=pk)
        serializer = AccountSerializer(account, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(security=[{'Bearer': []}], request_body=AccountSerializer(partial=True), responses={401: "Error: Unauthorized"})
    def partial_update(self, request, pk):
        account = Account.objects.get(id=pk)
        serializer = AccountSerializer(account, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(security=[{'Bearer': []}], responses={401: "Error: Unauthorized", 406: "as an admin, you can only delete your account through the admin website."})
    def destroy(self, request, pk):
        current_token = Token.objects.get(user=request.user)
        current_token.delete()
        
        account = Account.objects.get(id=pk)
        user = account.user
        if (not user.is_superuser):
            account.delete()
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"message": "as an admin, you can only delete your account through the admin website."}, status=status.HTTP_406_NOT_ACCEPTABLE)


class ActivityTypeViewSet(viewsets.ViewSet):
    
    @swagger_auto_schema(responses={200: ActivityTypeSerializer(many=True)})
    def list(self, request):
        activityTypes = ActivityType.objects.all()
        serializer = ActivityTypeSerializer(activityTypes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(request_body=ActivityTypeSerializer())
    def create(self, request):
        serializer = ActivityTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(responses={200: ActivityTypeSerializer()})
    def retrieve(self, request, pk):
        activityType = ActivityType.objects.get(id=pk)
        serializer = ActivityTypeSerializer(activityType)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(request_body=ActivityTypeSerializer())
    def update(self, request, pk):
        activityType = ActivityType.objects.get(id=pk)
        serializer = ActivityTypeSerializer(activityType, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(request_body=ActivityTypeSerializer(partial=True))
    def partial_update(self, request, pk):
        activityType = ActivityType.objects.get(id=pk)
        serializer = ActivityTypeSerializer(activityType, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk):
        activityType = ActivityType.objects.get(id=pk)
        activityType.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def addSensorsToInterval(sensors_data, interval_id):
    for sensor_data in sensors_data:
        serializer = SensorsIntervalSerializer(data={**sensor_data, "interval": interval_id})
        if serializer.is_valid():
            serializer.save()
        else:
            return serializer.errors
    return {}

def addIntervalsToActivity(intervals_data, activity_id):
    for interval_data in intervals_data:
        sensors_data = interval_data.pop("sensors_intervals")
        
        interval_serializer = ActivityIntervalSerializer(data={**interval_data, "activity": activity_id})
        if interval_serializer.is_valid():
            interval_serializer.save()
            
            # Add all sensors intervals with the new interval_id
            addSensors_errors = addSensorsToInterval(sensors_data, interval_serializer.data["id"]);
            
            # Sensors have an error when adding
            if (addSensors_errors != {}):
                return {"sensors_interval": addSensors_errors}
        else:
            return {"interval": interval_serializer.errors}
    return {}

def getSerializedActivityIntervals(activity_id):
    intervals_data = []
    intervals = ActivityInterval.objects.filter(activity=activity_id)
    intervals_serializer = ActivityIntervalSerializer(intervals, many=True)
    
    for interval in intervals_serializer.data:
        sensors = SensorsInterval.objects.filter(interval=interval["id"])
        sensors_serializer = SensorsIntervalSerializer(sensors, many=True)
        intervals_data.append({**interval, "sensors_intervals": sensors_serializer.data})
    
    return intervals_data

class ActivityViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(security=[{'Bearer': []}], responses={200: ActivitySerializer(many=True), 401: "Error: Unauthorized"})
    def list(self, request):
        """Send all user activities, without intervals"""
        user = request.user
        activities = Activity.objects.filter(user_id=user.id)
        serializer = ActivitySerializer(activities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(security=[{'Bearer': []}], request_body=ActivitySerializer(), responses={401: "Error: Unauthorized"})
    def create(self, request):
        """Create activity with its intervals"""
        intervals_data = request.data.pop("intervals")
        
        activity_serializer = ActivitySerializer(data=request.data)
        if activity_serializer.is_valid():
            activity_serializer.save();
            
            # Add all intervals with the new activity_id
            addIntervals_errors = addIntervalsToActivity(intervals_data, activity_serializer.data["id"]);
            
            # all intervals added without error
            if (addIntervals_errors == {}):
                serialized_intervals = getSerializedActivityIntervals(activity_serializer.data["id"])
                
                # Add activities for IA
                activity_intervals = {**activity_serializer.data, "intervals": serialized_intervals}
                manageActivitiesAi = ManageActivityAI()
                
                if manageActivitiesAi.checkActivity(activity_intervals):
                    print("ActivityCheck for ActivityAI: OK")
                    manageActivitiesAi.AddActivityAI(activity_intervals)
                else:
                    print("ActivityCheck for ActivityAI: not OK")
                return Response(activity_intervals, status=status.HTTP_201_CREATED)
            
            return Response(addIntervals_errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(activity_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(security=[{'Bearer': []}], responses={200: ActivitySerializer(), 401: "Error: Unauthorized"})
    def retrieve(self, request, pk):
        """Send activity with its intervals"""
        activity = Activity.objects.get(id=pk)
        
        activity_serializer = ActivitySerializer(activity)
        serialized_intervals = getSerializedActivityIntervals(pk)
        return Response({**activity_serializer.data, "intervals": serialized_intervals}, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(security=[{'Bearer': []}], request_body=ActivitySerializer(), responses={401: "Error: Unauthorized"})
    def update(self, request, pk):
        activity = Activity.objects.get(id=pk)
        serializer = ActivitySerializer(activity, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(security=[{'Bearer': []}], request_body=ActivitySerializer(partial=True), responses={401: "Error: Unauthorized"})
    def partial_update(self, request, pk):
        activity = Activity.objects.get(id=pk)
        serializer = ActivitySerializer(activity, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(security=[{'Bearer': []}], responses={401: "Error: Unauthorized"})
    def destroy(self, request, pk):
        activity = Activity.objects.get(id=pk)
        activity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# DATA_PATH = "static/track_my_moves/data/"

# @swagger_auto_schema(method="GET", security=[{'Bearer': []}], responses={200: "Results", 401: "Error: Unauthorized"})
# @api_view()
# @permission_classes([IsAuthenticated])
# def modelTestsResultsAPIViewDeco(request):
#     # Récupération des données de test
#     [x_test, y_test] = load(DATA_PATH + "test.joblib")
    
#     # Récupération du modèle svm
#     model_svm = load(DATA_PATH + "model_svm.joblib")
#     # Prédiction
#     y_pred_svm = model_svm.predict(x_test)
    
#     # Taux de reconnaissance (accuracy)
#     accuracy = accuracy_score(y_test, y_pred_svm)

#     return Response({"accuracy": accuracy}, status=status.HTTP_200_OK)

# from .activityRecognition import testDataset

# @api_view()
# def activityRecognitionAPIViewDeco(request):
#     testDataset()
#     return Response({"message": "Reconnaissance terminée"}, status=status.HTTP_200_OK)


@swagger_auto_schema(method="GET", security=[{'Bearer': []}], responses={200: "Train status", 401: "Error: Unauthorized"})
@api_view()
@permission_classes([IsAuthenticated])
def trainUserModelAPIViewDeco(request, userId):
    modelManager = manageModelAI(userId)
    result, message = modelManager.train()
    if result:
        return Response({"message": message}, status=status.HTTP_200_OK)
    return Response({"message": message}, status=status.HTTP_428_PRECONDITION_REQUIRED)

def createCaptionActivityTypeFromReport(report):
    caption = {}
    
    count = len(report) - 3
    for key in report:
        if count == 0: # don't look for the last 3 labels (accuracy, macro avg and weighted avg)
            break
        count -= 1
        
        activityType = ActivityType.objects.get(id=int(key))
        caption[key] = activityType.label
    print("\nCaption: ", caption)
    print("")
    return caption

@swagger_auto_schema(method="GET", security=[{'Bearer': []}], responses={200: "Test results", 401: "Error: Unauthorized"})
@api_view()
@permission_classes([IsAuthenticated])
def testUserModelAPIViewDeco(request, userId):
    modelManager = manageModelAI(userId)
    result, response = modelManager.test()
    if result:
        response["caption"] = createCaptionActivityTypeFromReport(response["report"])
        return Response({"data": response}, status=status.HTTP_200_OK)
    return Response({"message": response}, status=status.HTTP_428_PRECONDITION_REQUIRED)

@swagger_auto_schema(method="GET", security=[{'Bearer': []}], responses={200: "Guess results", 401: "Error: Unauthorized"})
@api_view()
@permission_classes([IsAuthenticated])
def guessActivityTypeAPIViewDeco(request, userId, activityId):
    modelManager = manageModelAI(userId)
    result, response = modelManager.guessActivityType(activityId)
    if result:
        activityType = ActivityType.objects.get(id=response["activity_type"])
        serializer = ActivityTypeSerializer(activityType)
        response["activity_type"] = serializer.data
        return Response({"data": response}, status=status.HTTP_200_OK)
    return Response({"message": response}, status=status.HTTP_428_PRECONDITION_REQUIRED)