# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-23 11:15
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0006_auto_20170122_1714'),
    ]

    operations = [
        migrations.CreateModel(
            name='People',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('portfolio', models.URLField(blank=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='teamate',
            name='name',
        ),
        migrations.RemoveField(
            model_name='teamate',
            name='portfolio',
        ),
        migrations.AlterField(
            model_name='work',
            name='image_landscape',
            field=models.ManyToManyField(blank=True, related_name='image_landscape', to='projects.Screenshot'),
        ),
        migrations.AlterField(
            model_name='work',
            name='image_portrait',
            field=models.ManyToManyField(blank=True, related_name='image_portrait', to='projects.Screenshot'),
        ),
        migrations.AddField(
            model_name='teamate',
            name='people',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.People'),
        ),
    ]
