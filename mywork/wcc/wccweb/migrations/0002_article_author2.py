# Generated by Django 2.0.3 on 2018-03-11 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wccweb', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='author2',
            field=models.CharField(default='no_one', max_length=20),
        ),
    ]