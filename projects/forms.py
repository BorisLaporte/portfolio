from django.forms import ModelForm
from django.forms.widgets import TextInput
from .models import Work

class WorkForm(ModelForm):

    class Meta:
        model = Work
        fields = '__all__'
        widgets = {
            'color': TextInput(attrs={'type': 'color'}),
        }