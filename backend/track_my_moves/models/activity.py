from django.db import models
from .activity_type import ActivityType

def getAIActivityType():
    return ActivityType.objects.get_or_create(value="ai", label="AI guess", leadingIcon="cloud-braces")

class Activity(models.Model):
    class Meta:
        verbose_name_plural = "Activities",
        constraints = [
            models.CheckConstraint(
                name="activity_start_datetime_less_than_end_datetime",
                check=models.Q(start_datetime__lt=models.F("end_datetime"))
            )
        ]
    
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    activity_type = models.ForeignKey("ActivityType", default=getAIActivityType, on_delete=models.SET_DEFAULT)
    start_datetime = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_datetime = models.DateTimeField(auto_now=False, auto_now_add=False)
    
    def save(self, *args, **kwargs):
        self.full_clean()
        return super(Activity, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.user} {self.activity_type} activity"
    
# intervals : [{interval},{interval}]
# interval: {
#     id: ,
#     activity_id: ,
#     start_datetime: ,
#     start_time: ,
#     sensors_intervals: [{sensors_interval},{sensors_interval}],
#     position_intervals: [{position_interval},{position_interval}],
#     end_datetime: ,
#     end_time: 
# }
# sensors_interval: {
#     id: ,
#     interval_id: ,
#     time: ,
#     accel_x: ,
#     accel_y: ,
#     accel_z: ,
#     gyros_x: ,
#     gyros_y: ,
#     gyros_z: ,
# }
# position_interval: {
#     id: ,
#     interval_id: ,
#     data: 
# }