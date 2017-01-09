from __future__ import unicode_literals

import datetime
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible  # only if you need to support Python 2
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return _(self.question_text)

    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now
    was_published_recently.admin_order_field = 'pub_date'
    was_published_recently.boolean = True
    was_published_recently.short_description = 'Published recently?'


@python_2_unicode_compatible  # only if you need to support Python 2
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text

class Role(models.Model):
    name = models.CharField(max_length=200)

class Teamate(models.Model):
    name = models.CharField(max_length=200)
    portfolio = models.URLField(max_length=200)
    role = models.ForeignKey(Role)

class Techno(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='technos/')

class Screenshot(models.Model):
    href = models.CharField(max_length=200)
    image = models.ImageField(upload_to='screenshots/')
    portrait = models.BooleanField()

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
    image_landscape = models.ManyToManyField(Screenshot, related_name='image_landscape')
    image_portrait = models.ManyToManyField(Screenshot, related_name='image_portrait')
    responsive = models.NullBooleanField()
    link = models.URLField()
    color = models.CharField(max_length=7, default="#000000")
