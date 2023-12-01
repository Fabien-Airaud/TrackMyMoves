from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import UserCreationForm, UserChangeForm
from .models import User, Account, ActivityType, Activity


class UserAdmin(UserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User
    list_display = ["email", "is_superuser", "is_active"]
    list_filter = ["email", "is_superuser", "is_active"]
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


admin.site.register(User, UserAdmin)
admin.site.register(Account)
admin.site.register(ActivityType)
admin.site.register(Activity)
