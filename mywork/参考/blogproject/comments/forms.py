# -*- coding: utf-8 -*-
"""
Created on Wed Feb 21 11:07:26 2018

@author: wccgo
"""

from django import forms
from .models import Comment

class CommentForm(forms.ModelForm):
    class Meta:
        model=Comment
        fields=['name','email','url','text']