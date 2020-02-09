# Import everything we will need for our API to handle requests
from rest_framework import status
from rest_framework.response import Response
# this also imports our permission classes
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from account.models import Account
# Import our Registration Serializer
from account.api.serializers import RegistrationSerializer

from rest_framework.authtoken.models import Token

# This method is called when a user uses the sign up form
@api_view(['POST', ])
def registration_view(request):

    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()  # calls overided save method to save account to DB
            data['response'] = "successfully registed a new user."
            data['email'] = account.email
            data['username'] = account.username
            token = Token.objects.get(user=account).key
            data['token'] = token
        else:
            # this will output any/all errors to the user as defined in our serializer class
            data = serializer.errors
        return Response(data)
