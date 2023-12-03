from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import UserCreationForm, UserChangeForm
from .models import User, Account, Activity, ActivityType, ActivityInterval, SensorsInterval


class UserAdmin(UserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User
    list_display = ["email", "is_superuser", "is_active", "last_login", "date_joined"]
    list_filter = ["email", "is_superuser", "is_active", "last_login", "date_joined"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Permissions", {"fields": ["is_superuser", "is_active", "groups", "user_permissions"]}),
    ]
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": [
                    "email", "password1", "password2", "is_superuser",
                    "is_active", "groups", "user_permissions"
                ],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["email"]

class AccountAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "user", "birthdate", "country", "height", "weight"]
    list_filter = ["country"]
    ordering = ["first_name", "last_name", "birthdate", "country"]

class ActivityAdmin(admin.ModelAdmin):
    list_display = ["activity_type", "user", "start_datetime", "end_datetime"]
    list_filter = ["activity_type", "user"]
    search_fields = ["activity_type", "start_datetime", "end_datetime"]
    ordering = ["start_datetime", "user", "activity_type", "end_datetime"]


admin.site.register(User, UserAdmin)
admin.site.register(Account, AccountAdmin)
admin.site.register(Activity, ActivityAdmin)
admin.site.register(ActivityType)
admin.site.register(ActivityInterval)
admin.site.register(SensorsInterval)
