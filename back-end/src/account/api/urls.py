from django.urls import path
from account.api.views import (
    registration_view,
    get_post_view,
    update_post_view,
    delete_post_view,
    create_post_view,
)


from rest_framework.authtoken.views import obtain_auth_token
app_name = 'account'

urlpatterns = [
    # account
    path('register', registration_view, name="register"),
]
