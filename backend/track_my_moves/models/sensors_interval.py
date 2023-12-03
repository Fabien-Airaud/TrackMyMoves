from django.db import models


class SensorsInterval(models.Model):
    interval = models.ForeignKey("ActivityInterval", on_delete=models.CASCADE)
    time = models.PositiveIntegerField()
    accel_x = models.IntegerField()
    accel_y = models.IntegerField()
    accel_z = models.IntegerField()
    gyros_x = models.IntegerField()
    gyros_y = models.IntegerField()
    gyros_z = models.IntegerField()
    
    def save(self, *args, **kwargs):
        self.full_clean()
        return super(SensorsInterval, self).save(*args, **kwargs)

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