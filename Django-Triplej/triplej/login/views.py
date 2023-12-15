from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializers import CustomUserSerializer, CustomUserLoginSerializer
from rest_framework import serializers


class CustomUserView(APIView):
    def get(self, request, pk=None):
        if pk is not None:
            user = CustomUser.objects.get(pk=pk)
            serializer = CustomUserSerializer(user)
            return Response(serializer.data)
        else:
            users = CustomUser.objects.all()
            serializer = CustomUserSerializer(users, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(password=make_password(request.data['password']))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk): 
        user = CustomUser.objects.get(pk=pk)
        serializer = CustomUserSerializer(user, data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except serializers.ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CustomUserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CustomUserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = CustomUser.objects.get(email=email)

            # Create a session for the user
            request.session['user_id'] = user.id

            request.session.save()

            response_data = {
                'user_id': user.id,
                'email': user.email,
            }

            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)