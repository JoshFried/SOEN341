# Import the base serializers
from rest_framework import serializers

# Import all the necessary models
from account.models import Account
from post.models import Post, Comment


# Importing the get_user_model() will allow us to get the active user model (in our case our custom user model)
from django.contrib.auth import get_user_model

COMMENTS_PAGE_SIZE = 2

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['username']

class PostSerializer(serializers.ModelSerializer):
    all_comments = serializers.SerializerMethodField('get_all_comments')


    class Meta:
        model = Post
        fields = ['picture', 'caption', 'updated_at', 'all_comments']

    def get_all_comments(self, obj):
        comments = obj.post_comments.all()
        serializer = CommentSerializer(comments, many=True)
        return serializer.data
            

class CommentSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'account', 'post', 'created_at', 'text']
        read_fields = ['account', 'id', 'created_at']