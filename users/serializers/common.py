from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login
from django.contrib.auth.password_validation import validate_password
from ..models import User

class UserRegisterDetailSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'is_artist',)

class RegisterSerializer(serializers.ModelSerializer):

  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)
  access = serializers.CharField(read_only=True)

  class Meta:
    model = User
    fields = (
      'id', 
      'email',
      'username', 
      'password', 
      'password_confirmation', 
      'is_artist',
      'access'
    )

  def validate(self, data):
    password = data.get('password')
    password_confirmation = data.pop('password_confirmation')
    # print(password)
    
    if password != password_confirmation:
      raise serializers.ValidationError('The passwords you entered do not match, please try again.')
    
    # validate_password(password)

    return data
  
  def create(self, validated_data):
    # print(validated_data)
    new_user = User.objects.create_user(**validated_data)
    user_data = UserRegisterDetailSerializer(new_user).data
    get_token = RefreshToken.for_user(new_user)
    # print(get_token, get_token.access_token)
    # token_data = {'refresh': str(get_token), 'access': str(get_token.access_token)}
    # user_data.update(token_data)
    user_data['access'] = str(get_token.access_token)
    print('RIGHT HERE ->', user_data)

    return user_data
  
  
class UsernameSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username',)


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
      'id', 
      'username', 
      'email', 
      'is_artist',
      'image', 
      'facebook',
      'instagram',
      'twitter_x',
      'website',
      'likes',
      'created_collection',
    )


class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
      'id', 
      'first_name', 
      'last_name', 
      'email', 
      'username', 
      'password', 
      'is_artist',
      'image', 
      'facebook',
      'instagram',
      'twitter_x',
      'website',
      # 'likes',
      # 'created_collection',
      # 'liked_artists',
      # 'curated_collection',
    )


class PreviewUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
      'id', 
      'username', 
      'image', 
    )