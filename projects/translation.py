from modeltranslation.translator import register, TranslationOptions
from .models import Work, Role, Screenshot

@register(Role)
class RoleTranslationOptions(TranslationOptions):
    fields = ('name',)

@register(Screenshot)
class ScreenshotTranslationOptions(TranslationOptions):
    fields = ('alt',)

@register(Work)
class WorkTranslationOptions(TranslationOptions):
    fields = ('title','desc',)