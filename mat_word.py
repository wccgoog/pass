# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

# -*- coding: UTF-8 -*-
import matplotlib.pyplot as plt
import string,math
deli=string.punctuation+string.whitespace+'"'+'“'+'”'+'·'+'-'+'—'+'0123456789'



d={}
t=[]
f=()
r=()
def readfile(file_name):
    td=[]
    fin=open(file_name,encoding='UTF-8')
    for line in fin:	
    	 for x in deli:
    		  line=line.replace(x,' ')
    	 word=line.lower().split()
    	 for i in range(len(word)):
    		  td.append(word[i])
    for i in td:
        d[i]=d.get(i,0)+1
    fin.close()

def rate():
    for i,j in d.items():
        t.append((j,i))
    t.sort(reverse=True)
#    print(t)



readfile('emma.txt')
rate()
def draw(n):
    global f,r
    for i in range(1,n):
        f=f+(math.log10(t[i-1][0]),)  #  f是字母的频率  r是字母的排名
        r=r+(math.log10(i),)  #log f=log c -s*log r
    plt.plot(r,f)
    plt.show()


draw(1000)








