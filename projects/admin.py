from django.contrib import admin
from modeltranslation.admin import TranslationAdmin
from .models import Role,Teamate,Techno,Work,People
from .forms import WorkForm

class RoleAdmin(TranslationAdmin):
    pass

class WorkAdmin(TranslationAdmin):
    form = WorkForm
    filter_horizontal = ('technos','teamates')


admin.site.register(Role, RoleAdmin)
admin.site.register(People)
admin.site.register(Teamate)
admin.site.register(Techno)
admin.site.register(Work, WorkAdmin)