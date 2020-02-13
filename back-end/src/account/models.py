from django.conf import settings
from rest_framework.authtoken.models import Token
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


# Custom User imports


# Token Authentication imports
# This import is also used to implement the following/followers relationship


class MyAccountManager(BaseUserManager):

    # this is our function that will be called upon registering a new user
    def create_user(self, email, username, first_name, last_name, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have a username")
        if not first_name:
            raise ValueError("Users must have a first name")
        if not last_name:
            raise ValueError("Users must have a last name")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    # this is our function that will be called upon creating a new superuser ***THIS SHOULD ONLY BE USED ONCE***
    def create_superuser(self, email, username, first_name, last_name, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
            first_name=first_name,
            last_name=last_name,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

# Custom user Model


profile_pic_location = ''


class Account(AbstractBaseUser):

    # User fields as per requirements specifications
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    about = models.TextField(max_length=250)
    profile_picture = models.ImageField(
        upload_to=profile_pic_location, blank=True)

    # Mandatory fields for Django's AbstractBaseUser class (email is also one)
    date_joined = models.DateTimeField(
        verbose_name='date_joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last_login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # The following fields are what create the following/followers relationship
    following = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name='account_following', symmetrical=False)
    followers = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name='account_followers', symmetrical=False)

    # Call this class to instantiate a new object
    objects = MyAccountManager()

    # More required fields for AbstractBaseUser
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    # Same thing as javas "toString()" method
    def __str__(self):
        return self.email

    # The following 2 methods must be defined if we use the AbstractBaseUser class
    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def get_posts(self):
        return Post.objects.filter(account=self).values_list('id', flat=True)
        
    def get_num_of_posts(self):
        return Post.objects.filter(account=self).values_list('id', flat=True)

    def get_post_count(self):
        return self.post.all().count()

    def get_num_of_follower(self):
        return self.followers.all().count()

    def get_num_of_follower(self):
        return self.followers.all().count()

# This is our token generator
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
