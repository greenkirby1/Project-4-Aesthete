from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from ..models import User

class RegisterSerializer(serializers.ModelSerializer):

  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)

  class Meta:
    model = User
    fields = (
      'id', 
      'email',
      'username', 
      'password', 
      'password_confirmation', 
      'is_artist',
    )

  def validate(self, data):
    password = data.get('password')
    password_confirmation = data.pop('password_confirmation')
    
    if password != password_confirmation:
      raise serializers.ValidationError('The passwords you entered do not match, please try again.')
    
    # validate_password(password)

    return data
  
  def create(self, validated_data):
    return User.objects.create_user(**validated_data)
  
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
      'slug',
      'likes',
      'created_collection',
      'liked_artists',
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
      'likes',
      'created_collection',
      'liked_artists'
    )