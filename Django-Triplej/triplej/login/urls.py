from django.urls import path
from .views import CustomUserView, CustomUserLoginView

urlpatterns = [
    path('users/', CustomUserView.as_view(), name='user_list'),
    path('users/<int:pk>/', CustomUserView.as_view(), name='user-detail'),
    path('login/', CustomUserLoginView.as_view(), name='user-login'),
]