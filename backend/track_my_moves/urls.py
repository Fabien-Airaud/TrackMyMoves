from django.urls import path
from .views import logIn, usersAdmin

urlpatterns = [
    path('', logIn, name='logIn'),
    path('logIn', logIn, name='logIn'),
    path('usersAdmin', usersAdmin, name='usersAdmin')
]
