# -*- coding: utf-8 -*-
"""
Created on Sun Feb 11 14:53:08 2018

@author: wccgo
"""

root_path='c:/users/wcc/desktop/'
txt_path=root_path+'1.txt'
f=open(txt_path,'r')
cookies={}
for line in f.read().split(';'):   
    name,value=line.strip().split('=',1)  
    cookies[name]=value 
print(cookies)