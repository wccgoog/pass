# -*- coding: utf-8 -*-
"""
Created on Wed Jan 24 15:26:55 2018

@author: wccgo
"""

import os,hashlib
d={}
def find_files(dir,suffix):
    t=[]
    for root,dirs,files in os.walk(dir):
        for file in files:
            if file.endswith(suffix):
                t.append(os.path.abspath(file))
    return t

def find_same_md5(t):
    for file in t:
        file_b=file.encode('utf-8')
        key=hashlib.md5(file_b)
        if key not in d:
            d[key]=[file]
        else:
            d[key].append(file)

def remove_same_files(d):
    for file_list in d.values():
        if len(file_list)>1:
            for file in file_list[1:]:
                os.remove(file)

t=find_files('c:\work','py')
d=find_same_md5(t)
remove_same_files(d)