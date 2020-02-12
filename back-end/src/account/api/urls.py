from django.urls import path
from account.api.views import (
    registration_view,
)


from rest_framework.authtoken.views import obtain_auth_token
app_name = 'account'

urlpatterns = [
    # account
    path('register', registration_view, name="register"),
]
