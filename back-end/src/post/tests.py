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

def data_for_registration(username, email="josh@josh.com", pw2 = False):
    data = {'email': email, 'username': username, 'first_name': "josh", 'last_name': "fried", 'password': "password"}
    if pw2:
        data['password2'] = "password"
    return data

class PostTestCase(TestCase):
    url = reverse('post:create')
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
    data = data_for_registration(username=username, email=email)
    return Account.objects.create_user(**data)

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
    
class DeleteCommentTestCase(TestCase):
    def test_delete_comment(self):
        acc=create_account(username="dawg")
        post = create_post(account=acc)
        postID = post.id
        client = APIClient()
        comment = create_comment(account=acc, post=post)
        url = reverse('post:delete_comment', args=[str(comment.id)])
        token, created = Token.objects.get_or_create(user=acc)                
        self.client = Client(HTTP_AUTHORIZATION='Token ' + token.key)
        data = {'post': str(postID)}
        res = self.client.delete(url, data, content_type='application/json')
        self.assertEqual(res.data['success'], "delete successful")


class UpdateCommentTestCase(TestCase):
    def test_update_comment(self):
        acc=create_account(username="dawg")
        post = create_post(account=acc)
        postID = post.id
        client = APIClient()
        comment = create_comment(account=acc, post=post)
        url = reverse('post:update_comment', args=[str(comment.id)])
        token, created = Token.objects.get_or_create(user=acc)                
        self.client = Client(HTTP_AUTHORIZATION='Token ' + token.key)
        data = {'post': str(postID), 'text':"dsajfhdsiuof"}
        res = self.client.put(url, data, content_type='application/json')
        self.assertEqual(res.data['success'], "updated successful")

def create_comment(account, post):
    return Comment.objects.create(text="text", post=post, account=account)

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

class RegistrationTestCase(TestCase):
    def test_registration(self):
        data = data_for_registration(username="josh", pw2=True)
        client = APIClient()
        url = reverse('account:register')
        res = self.client.post(url, data)
        self.assertEqual(res.data['response'], 'successfully registered a new user')

class FeedTestCase(TestCase):
    def test_feed(self):
        acc = create_account(username="dawg")
        acc2 = create_account(username="josh", email="josh2@josh.com")
        post = create_post(account=acc)
        client = APIClient()
        token, created = Token.objects.get_or_create(user=acc)                
        url = reverse('account:feed')
        self.client = Client(HTTP_AUTHORIZATION='Token ' + token.key)
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

