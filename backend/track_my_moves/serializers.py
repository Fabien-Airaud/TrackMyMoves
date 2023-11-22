from rest_framework import serializers
from .models import Account, Activity, User

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["id", "first_name", "last_name", "birthdate", "height", "weight", "country", "user_id"]

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ["id", "activity_type", "start_date", "end_date", "user_id"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email"]