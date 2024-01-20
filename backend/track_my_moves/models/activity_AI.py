from django.db import models

RECOGNITION_TYPE_CHOICES = [
    ("TR", "Train"),
    ("TE", "Test"),
    ("NO", "Nothing"),
]

class ActivityAI(models.Model):
    class Meta:
        verbose_name_plural = "Activities AI"
    
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    activity = models.ForeignKey("Activity", on_delete=models.CASCADE)
    activity_type = models.ForeignKey("ActivityType", on_delete=models.CASCADE)
    recognition_type = models.CharField(max_length=2, choices=RECOGNITION_TYPE_CHOICES, default="NO")
    
    mean_accel_x = models.FloatField()
    mean_accel_y = models.FloatField()
    mean_accel_z = models.FloatField()
    mean_gyros_x = models.FloatField()
    mean_gyros_y = models.FloatField()
    mean_gyros_z = models.FloatField()
    
    max_accel_x = models.FloatField()
    max_accel_y = models.FloatField()
    max_accel_z = models.FloatField()
    max_gyros_x = models.FloatField()
    max_gyros_y = models.FloatField()
    max_gyros_z = models.FloatField()
    
    min_accel_x = models.FloatField()
    min_accel_y = models.FloatField()
    min_accel_z = models.FloatField()
    min_gyros_x = models.FloatField()
    min_gyros_y = models.FloatField()
    min_gyros_z = models.FloatField()
    
    var_accel_x = models.FloatField()
    var_accel_y = models.FloatField()
    var_accel_z = models.FloatField()
    var_gyros_x = models.FloatField()
    var_gyros_y = models.FloatField()
    var_gyros_z = models.FloatField()
    
    std_accel_x = models.FloatField()
    std_accel_y = models.FloatField()
    std_accel_z = models.FloatField()
    std_gyros_x = models.FloatField()
    std_gyros_y = models.FloatField()
    std_gyros_z = models.FloatField()
    
    median_accel_x = models.FloatField()
    median_accel_y = models.FloatField()
    median_accel_z = models.FloatField()
    median_gyros_x = models.FloatField()
    median_gyros_y = models.FloatField()
    median_gyros_z = models.FloatField()
    
    sma_accel = models.FloatField()
    sma_gyros = models.FloatField()
    
    energy_accel_x = models.FloatField()
    energy_accel_y = models.FloatField()
    energy_accel_z = models.FloatField()
    energy_gyros_x = models.FloatField()
    energy_gyros_y = models.FloatField()
    energy_gyros_z = models.FloatField()
    
    iqr_accel_x = models.FloatField()
    iqr_accel_y = models.FloatField()
    iqr_accel_z = models.FloatField()
    iqr_gyros_x = models.FloatField()
    iqr_gyros_y = models.FloatField()
    iqr_gyros_z = models.FloatField()
    
    entropy_accel_x = models.FloatField()
    entropy_accel_y = models.FloatField()
    entropy_accel_z = models.FloatField()
    entropy_gyros_x = models.FloatField()
    entropy_gyros_y = models.FloatField()
    entropy_gyros_z = models.FloatField()
    
    maxInds_accel_x = models.FloatField()
    maxInds_accel_y = models.FloatField()
    maxInds_accel_z = models.FloatField()
    maxInds_gyros_x = models.FloatField()
    maxInds_gyros_y = models.FloatField()
    maxInds_gyros_z = models.FloatField()
    
    meanFreq_accel_x = models.FloatField()
    meanFreq_accel_y = models.FloatField()
    meanFreq_accel_z = models.FloatField()
    meanFreq_gyros_x = models.FloatField()
    meanFreq_gyros_y = models.FloatField()
    meanFreq_gyros_z = models.FloatField()
    
    mode_accel_x = models.FloatField()
    mode_accel_y = models.FloatField()
    mode_accel_z = models.FloatField()
    mode_gyros_x = models.FloatField()
    mode_gyros_y = models.FloatField()
    mode_gyros_z = models.FloatField()
    
    skew_accel_x = models.FloatField()
    skew_accel_y = models.FloatField()
    skew_accel_z = models.FloatField()
    skew_gyros_x = models.FloatField()
    skew_gyros_y = models.FloatField()
    skew_gyros_z = models.FloatField()
    
    kurtosis_accel_x = models.FloatField()
    kurtosis_accel_y = models.FloatField()
    kurtosis_accel_z = models.FloatField()
    kurtosis_gyros_x = models.FloatField()
    kurtosis_gyros_y = models.FloatField()
    kurtosis_gyros_z = models.FloatField()