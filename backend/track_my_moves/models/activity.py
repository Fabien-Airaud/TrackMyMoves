from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

class ActivityTypes(models.TextChoices):
    WALKING = "walking"
    RUNNING = "running"
    CYCLING = "cycling"
    CARDIO = "cardio"

def validate_activity_type(value):
    if not (value in ActivityTypes.values):
        raise ValidationError("Value '{}' is not an activity type".format(value))

class Activity(models.Model):
    id = models.AutoField(primary_key=True)
    # user = models.ForeignKey("app.Model", verbose_name=_(""), on_delete=models.CASCADE)
    activityType = models.CharField(max_length=50, choices=ActivityTypes.choices, validators=[validate_activity_type])
    startDate = models.DateTimeField(auto_now=False, auto_now_add=False)
    endDate = models.DateTimeField(auto_now=False, auto_now_add=False, blank=True, null=True)
    
    def save(self, *args, **kwargs):
        self.full_clean()
        return super(Activity, self).save(*args, **kwargs)
    
    # accountId: action.payload.accountId,
    # 
    # 
    # intervals: [],
    # sensorsIntervals: [],
    # 