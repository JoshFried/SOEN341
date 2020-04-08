from django.test import TestCase, Client
from account.models import Account
from post.models import Post, Comment
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework import status
import tempfile
from PIL import Image
from django.core.files.base import File
from io import BytesIO
import os
import json
from rest_framework.test import force_authenticate

# Create your tests here.

class PostTestCase(TestCase):
    url = reverse('post:create')
    print(url)
    def test_create_post(self):
        acc = create_account(username="dawg")
        image = get_image_file()
        client = APIClient()
        data = {"picture": image, "caption": "dhaoiudhsa"}
        token, created = Token.objects.get_or_create(user=acc)                
        self.client = Client(HTTP_AUTHORIZATION='Token ' + token.key)
        res = self.client.post(self.url, data)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
    
  

def create_account(username, email="josh@josh.com"):
    return Account.objects.create_user(email=email, username=username, first_name="josh", last_name="fried", password="password")

def get_image_file(name='test.png', ext='png', size=(50, 50), color=(256, 0, 0)):
    file_obj = BytesIO()
    image = Image.new("RGBA", size=size, color=color)
    image.save(file_obj, ext)
    file_obj.seek(0)
    return File(file_obj, name=name)

class CommentTestCase(TestCase):
   
    def test_create_comment(self):
        acc=create_account(username="dawg")
        post = create_post(account=acc)
        data = {"text": "test"}
        client = APIClient()
        url = reverse('post:create_comment', args=[str(post.id)])
        token, created = Token.objects.get_or_create(user=acc)                
        self.client = Client(HTTP_AUTHORIZATION='Token ' + token.key)
        res = self.client.post(url, data)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
    


def create_post(account):
    return Post.objects.create(picture=get_image_file(), caption="test", account=account)    

class FollowTestCase(TestCase):
    def test_follow(self):
        acc = create_account(username="dawg")
        acc2 = create_account(username="josh", email="josh2@josh.com")
        client = APIClient()
        url = reverse('account:follow', args=[str(acc2.username)])
        token, created = Token.objects.get_or_create(user=acc)                
        self.client = Client(HTTP_AUTHORIZATION='Token ' + token.key)
        res = self.client.post(url)
        self.assertEqual(res.data['response'], "Follower added")

class LikeTestCase(TestCase):
    def test_like_post(self):
        acc=create_account(username="dawg")
        post = create_post(account=acc)
        data = {"text": "test"}
        client = APIClient()
        url = reverse('post:like', args=[str(post.id)])
        token, created = Token.objects.get_or_create(user=acc)                
        self.client = Client(HTTP_AUTHORIZATION='Token ' + token.key)
        res = self.client.post(url, data)
        self.assertEqual(res.data['response'], "Like added")
        
class SignInTestCase(TestCase):
    def test_sign_in(self):
        acc = create_account(username="josh")
        client = APIClient()
        url = reverse('account:login')
        data = {'username': 'josh@josh.com', 'password': 'password'}
        token, created = Token.objects.get_or_create(user=acc)                
        res = self.client.post(url, data)
        self.assertEqual(res.data['token'], token.key)

