from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import user_passes_test
from django.urls import reverse

from .models.account import Account
from .models.activity import Activity, ActivityTypes

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
    accountActivities = Activity.objects.filter(user_id=accountId)
    currentStats["totalActivities"] = accountActivities.count()
    currentStats["activitiesCount"] = getActivitiesCount(accountActivities)
    currentStats["distinctActivities"] = getNbDistinctActivities(currentStats["activitiesCount"])
    currentStats["mostActivities"] = getMostActivities(currentStats["activitiesCount"])
    
    return render(request, APP_DIR_PATH + "usersAdmin.html", {"accounts": accounts, "adminId": adminId, "currentAccount": currentAccount, "currentStats": currentStats})