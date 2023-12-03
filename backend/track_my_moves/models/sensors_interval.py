from django.db import models


class SensorsInterval(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['interval', 'time'],
                name="unique_sensors_interval_for_time_in_activity_interval"
            )
        ]
    
    interval = models.ForeignKey("ActivityInterval", on_delete=models.CASCADE)
    time = models.PositiveIntegerField()
    accel_x = models.FloatField()
    accel_y = models.FloatField()
    accel_z = models.FloatField()
    gyros_x = models.FloatField()
    gyros_y = models.FloatField()
    gyros_z = models.FloatField()
    
    def save(self, *args, **kwargs):
        self.full_clean()
        return super(SensorsInterval, self).save(*args, **kwargs)

    def __str__(self):
        return f"Sensors data at {self.time} for {self.interval}"

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