from __future__ import unicode_literals

import datetime
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import python_2_unicode_compatible
from PIL import Image
import pdb
from subprocess import call

def pngquant(img):
    call(["pngquant","--output", img, "--force", "--strip","--",img])


class Role(models.Model):
    name = models.CharField(max_length=200)

    def __unicode__(self):
        return self.name

class People(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200, blank=True)
    portfolio = models.URLField(max_length=200, blank=True)

    def __unicode__(self):
        return "%s %s" % ( self.first_name, self.last_name )

class Teamate(models.Model):
    people = models.ForeignKey(People, null=True)
    role = models.ForeignKey(Role, null=True)

    def __unicode__(self):
        return self.people.__unicode__()

class Techno(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='technos/')

    def __unicode__(self):
        return self.name

    __original_image = None

    def __init__(self, *args, **kwargs):
        super(Techno, self).__init__(*args, **kwargs)
        self.__original_image = self.image

    def save(self, *args, **kwargs):
        # if self.image != self.__original_image:
        old = self.image
        super(Techno, self).save(*args, **kwargs)
        type = self.image.file.name.rsplit('.',1)[1]
        # pdb.set_trace()
        if type.upper() in ("JPG", "JPEG"):
            im = Image.open(self.image)
            im.save(self.image.path, quality=80)
        elif type.upper() in ("PNG"):
            pngquant(self.image.path)

        self.__original_image = self.image

class Screenshot(models.Model):
    alt = models.CharField(max_length=200)
    image = models.ImageField(upload_to='screenshots/')
    portrait = models.BooleanField()

    def __unicode__(self):
        return self.alt

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
    image_landscape = models.ManyToManyField(Screenshot, related_name='image_landscape', blank=True)
    image_portrait = models.ManyToManyField(Screenshot, related_name='image_portrait', blank=True)
    responsive = models.NullBooleanField()
    link = models.URLField()
    color = models.CharField(max_length=7, default="#000000")

    def __unicode__(self):
        return self.name
