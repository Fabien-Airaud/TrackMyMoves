from django.shortcuts import render

def home(request):
    return render(request, "base.html", {"title": "Home"})

def contact(request):
    return render(request, "base.html", {"title": "Contact"})