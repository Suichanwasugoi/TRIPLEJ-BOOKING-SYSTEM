# urls.py

from django.urls import path
from .views import BookingViewSet

urlpatterns = [
    path('booking/', BookingViewSet.as_view({
        'get': 'list',
        'post': 'create',
    })),

    path('booking/<int:pk>/', BookingViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy',
    })),
]
