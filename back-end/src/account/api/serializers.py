# Import the base serializers
from rest_framework import serializers
from rest_framework.serializers import Serializer


# Import all the necessary models
from account.models import Account


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
      
class UpdatePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, max_length=30)
    new_password = serializers.CharField(required=True, max_length=30)
    new_password2 = serializers.CharField(required=True, max_length=30)
