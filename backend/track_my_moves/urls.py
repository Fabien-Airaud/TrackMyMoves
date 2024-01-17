from django.urls import path, include
from rest_framework import routers
from drf_yasg import openapi
from drf_yasg.views import get_schema_view

from .views import home, logIn, logOut, usersAdmin, usersAdminStats
from .views import AccountViewSet, ActivityTypeViewSet, ActivityViewSet, UserViewSet
from .views import registerAPIViewDeco, logInAPIViewDeco, logOutAPIViewDeco, modelTestsResultsAPIViewDeco

schema_view = get_schema_view(
    openapi.Info(
        title="TrackMyMoves API",
        default_version="v1.0",
        description="Description of TrackMyMoves REST API"
    ),
    public=True
)

router = routers.DefaultRouter()
router.register(r'accounts', AccountViewSet, basename='account')
router.register(r'activityTypes', ActivityTypeViewSet, basename='activityType')
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
    path('api/logIn', logInAPIViewDeco, name='api-logIn'),
    path('api/logOut', logOutAPIViewDeco, name='api-logOut'),
    path('api/modelTestsResults', modelTestsResultsAPIViewDeco, name='api-modelTestsResults'),
    path('swagger', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]
