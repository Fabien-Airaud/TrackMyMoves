from django.urls import path, include
from rest_framework import routers

from .views import home, logIn, logOut, usersAdmin, usersAdminStats, ActivityViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', home, name='home'),
    path('home', home, name='home'),
    path('logIn', logIn, name='logIn'),
    path('logOut', logOut, name='logOut'),
    path('usersAdmin', usersAdmin, name='usersAdmin'),
    path('usersAdmin/<int:accountId>', usersAdminStats, name='usersAdminStats'),
    path('api/', include(router.urls))
]
