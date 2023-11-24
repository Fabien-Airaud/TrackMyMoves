from django.urls import path, include
from rest_framework import routers

from .views import home, logIn, logOut, usersAdmin, usersAdminStats
from .views import AccountViewSet, ActivityViewSet, UserViewSet
from .views import registerAPIViewDeco, logInAPIViewDeco

router = routers.DefaultRouter()
router.register(r'accounts', AccountViewSet, basename='account')
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', home, name='home'),
    path('home', home, name='home'),
    path('logIn', logIn, name='logIn'),
    path('logOut', logOut, name='logOut'),
    path('usersAdmin', usersAdmin, name='usersAdmin'),
    path('usersAdmin/<int:accountId>', usersAdminStats, name='usersAdminStats'),
    path('api/', include(router.urls)),
    path('api/register', registerAPIViewDeco, name='api-register'),
    path('api/logIn', logInAPIViewDeco, name='api-logIn')
]
