from django.db import models
from django.core.exceptions import ValidationError

class ActivityTypes(models.TextChoices):
    WALKING = "walking"
    RUNNING = "running"
    CYCLING = "cycling"
    CARDIO = "cardio"

def validate_activity_type(value):
    if not (value in ActivityTypes.values):
        raise ValidationError("Value '{}' is not an activity type".format(value))

class Activity(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=50, choices=ActivityTypes.choices, validators=[validate_activity_type])
    start_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_date = models.DateTimeField(auto_now=False, auto_now_add=False, blank=True, null=True)
    
    def save(self, *args, **kwargs):
        self.full_clean()
        return super(Activity, self).save(*args, **kwargs)
    
    # intervals: []
    # sensors_intervals: []