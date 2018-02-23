# -*- coding: utf-8 -*-
"""
Created on Sun Jan 28 11:59:03 2018

@author: wccgo
"""
def consumer():
    r='here'
    for i in range(3):
        print(i,r)
        x=yield r
        y=yield 1
        print('x:',x,'y:',y)
        r=r + str(i)
c=consumer()
n1=c.__next__()
n2=c.send(100)
n3=c.__next__()
print('n1:%s,n2:%s,n3:%s'%(n1,n2,n3))