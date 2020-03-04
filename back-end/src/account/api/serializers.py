# Import the base serializers
from rest_framework import serializers
from rest_framework.serializers import Serializer


# Import all the necessary models
from account.models import Account
from post.models import Post, Comment
from post.api.serializers import AccountSerializer, CommentSerializer


# Importing the get_user_model() will allow us to get the active user model (in our case our custom user model)
from django.contrib.auth import get_user_model

# This is the serializer we will use for registration
class RegistrationSerializer(serializers.ModelSerializer):

    # This must be included since there is no 2nd password field for our model
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    # The Meta class is used to transfer info about our model
    class Meta:
        model = get_user_model()

        # Tells django these are the mandatory fields that must be used
        fields = ['email', 'username', 'first_name',
                  'last_name', 'password', 'password2']

        extra_kwargs = {
            'password': {'write_only': True,
                         'min_length': 8},
            'username': {'min_length': 3}
        }

    # The save method either creates a new instance of a class, or updates an existing one
    # In our case, since we're registering an account it will create a new instande of the Account class
    def save(self):
        account = Account(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        # Verify that the 2 passwords match, if not prompt error
        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Passwords must match!!'})

        # This is what hashes the password for us
        account.set_password(password)
        account.save()
        return account


class AccountInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['email', 'username',
                  'first_name', 'last_name', 'profile_picture', 'about']
        extra_kwargs = {
            'password': {'write_only': True,
                         'min_length': 8},
            'username': {'min_length': 3},
            'about': {'required': False}
        }

class AccountPostSerializer(serializers.ModelSerializer):
    all_comments = serializers.SerializerMethodField('get_all_comments')
    class Meta:
        model = Post
        fields = ['picture', 'caption', 'updated_at', 'all_comments', 'likes']
    
    def get_all_comments(self, obj):
        return Comment.objects.filter(post=obj).count()

class ProfileSerializer(serializers.ModelSerializer):
    all_posts = serializers.SerializerMethodField('get_all_posts')
    all_post_count = serializers.SerializerMethodField('get_all_post_count')
    get_num_of_followers = serializers.ReadOnlyField()
    get_num_of_following = serializers.ReadOnlyField()
    all_followers = serializers.SerializerMethodField('get_all_followers')
    all_following = serializers.SerializerMethodField('get_all_following')

    class Meta:
        model = Account
        fields = ['email', 'username',
                  'first_name', 'last_name', 'profile_picture', 'about',
                   'all_posts', 'all_post_count', 'get_num_of_followers', 'get_num_of_following',
                   'all_followers', 'all_following']

    def get_all_post_count(self, obj):
        return Post.objects.filter(account=obj).count()

    def get_all_posts(self, obj):
        posts = Post.objects.filter(account=obj)
        serializer = AccountPostSerializer(posts, many=True)
        return serializer.data
    
    def get_all_followers(self, obj):
        account = Account.objects.filter(following=obj)
        serializer = FollowSerializer(account, many=True)
        return serializer.data
    
    def get_all_following(self, obj):
        account = Account.objects.filter(followers=obj)
        serializer = FollowSerializer(account, many=True)
        return serializer.data
      
class UpdatePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, max_length=30)
    new_password = serializers.CharField(required=True, max_length=30)
    new_password2 = serializers.CharField(required=True, max_length=30)
    
class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'profile_picture']

class FeedSerializer(serializers.ModelSerializer):
    all_posts = serializers.SerializerMethodField('get_all_posts')

    class Meta:
        model = Account
        fields = ['email', 'username',
                  'first_name', 'last_name', 'profile_picture', 'about',
                   'all_posts']
    
    def get_all_posts(self, obj):
        posts = Post.objects.all()
        followingPosts = []
        following = Account.objects.filter(followers=obj) 
        for post in posts:
            if post.account in following or post.account == obj:
                followingPosts.append(post)
        followingPosts.sort(key=lambda x: x.created_at, reverse=True)
        serializer = PostSerializer(followingPosts, many=True)
        return serializer.data

class PostSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)
    picture = serializers.ImageField()
    post_comments = serializers.SerializerMethodField('get_all_comments')
    likes = serializers.SerializerMethodField('get_likes')
    id = serializers.SerializerMethodField('get_id')
    # display_comments = serializers.SerializerMethodField('paginate_post_comments')

    class Meta:
        model = Post
        fields = ['picture', 'caption', 'updated_at', 'post_comments', 'likes', 'account', 'id']

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

    def get_id(self, obj):
        return obj.id