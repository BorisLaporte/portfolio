from django.contrib import admin
from modeltranslation.admin import TranslationAdmin

from .models import Role,Teamate,Techno,Work,Screenshot
from .forms import WorkForm

class WorkAdmin(admin.ModelAdmin):
    form = WorkForm
    filter_horizontal = ('technos','image_landscape','image_portrait','teamates')


admin.site.register(Role)
admin.site.register(Teamate)
admin.site.register(Techno)
admin.site.register(Screenshot)
admin.site.register(Work, WorkAdmin)