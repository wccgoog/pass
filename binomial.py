# -*- coding: utf-8 -*-
"""
Created on Sun Jan 28 16:12:16 2018

@author: wccgo
"""
d={}
def binomial_coeff(n,k):
    if k==0:
        return 1
    return 0 if n==0 else binomial_coeff(n-1,k)+binomial_coeff(n-1,k-1)

print(binomial_coeff(3,2))