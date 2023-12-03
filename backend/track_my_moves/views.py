from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import user_passes_test
from django.urls import reverse
from rest_framework import status, viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from .models.account import Account
from .models.activity_type import ActivityType
from .models.activity_interval import ActivityInterval
from .models.activity import Activity
from .models.user import User
from .serializers import AccountSerializer, ActivityTypeSerializer, ActivityIntervalSerializer, ActivitySerializer, UserSerializer

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

@api_view(['POST'])
def registerAPIViewDeco(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

@api_view()
@permission_classes([IsAuthenticated])
def logOutAPIViewDeco(request):
    current_token = Token.objects.get(user=request.user)
    
    current_token.delete()
    logout(request)
    return Response({"message": "log out successed"}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet):
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
    
    def retrieve(self, request, pk):
        """Retrieve the current account (ignore id in request)"""
        
        account = Account.objects.get(user_id=request.user.id)
        serializer = AccountSerializer(account)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk):
        account = Account.objects.get(id=pk)
        serializer = AccountSerializer(account, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def partial_update(self, request, pk):
        account = Account.objects.get(id=pk)
        serializer = AccountSerializer(account, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
    def list(self, request):
        activityTypes = ActivityType.objects.all()
        serializer = ActivityTypeSerializer(activityTypes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        serializer = ActivityTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk):
        activityType = ActivityType.objects.get(id=pk)
        serializer = ActivityTypeSerializer(activityType)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk):
        activityType = ActivityType.objects.get(id=pk)
        serializer = ActivityTypeSerializer(activityType, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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


def addIntervalsToActivity(intervals_data, activity_id):
    for interval_data in intervals_data:
        serializer = ActivityIntervalSerializer(data={**interval_data, "activity": activity_id})
        if serializer.is_valid():
            serializer.save()
        else:
            return serializer.errors
    return True

class ActivityViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        user = request.user
        activities = Activity.objects.filter(user_id=user.id)
        serializer = ActivitySerializer(activities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        intervals_data = request.data.pop("intervals")
        
        serializer = ActivitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save();
            
            add = addIntervalsToActivity(intervals_data, serializer.data["id"]);
            return Response({"activity": serializer.data, "intervals_data": intervals_data, "add": add}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk):
        activity = Activity.objects.get(id=pk)
        serializer = ActivitySerializer(activity)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk):
        activity = Activity.objects.get(id=pk)
        serializer = ActivitySerializer(activity, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def partial_update(self, request, pk):
        activity = Activity.objects.get(id=pk)
        serializer = ActivitySerializer(activity, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk):
        activity = Activity.objects.get(id=pk)
        activity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)