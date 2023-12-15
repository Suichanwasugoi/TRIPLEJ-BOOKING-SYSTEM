from django.db import models

class Booking(models.Model):
    flightname = models.TextField(max_length=255, blank=True, default='')
    destination = models.TextField(max_length=255, blank=True, default='')
    price = models.TextField(max_length=255, blank=True, default='')
    date = models.TextField(max_length=255, blank=True, default='')

    class Meta:
        ordering = ['id']
