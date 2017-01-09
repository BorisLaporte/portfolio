from modeltranslation.translator import register, TranslationOptions
from .models import Question, Choice

@register(Question)
class QuestionTranslationOptions(TranslationOptions):
    fields = ('question_text',)

@register(Choice)
class ChoiceTranslationOptions(TranslationOptions):
    fields = ('choice_text',)
