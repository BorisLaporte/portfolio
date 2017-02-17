from rest_framework import serializers
from .models import Work, Techno, Teamate, Role, People

class TechnoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Techno
        fields = ('name','image')

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('name',)

class PeopleSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = ('first_name','last_name','portfolio')

class TeamateSerializer(serializers.ModelSerializer):
    role =  RoleSerializer(many=False, read_only=True)
    people =  PeopleSerializer(many=False)

    class Meta:
        model = Teamate
        fields = ('role','people')

class WorkSerializer(serializers.ModelSerializer):
    technos = TechnoSerializer(many=True, read_only=True)
    teamates =	TeamateSerializer(many=True, read_only=True)
    role =	RoleSerializer(many=False, read_only=True)

    class Meta:
        model = Work
        fields = ( 'title', 'desc', 'kind', 'name','background','technos','date','role','teamates','responsive','link','color')
