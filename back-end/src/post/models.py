from django.conf import settings
from rest_framework.authtoken.models import Token
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.db import models

# Create your models here.


def upload_location(instance, filename):
    file_path = 'post/{account_id}/{filename}'.format(
        account_id=str(instance.account.id), filename=filename
    )
    print(file_path)
    return file_path


class Post(models.Model):
    picture = models.ImageField(upload_to=upload_location, null=False, blank=True )

    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    caption = models.TextField(max_length=500)
    # This is how we are able to set up the relationship between accounts and posts
    # using on_delete=models.CASCADE will result in all posts by a user being deleted if that users accoutn is deleted
    account = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='post_account')
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='post_likes', blank=True, symmetrical=False, )

    def __str__(self):
        return self.caption
    
    def get_number_of_likes(self):
        if self.likes.count():
            return self.likes.all().count()

class Comment(models.Model):
    account = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='post_comments')
    text = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']