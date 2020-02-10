from django.conf import settings
from rest_framework.authtoken.models import Token
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.db import models

# Create your models here.

post_location = ''


class Post(models.Model):
    picture = models.ImageField(upload_to=post_location, blank=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    caption = models.TextField(max_length=500)
    # This is how we are able to set up the relationship between accounts and posts
    # using on_delete=models.CASCADE will result in all posts by a user being deleted if that users accoutn is deleted
    account = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.caption
