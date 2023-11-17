from django.urls import path
from .views import home, logIn, usersAdmin

urlpatterns = [
    path('', home, name='home'),
    path('logIn', logIn, name='logIn'),
    path('usersAdmin', usersAdmin, name='usersAdmin')
]
