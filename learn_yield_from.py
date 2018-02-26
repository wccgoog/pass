# -*- coding: utf-8 -*-
"""
Created on Sun Jan 28 11:59:03 2018

@author: wccgo
"""
from collections import Iterable
def flatten(items,ignore_types=(str,bytes)):
    for x in items:
        if isinstance(x,Iterable) and not isinstance(x,ignore_types):
            yield from flatten(x)
        else:
            yield x
items=[1,2,[3,4,[5,6],7],8]
for x in flatten(items):
    print(x)
items=['dave','jack',['christ','adam']]
for x in flatten(items):
    print(x)