from django.db import models


class ActivityInterval(models.Model):
    class Meta:
        constraints = [
            models.CheckConstraint(
                name="activity_interval_start_datetime_less_than_end_datetime",
                check=models.Q(start_datetime__lt=models.F("end_datetime"))
            ),
            models.CheckConstraint(
                name="activity_interval_start_time_less_than_end_time",
                check=models.Q(start_time__lt=models.F("end_time"))
            )
        ]
    
    activity = models.ForeignKey("Activity", on_delete=models.CASCADE)
    start_datetime = models.DateTimeField(auto_now=False, auto_now_add=False)
    start_time = models.PositiveIntegerField()
    end_datetime = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_time = models.PositiveIntegerField()
    
    def save(self, *args, **kwargs):
        self.full_clean()
        return super(ActivityInterval, self).save(*args, **kwargs)

# activity_interval: {
#     id: ,
#     activity_id: ,
#     start_datetime: ,
#     start_time: ,
#     sensors_intervals: [{sensors_interval},{sensors_interval}],
#     position_intervals: [{position_interval},{position_interval}],
#     end_datetime: ,
#     end_time: 