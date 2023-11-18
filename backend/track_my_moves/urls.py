from django.urls import path
from .views import home, logIn, logOut, usersAdmin, usersAdminStats

urlpatterns = [
    path('', home, name='home'),
    path('home', home, name='home'),
    path('logIn', logIn, name='logIn'),
    path('logOut', logOut, name='logOut'),
    path('usersAdmin', usersAdmin, name='usersAdmin'),
    path('usersAdmin/<int:accountId>', usersAdminStats, name='usersAdminStats')
]
