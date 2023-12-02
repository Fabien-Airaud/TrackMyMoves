from django.db import models
from .activity_type import ActivityType

def getAIActivityType():
    return ActivityType.objects.get_or_create(value="ai", label="AI guess", leadingIcon="cloud-braces")

class Activity(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    activity_type = models.ForeignKey("ActivityType", default=getAIActivityType, on_delete=models.SET_DEFAULT)
    start_datetime = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_datetime = models.DateTimeField(auto_now=False, auto_now_add=False)
    
    def save(self, *args, **kwargs):
        self.full_clean()
        return super(Activity, self).save(*args, **kwargs)
    
    # intervals: []
    # sensors_intervals: []