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
    list_display = '__all__'
    list_filter = '__all__'
    search_fields = ["first_name", "last_name", "birthdate", "country"]
    ordering = ["first_name", "last_name", "birthdate", "country"]


admin.site.register(User, UserAdmin)
admin.site.register(Account, AccountAdmin)
admin.site.register(Activity)
admin.site.register(ActivityType)
admin.site.register(ActivityInterval)
admin.site.register(SensorsInterval)
