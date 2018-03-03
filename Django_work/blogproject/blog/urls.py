# -*- coding: utf-8 -*-
"""
Created on Tue Feb 13 11:07:39 2018

@author: wccgo
"""

from django.conf.urls import url
from . import views
app_name='blog'
urlpatterns=[
        url(r'^$',views.index,name='index'),
        url(r'^post/(?P<pk>[0-9]+)/$',views.detail,name='detail'),
        url(r'^archives/(?P<year>[0-9]{4})/(?P<month>[0-9]{1,2})/$',views.archives,name='archives'),
        ]