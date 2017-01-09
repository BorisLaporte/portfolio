from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from projects.serializers import WorkSerializer
from .models import Work


# from .models import Question

# class IndexView(generic.ListView):
#     template_name = 'projects/index.html'
#     context_object_name = 'latest_question_list'

#     def get_queryset(self):
#         """
# 	    Return the last five published questions (not including those set to be
# 	    published in the future).
# 	    """
#         return Question.objects.filter(
# 	        pub_date__lte=timezone.now()
# 	    ).order_by('-pub_date')[:5]


# class DetailView(generic.DetailView):
#     # try:
#     #     question = Question.objects.get(pk=question_id)
#     # except Question.DoesNotExist:
#     #     raise Http404("Question does not exist")
#     # return render(request, 'projects/detail.html', {'question': question})

#     # question = get_object_or_404(Question, pk=question_id)
#     # return render(request, 'projects/detail.html', {'question': question})
#     model = Question
#     template_name = 'projects/detail.html'


# class ResultsView(generic.DetailView):
#     model = Question
#     template_name = 'projects/results.html'


# def vote(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     try:
#         selected_choice = question.choice_set.get(pk=request.POST['choice'])
#     except (KeyError, Choice.DoesNotExist):
#         # Redisplay the question voting form.
#         return render(request, 'projects/detail.html', {
#             'question': question,
#             'error_message': "You didn't select a choice.",
#         })
#     else:
#         selected_choice.votes += 1
#         selected_choice.save()
#         # Always return an HttpResponseRedirect after successfully dealing
#         # with POST data. This prevents data from being posted twice if a
#         # user hits the Back button.
#         return HttpResponseRedirect(reverse('projects:results', args=(question.id,)))

@api_view(['GET'])
def work_collection(request):
    if request.method == 'GET':
        works = Work.objects.all()
        serializer = WorkSerializer(works, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def work_element(request, pk):
    try:
        work = Work.objects.get(pk=pk)
    except Work.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = WorkSerializer(work)
        return Response(serializer.data)