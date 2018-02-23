# -*- coding: utf-8 -*-
"""
Created on Wed Jan 24 17:32:54 2018

@author: wccgo
"""


def sed(fstr,sstr,filename1,filename2):
    try:
        fin1=open(filename1)
        fin2=open(filename2,'w')
        for x in fin1:
            x=x.replace(fstr,sstr)
            print(x)
            fin2.write(x)
    except OSError:
        print('oserror')
    fin1.close()
    fin2.close()

sed('world','you','file1.txt','file2.txt')
    