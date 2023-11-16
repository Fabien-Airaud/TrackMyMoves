from django.db import models

class Account(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birthdate = models.DateField(auto_now=False, auto_now_add=False)
    height = models.IntegerField()
    weight = models.IntegerField()
    country = models.CharField(max_length=50)