from django.contrib import admin
from .models import Question,Choice,Role,Teamate,Techno,Screenshot,Work
from .forms import WorkForm

# class ChoiceInline(admin.TabularInline):
#     model = Choice
#     extra = 3


# class QuestionAdmin(admin.ModelAdmin):
#     # fieldsets = [
#     #     (None,               {'fields': ['question_text']}),
#     #     ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
#     # ]
#     inlines = [ChoiceInline]
#     list_display = ('question_text', 'pub_date', 'was_published_recently')
#     list_filter = ['pub_date']
#     search_fields = ['question_text']

# admin.site.register(Question, QuestionAdmin)

class WorkAdmin(admin.ModelAdmin):
    form = WorkForm
    filter_horizontal = ('technos','image_landscape','image_portrait','teamates');

admin.site.register(Techno)
admin.site.register(Screenshot)
admin.site.register(Teamate)
admin.site.register(Work, WorkAdmin)