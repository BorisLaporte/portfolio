# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-02-17 14:54
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='People',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=200)),
                ('last_name', models.CharField(blank=True, max_length=200)),
                ('portfolio', models.URLField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('name_en', models.CharField(max_length=200, null=True)),
                ('name_fr', models.CharField(max_length=200, null=True)),
                ('name_es', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Teamate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('people', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.People')),
                ('role', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.Role')),
            ],
        ),
        migrations.CreateModel(
            name='Techno',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('image', models.ImageField(upload_to='technos/')),
            ],
        ),
        migrations.CreateModel(
            name='Work',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('background', models.ImageField(upload_to='backgrounds/')),
                ('title', models.CharField(max_length=200)),
                ('title_en', models.CharField(max_length=200, null=True)),
                ('title_fr', models.CharField(max_length=200, null=True)),
                ('title_es', models.CharField(max_length=200, null=True)),
                ('desc', models.TextField()),
                ('desc_en', models.TextField(null=True)),
                ('desc_fr', models.TextField(null=True)),
                ('desc_es', models.TextField(null=True)),
                ('kind', models.CharField(max_length=200)),
                ('kind_en', models.CharField(max_length=200, null=True)),
                ('kind_fr', models.CharField(max_length=200, null=True)),
                ('kind_es', models.CharField(max_length=200, null=True)),
                ('date', models.DateField()),
                ('responsive', models.NullBooleanField()),
                ('link', models.URLField()),
                ('color', models.CharField(default='#000000', max_length=7)),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.Role')),
                ('teamates', models.ManyToManyField(to='projects.Teamate')),
                ('technos', models.ManyToManyField(to='projects.Techno')),
            ],
        ),
    ]
