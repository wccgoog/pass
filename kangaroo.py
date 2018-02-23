# -*- coding: utf-8 -*-
"""
Created on Fri Jan 26 16:38:44 2018

@author: wccgo
"""

class Kangaroo():
    def __init__(self,name='',punch_contents=[]):
        self.name=name
        self.punch_contents=punch_contents
    def put_in_pouch(self,other):
        self.punch_contents.append(other)
    def get_list(self):
        s=''
        for i in self.punch_contents:
            if isinstance(i,Kangaroo):
                s+='%s '%i.name
            else:
                s+='%s '%i
        return s
    def __str__(self):
        s=self.get_list()
        return s
        
    
kanga=Kangaroo('kanga')
roo=Kangaroo('roo')
kanga.put_in_pouch(roo)
print(kanga)
kanga.put_in_pouch([1,2,3])
print(kanga)