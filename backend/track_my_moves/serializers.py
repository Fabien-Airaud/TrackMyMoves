from rest_framework import serializers
import datetime

from .models import Account, Activity, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password"]
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        if 'password' in validated_data:
            instance.set_password(validated_data.get('password'))
        instance.save()
        return instance

class AccountSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Account
        fields = '__all__'
    
    def validate_birthdate(self, value):
        """
        Check if the birdate is before today
        """
        if value < datetime.date.today():
            raise serializers.ValidationError("you were already born, you will not be born")
        return value
    
    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create_user(**user_data)
        return Account.objects.create(**validated_data, user=user)

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'
        read_only_fields = ['user_id']
    
    def create(self, validated_data):
        return Activity.objects.create(**validated_data)