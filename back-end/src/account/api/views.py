# Import everything we will need for our API to handle requests
from rest_framework import status
from rest_framework.response import Response
# this also imports our permission classes
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from account.models import Account
# Import our Registration Serializer
from account.api.serializers import AccountInformationSerializer, FeedSerializer, UpdatePasswordSerializer, RegistrationSerializer, ProfileSerializer
from rest_framework.generics import UpdateAPIView

from rest_framework.authentication import TokenAuthentication

from rest_framework.authtoken.models import Token

# This method is called when a user uses the sign up form
@api_view(['POST', ])
@permission_classes(())
def registration_view(request):

    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()  # calls overided save method to save account to DB
            data['response'] = "successfully registered a new user"
            data['email'] = account.email
            data['username'] = account.username
            token = Token.objects.get(user=account).key
            data['token'] = token
        else:
            # this will output any/all errors to the user as defined in our serializer class
            data = serializer.errors
        return Response(data)

@api_view(['GET',])
@permission_classes((IsAuthenticated,))
def account_information_view(request):
    try:
        account = request.user
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
      
    if request.method == 'GET':
        serializer = AccountInformationSerializer(account)
        return Response(serializer.data)

@api_view(['GET',])
@permission_classes(()) # Do we want a non-authenticated user to be able to view? 
def profile_view(request, username):
    try:
        account = Account.objects.get(username=username)
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProfileSerializer(account)
        return Response(serializer.data)

@api_view(['PUT',])
@permission_classes((IsAuthenticated,))
def update_account_view(request):
    try:
        account = request.user
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        serializer = AccountInformationSerializer(
            account, data=request.data, allow_null=True)
        
        data = {}
        
        if serializer.is_valid():
            serializer.save()
            data['response'] = "Account update success"
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdatePasswordView(UpdateAPIView):
    serializer_class = UpdatePasswordSerializer
    model = Account
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["The password entered does not match our records"]}, status=status.HTTP_400_BAD_REQUEST)

            new_password = serializer.data.get("new_password")
            new_password2 = serializer.data.get("new_password2")
            
            if new_password != new_password2:
                return Response({"new_password": ["New passwords must match!!!"]}, status=status.HTTP_400_BAD_REQUEST)
            
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response({"response": "successfully changed password"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def follow_account_view(request, username):
    data = {}
    try:
        follower = request.user
        followed = Account.objects.get(username=username)
    except Account.DoesNotExist:
        return Response(stats=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        if followed in follower.following.all():
            follower.following.remove(followed)
            followed.followers.remove(follower)
            data['response'] = "Follower removed"
        else:
            follower.following.add(followed)
            followed.followers.add(follower)
            data['response'] = "Follower added"
        return Response(data=data)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_feed_view(request):
    try:
        account = request.user
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
      
    if request.method == 'GET':
        serializer = FeedSerializer(account)
        return Response(serializer.data, status = status.HTTP_200_OK)