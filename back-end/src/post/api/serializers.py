# Import the base serializers
from rest_framework import serializers

# Import all the necessary models
from account.models import Account
from post.models import Post


# Importing the get_user_model() will allow us to get the active user model (in our case our custom user model)
from django.contrib.auth import get_user_model

# This is the serializer we will use for registration


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['picture', 'caption', 'updated_at']
