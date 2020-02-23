# Import the base serializers
from rest_framework import serializers

# Import all the necessary models
from account.models import Account
from post.models import Post, Comment
from django.core.paginator import Paginator


# Importing the get_user_model() will allow us to get the active user model (in our case our custom user model)
from django.contrib.auth import get_user_model

COMMENTS_PAGE_SIZE = 2

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['username']

class PostSerializer(serializers.ModelSerializer):
    
    post_comments = serializers.SerializerMethodField('get_all_comments')
    likes = serializers.SerializerMethodField('get_likes')
    # display_comments = serializers.SerializerMethodField('paginate_post_comments')

    class Meta:
        model = Post
        fields = ['picture', 'caption', 'updated_at', 'post_comments', 'likes']

    def get_all_comments(self, obj):
        comments = obj.post_comments.all()
        serializer = CommentSerializer(comments, many=True)
        return serializer.data

    def paginate_post_comments(self, obj):
        page_size = 4
        paginator = Paginator(obj.post_comments.all(), page_size)
        page = get('page') or 1

        post_comments = paginator.page(page)
        serializer = CommentSerializer(post_comments, many=True)

    def get_likes(self, obj):
        return obj.likes.count()
            

class CommentSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'account', 'post', 'created_at', 'text']
        read_fields = ['account', 'id', 'created_at']