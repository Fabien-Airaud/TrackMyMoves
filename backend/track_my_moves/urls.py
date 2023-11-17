from django.urls import path
from .views import logIn

urlpatterns = [
    path('', logIn, name='logIn'),
    path('logIn', logIn, name='logIn'),
    # path('contact', contact, name='contact')
]
