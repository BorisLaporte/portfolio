from __future__ import unicode_literals

import datetime
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import python_2_unicode_compatible
from PIL import Image
from subprocess import call

def pngquant(img_path):
    call(["pngquant","--output", img_path, "--force", "--strip","--",img_path])

def compress_and_replace(_img):
    type = _img.file.name.rsplit('.',1)[1]
    if type.upper() in ("JPG", "JPEG"):
        im = Image.open(_img)
        im.save(_img.path, quality=80)
    elif type.upper() in ("PNG"):
        pngquant(_img.path)


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
        return "%s / %s" % ( self.people.__unicode__(), self.role.__unicode__() )

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
        super(Techno, self).save(*args, **kwargs)

        # COMPRESS IMAGE AND REPLACE IT
        if self.image != self.__original_image:
            compress_and_replace(self.image)

        self.__original_image = self.image

class Work(models.Model):
    name = models.CharField(max_length=100)
    background = models.ImageField(upload_to='backgrounds/')
    title = models.CharField(max_length=200)
    desc = models.TextField()
    kind = models.CharField(max_length=200)
    technos = models.ManyToManyField(Techno)
    date = models.DateField()
    role = models.ForeignKey(Role)
    teamates = models.ManyToManyField(Teamate)
    responsive = models.NullBooleanField()
    link = models.URLField()
    color = models.CharField(max_length=7, default="#000000")
 

    def __unicode__(self):
        return self.name

    __original_background = None

    def __init__(self, *args, **kwargs):
        super(Work, self).__init__(*args, **kwargs)
        self.__original_background = self.background

    def save(self, *args, **kwargs):
        super(Work, self).save(*args, **kwargs)

        # COMPRESS IMAGE AND REPLACE IT
        if self.background != self.__original_background:
            compress_and_replace(self.background)

        self.__original_background = self.background
