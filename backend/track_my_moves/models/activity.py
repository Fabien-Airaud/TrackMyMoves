from django.db import models

class Activity(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    activity_type = models.ForeignKey("ActivityType", on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    
    def save(self, *args, **kwargs):
        self.full_clean()
        return super(Activity, self).save(*args, **kwargs)
    
    # intervals: []
    # sensors_intervals: []