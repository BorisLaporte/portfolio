# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-02-27 01:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_auto_20170217_2346'),
    ]

    operations = [
        migrations.AddField(
            model_name='work',
            name='order',
            field=models.IntegerField(default=0),
        ),
    ]
