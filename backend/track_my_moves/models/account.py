from django.db import models

class Account(models.Model):
    user = models.OneToOneField("User", on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birthdate = models.DateField(auto_now=False, auto_now_add=False)
    height = models.PositiveSmallIntegerField()
    weight = models.PositiveSmallIntegerField()
    country = models.CharField(max_length=50)