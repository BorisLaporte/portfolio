from modeltranslation.translator import register, TranslationOptions
from .models import Work, Role

@register(Role)
class RoleTranslationOptions(TranslationOptions):
    fields = ('name',)

@register(Work)
class WorkTranslationOptions(TranslationOptions):
    fields = ('title', 'desc', 'kind')