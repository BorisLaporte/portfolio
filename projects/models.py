from __future__ import unicode_literals

import datetime
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import python_2_unicode_compatible

class Role(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name.encode('utf8')

class Teamate(models.Model):
    name = models.CharField(max_length=200)
    portfolio = models.URLField(max_length=200, blank=True)
    role = models.ForeignKey(Role)

    def __str__(self):
        return self.name.encode('utf8')

class Techno(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='technos/')

    def __str__(self):
        return self.name.encode('utf8')

class Screenshot(models.Model):
    alt = models.CharField(max_length=200)
    image = models.ImageField(upload_to='screenshots/')
    portrait = models.BooleanField()

    def __str__(self):
        return self.alt.encode('utf8')

class Work(models.Model):
    name = models.CharField(max_length=100)
    background = models.ImageField(upload_to='backgrounds/')
    title = models.CharField(max_length=200)
    desc = models.TextField()
    technos = models.ManyToManyField(Techno)
    kind = models.CharField(max_length=200)
    date = models.DateField()
    role = models.ForeignKey(Role)
    teamates = models.ManyToManyField(Teamate)
    image_landscape = models.ManyToManyField(Screenshot, related_name='image_landscape', blank=True, null=True)
    image_portrait = models.ManyToManyField(Screenshot, related_name='image_portrait', blank=True, null=True)
    responsive = models.NullBooleanField()
    link = models.URLField()
    color = models.CharField(max_length=7, default="#000000")

    def __str__(self):
        return self.name.encode('utf8')
