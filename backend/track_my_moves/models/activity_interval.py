from django.db import models

class ActivityInterval(models.Model):
    activity = models.ForeignKey("Activity", on_delete=models.CASCADE)
    start_datetime = models.DateTimeField(auto_now=False, auto_now_add=False)
    start_time = models.PositiveIntegerField()
    end_datetime = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_time = models.PositiveIntegerField()
    
    def save(self, *args, **kwargs):
        self.full_clean()
        return super(ActivityInterval, self).save(*args, **kwargs)