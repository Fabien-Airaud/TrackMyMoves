from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return HttpResponse("<html><body><p> Page d'accueil ! </p></body></html>")

def contact(request):
    return HttpResponse("<html><body><p> Page de contact ! </p></body></html>")