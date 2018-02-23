# -*- coding: utf-8 -*-
"""
Created on Sun Jan 28 16:51:09 2018

@author: wccgo
"""

import re

#key = r"<html><body><h1>hello world<h1></body></html>"#这段是你要匹配的文本
#p1 = r"ll*"#这是我们写的正则表达式规则，你现在可以不理解啥意思
#pattern1 = re.compile(p1)#我们在编译这段正则表达式
#matcher1 = re.search(pattern1,key)
#print (pattern1.findall(key))


key = r"chux123.343.212.1iuhong@hit.edu.cn"
#p1 = r"\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}"
p1=r'(?<=u).+?(?=u)'
pattern1 = re.compile(p1)
print (pattern1.findall(key))