from django.shortcuts import render

APP_DIR_PATH = "track_my_moves/"

def home(request):
    return render(request, APP_DIR_PATH + "logIn.html")

# def contact(request):
#     return render(request, APP_DIR_PATH + "contact.html")