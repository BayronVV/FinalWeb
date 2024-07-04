from rest_framework import serializers
from django.contrib.auth.hashers import make_password, check_password
from .models import Profile
from rest_framework.exceptions import ValidationError
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

User = get_user_model()

class ProfileCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile  # Asegúrate de que el modelo sea tu clase personalizada de usuario
        fields = ['username', 'password', 'email', 'bio']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        user = super(ProfileCreationSerializer, self).create(validated_data)
        user.is_superuser = True  # Asignar permisos de superusuario
        user.is_staff = True
        user.is_active = True
        user.save()  # Guardar el usuario con los cambios
        return user



class UserLoginSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['username'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class CustomAuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField(label="Username")
    password = serializers.CharField(label="Password", style={'input_type': 'password'}, write_only=True)

class UserTokenSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = User.objects.get(username=data['username'])
        if not user.check_password(data['password']):
            raise serializers.ValidationError('Credenciales inválidas')
        return user

class UserTokenSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = User.objects.get(username=data['username'])
        if not user.check_password(data['password']):
            raise serializers.ValidationError('Credenciales inválidas')
        return user    