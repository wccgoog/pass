# -*- coding: utf-8 -*-
"""
Created on Wed Feb 21 13:57:36 2018

@author: wccgo
"""

from django.conf.urls import url
from . import views

app_name='comments'
urlpatterns=[
        url(r'^comment/post/(?P<post_pk>[0-9]+)/$',views.post_comment,name='post_comment'),
        ]