from rest_framework import serializers

from .models import User, Account, ActivityType, ActivityInterval, Activity

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

    def validate_height(self, value):
        """
        Check that the height is under 3 meters.
        """
        if value >= 300:
            raise serializers.ValidationError("height should be under 3 meters.")
        return value

    def validate_weight(self, value):
        """
        Check that the weight is under 1000 kg.
        """
        if value >= 1000:
            raise serializers.ValidationError("weight should be under 1000kg.")
        return value
    
    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create_user(**user_data)
        return Account.objects.create(**validated_data, user=user)
    
    def update(self, instance, validated_data):
        if "user" in validated_data:
            user_data = validated_data.pop("user")
            user = instance.user
            user.email = user_data.get('email', user.email)
            if 'password' in user_data:
                user.set_password(user_data.get('password'))
            user.save()
        
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.birthdate = validated_data.get("birthdate", instance.birthdate)
        instance.height = validated_data.get("height", instance.height)
        instance.weight = validated_data.get("weight", instance.weight)
        instance.country = validated_data.get("country", instance.country)
        instance.save()
        return instance

class ActivityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityType
        fields = '__all__'
    
    def create(self, validated_data):
        return ActivityType.objects.create(**validated_data)

class ActivityIntervalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityInterval
        fields = '__all__'
        read_only_fields = ['activity']
    
    def create(self, validated_data):
        return ActivityInterval.objects.create(**validated_data)

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'
        read_only_fields = ['user']
    
    def create(self, validated_data):
        return Activity.objects.create(**validated_data)