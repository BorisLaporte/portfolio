from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import translation
from projects.serializers import WorkSerializer
from .models import Work

def try_change_language(_request):
    try:
        lang = _request.GET['lang']
        translation.activate(lang)
    except :
        pass

@api_view(['GET'])
def work_collection(request):
    if request.method == 'GET':
        try_change_language(request)
        try:
            works = Work.objects.all()
        except Work.DoesNotExist:
            return HttpResponse(status=404)
        serializer = WorkSerializer(works, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def work_element(request, pk):
    if request.method == 'GET':
        try_change_language(request)
        try:
            work = Work.objects.get(pk=pk)
        except Work.DoesNotExist:
            return HttpResponse(status=404)
        serializer = WorkSerializer(work)
        return Response(serializer.data)