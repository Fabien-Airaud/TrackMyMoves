from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import user_passes_test
from django.urls import reverse

from .models.account import Account

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

@user_passes_test(adminUser, login_url="logIn")
def usersAdminStats(request, accountId):
    adminId = Account.objects.get(user_id=request.user.id).id
    currentAccount = Account.objects.get(id=accountId)
    
    if request.method == "POST":
        if "delete" in request.POST:
            currentAccount.user.delete()
            return HttpResponseRedirect(reverse("usersAdminStats", kwargs={"accountId": adminId}))
        else:
            currentAccount.user.is_superuser = "isSuperuser" in request.POST
            currentAccount.user.is_active = "isActive" in request.POST
            print("delete:{}".format("delete" in request.POST))
            currentAccount.user.save()
    
    accounts = Account.objects.all()
    return render(request, APP_DIR_PATH + "usersAdmin.html", {"accounts": accounts, "adminId": adminId, "currentAccount": currentAccount})