# -*- coding: utf-8 -*-
"""
Created on Wed Jan 24 15:23:12 2018

@author: wccgo
"""

def linecount(filename):
    count=0
    for line in open(filename):
        count+=1
    return count
print(linecount('wc.py'))
print(__name__)
if __name__=='__main__':
    print(linecount('wc.py'))