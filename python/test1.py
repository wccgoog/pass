# -*- coding: utf-8 -*-
t=[]
for i in range(50):
    t.append(0)
t[0]=t[1]=1
x=2
while(x<50):
    t[x]=t[x-1]+t[x-2]
    print(t[x])
    x+=1
