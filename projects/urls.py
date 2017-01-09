from django.conf.urls import url
from .views import work_collection, work_element

app_name = "projects"
urlpatterns = [
    url(r'^$', work_collection, name='index'),
    url(r'^(?P<pk>[0-9]+)/$', work_element, name='detail'),
]