from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import UserManager

class User(AbstractUser):
    username = None
    first_name = None
    last_name = None
    email = models.EmailField("email address", max_length=255, unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
