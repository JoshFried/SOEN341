# Import everything we will need for our API to handle requests
from rest_framework import status
from rest_framework.response import Response
# this also imports our permission classes
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from account.models import Account
from post.models import Post, Comment
# Import our Registration Serializer
from account.api.serializers import RegistrationSerializer
from post.api.serializers import PostSerializer, CommentSerializer

from rest_framework.authtoken.models import Token

# This method is called when a user uses the sign up form
@api_view(['GET'])
@permission_classes(())
def get_post_view(request, id):
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)


@api_view(['PUT'])
@permission_classes((IsAuthenticated,))
def update_post_view(request, id):
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    account = request.user
    if post.account != account:
        return Response({'response': "You don't have permission to edit"})

    if request.method == "PUT":
        serializer = PostSerializer(post, data=request.data)
        data = {}

        if serializer.is_valid():
            serializer.save()
            data["success"] = "updated successful"
            return Responsed(data=data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def delete_post_view(request, id):
    try:
        post = Post.objects.get(id=id)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    account = request.user
    if post.account != account:
        return Response({'response': "You don't have permission to delete"})

    if request.method == "DELETE":
        operation = post.delete()
        data = {}
        if operation:
            data["success"] = "delete successful"
        else:
            data["failure"] = "delete failed"
        return Response(data=data)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def create_post_view(request):
    account = request.user

    post = Post(account=account)

    if request.method == "POST":
        serializer = PostSerializer(post, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def create_comment_view(request, id):
    post = Post.objects.get(id=id)
    account = request.user

    if request.method == "POST":
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(post=post, account=account)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes((IsAuthenticated,))
def update_comment_view(request, id):
    post = Post.objects.get(id = request.data.get('post'))
    account = request.user

    try:
        comment = Comment.objects.get(id=id)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        serializer = CommentSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.update(comment, serializer.validated_data)

            data["success"] = "updated successful"
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def delete_comment_view(request, id):
    post = Post.objects.get(id = request.data.get('post'))
    account = request.user
    try:
        comment = Comment.objects.get(id=id)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if comment.account != account and post.account != account :
        return Response({'response': "You dont have permission to delete"})

    if request.method == "DELETE":
       
        operation = comment.delete()
        data = {}
        if operation:
            data["success"] = "delete successful"
        else:
            data["failure"] = "delete failed"
        return Response(data=data)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def like_view(request, id):
    data = {}
    post = Post.objects.get(id=id)
    account = request.user

    if request.method == "POST":
        if account in post.likes.all():
            post.likes.remove(account)
            data['response'] = "Like removed"
        else:
            post.likes.add(account)
            data['response'] = "Like added"

        return Response(data=data)

