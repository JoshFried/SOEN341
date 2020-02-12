from django.urls import path
from post.api.views import (
    get_post_view,
    update_post_view,
    delete_post_view,
    create_post_view,
)


from rest_framework.authtoken.views import obtain_auth_token
app_name = 'post'

urlpatterns = [

    path('<id>/', get_post_view, name="detail"),
    path('<id>/update', update_post_view, name="update"),
    path('<id>/delete', delete_post_view, name="delete"),
    path('create', create_post_view, name="create"),

]
