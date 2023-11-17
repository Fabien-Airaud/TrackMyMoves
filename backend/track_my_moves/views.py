from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login

APP_DIR_PATH = "track_my_moves/"

def home(request):
    user = request.user
    if user.is_authenticated and user.is_superuser and user.is_active:
        # utilisateur connecté
        return HttpResponseRedirect("usersAdmin")
    else:
        return HttpResponseRedirect("logIn")

def logIn(request):
    if request.method == "POST":
        logInEmail = request.POST["logInEmail"]
        logInPassword = request.POST["logInPassword"]
        
        user = authenticate(request, username=logInEmail, password=logInPassword)
        if user is not None and user.is_superuser and user.is_active:
            login(request, user)
            return HttpResponseRedirect("usersAdmin")
    
    return render(request, APP_DIR_PATH + "logIn.html")

def usersAdmin(request):
    return render(request, APP_DIR_PATH + "usersAdmin.html")