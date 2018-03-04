# -*- coding: utf-8 -*-
"""
Created on Mon Jan 22 18:01:01 2018

@author: wcc
"""

import os
def walk(dirname):
    for name in os.listdir(dirname):
        path=os.path.join(dirname,name)
#        print(type(name))
        if os.path.isfile(path):
            print(path)
        else:
            walk(path)

#walk('c:\work')

def walk2(dirname):
    for root,dirs,files in os.walk(dirname):
#        print('root:',root,'dirs:',dirs,'files:',files)
        for filename in files:
            print(os.path.join(root,filename))

#walk2('c:\work')