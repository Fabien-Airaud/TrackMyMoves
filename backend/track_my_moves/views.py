from django.shortcuts import render

APP_DIR_PATH = "track_my_moves/"

def logIn(request):
    return render(request, APP_DIR_PATH + "logIn.html")

def usersAdmin(request):
    return render(request, APP_DIR_PATH + "usersAdmin.html")