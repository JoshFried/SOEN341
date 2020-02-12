from django.urls import path
from account.api.views import (
    registration_view,
)


# Built in django view that looks for auth user model, 
# it looks for that and asks for required paramaters to login a user 
# based on our user model

from rest_framework.authtoken.views import obtain_auth_token
app_name = 'account'

urlpatterns = [
    # account
    path('register', registration_view, name="register"),
    path('login', obtain_auth_token, name="login"),
]
