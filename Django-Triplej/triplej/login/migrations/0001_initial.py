# Generated by Django 4.2.7 on 2023-12-02 05:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='login',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userid', models.DateTimeField(auto_now_add=True)),
                ('username', models.CharField(blank=True, default='', max_length=255)),
                ('password', models.TextField(blank=True, default='', max_length=255)),
            ],
            options={
                'ordering': ['userid'],
            },
        ),
    ]
