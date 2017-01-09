from django.shortcuts import render
from django.http import HttpResponse
from django.urls import reverse
from django.views.generic.base import TemplateView
from django.utils import timezone

class IndexView(TemplateView):
    template_name = 'portfolio/index.html'