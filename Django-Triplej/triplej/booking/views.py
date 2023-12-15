from rest_framework.viewsets import ModelViewSet
from .models import Booking
from .serializers import BookingSerializer
from rest_framework.response import Response
from rest_framework import status

class BookingViewSet(ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk, *args, **kwargs):
        try:
            booking = Booking.objects.get(id=pk)
            serializer = BookingSerializer(booking)
            return Response(serializer.data)
        except Booking.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk, *args, **kwargs):
        booking = Booking.objects.get(id=pk)
        serializer = BookingSerializer(booking, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk, *args, **kwargs):
        return self.update(request, pk, *args, **kwargs)

    def destroy(self, request, pk, *args, **kwargs):
        try:
            Booking.objects.get(id=pk).delete()
            return Response(status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
