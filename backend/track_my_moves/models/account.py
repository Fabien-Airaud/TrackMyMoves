from django.db import models

class Account(models.Model):
    class Meta:
        constraints = [
            models.CheckConstraint(
                name="height_less_than_3m",
                check=models.Q(height__lt=300)
            ),
            models.CheckConstraint(
                name="weight_less_than_1000kg",
                check=models.Q(weight__lt=1000)
            )
        ]

    user = models.OneToOneField("User", on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birthdate = models.DateField(auto_now=False, auto_now_add=False)
    height = models.PositiveSmallIntegerField()
    weight = models.PositiveSmallIntegerField()
    country = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"