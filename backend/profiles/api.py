from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model, login, logout
from .serializers import CustomAuthTokenSerializer, ProfileCreationSerializer, UserLoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework import status, permissions
from .validations import custom_validation, validate_username, validate_password
from .models import Profile  # Importa tu modelo personalizado
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
import jwt
from django.http import JsonResponse

def generate_token(request):
    # Obtén el usuario para el que deseas generar el token (por ejemplo, un superusuario)
    user = request.user

    # Define los datos que deseas incluir en el token (puedes personalizar esto según tus necesidades)
    payload = {
        'user_id': user.id,
        'username': user.username,
        # Otros datos relevantes para tu aplicación
    }

    # Genera el token utilizando una clave secreta (debes cambiar esto en producción)
    secret_key = '12345678'
    token = jwt.encode(payload, secret_key, algorithm='HS256')

    # Devuelve el token como parte de la respuesta
    return JsonResponse({'token': token})



class ProfileCreationView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = ProfileCreationSerializer
    permission_classes = [AllowAny]

class CustomLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = CustomAuthTokenSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=serializer.validated_data['username'],
                                password=serializer.validated_data['password'])
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
            else:
                return Response({'error': 'Credenciales incorrectas'},
                                status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_username(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)

class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)  