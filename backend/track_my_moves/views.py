from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import user_passes_test
from django.urls import reverse
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from .models.account import Account
from .models.activity import Activity, ActivityTypes
from .models.user import User
from .serializers import AccountSerializer, ActivitySerializer, UserSerializer

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
    
    for activityType in ActivityTypes.values:
        count = activities.filter(activity_type=activityType).count()
        if count > 0:
            activitiesCount.append([activityType.replace('_', ' '), count])
    
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

class UserViewSet(viewsets.ViewSet):
    def list(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk):
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk):
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def partial_update(self, request, pk):
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk):
        user = User.objects.get(id=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AccountViewSet(viewsets.ViewSet):
    def list(self, request):
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk):
        account = Account.objects.get(id=pk)
        serializer = AccountSerializer(account)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk):
        account = Account.objects.get(id=pk)
        serializer = AccountSerializer(account, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ActivityViewSet(viewsets.ViewSet):
    def list(self, request):
        user = request.user
        activities = Activity.objects.filter(user_id=user.id)
        serializer = ActivitySerializer(activities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        serializer = ActivitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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