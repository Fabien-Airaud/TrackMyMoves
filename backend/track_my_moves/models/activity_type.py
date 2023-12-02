from django.db import models

class ActivityType(models.Model):
    value = models.CharField(max_length=50, unique=True)
    label = models.CharField(max_length=100, unique=True)
    leading_icon = models.CharField(max_length=100, default="timer")
    
    def save(self, *args, **kwargs):
        self.full_clean()
        return super(ActivityType, self).save(*args, **kwargs)