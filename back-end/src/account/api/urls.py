from django.urls import path
from account.api.views import (
    registration_view,
    account_information_view,
    update_account_view,
    UpdatePasswordView,
    profile_view
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
    path('information', account_information_view, name="information"),
    path('<username>', profile_view, name="profile"),
    path('information/update', update_account_view, name="update"),
    path('information/updatepassword', UpdatePasswordView.as_view(), name="updatepassword"),
]
