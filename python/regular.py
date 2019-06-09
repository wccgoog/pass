# -*- coding: utf-8 -*-
"""
Created on Sun Jan 28 16:51:09 2018

@author: wccgo
"""

import re

# key = r"<html><body><h1>hello world<h1></body></html>"#这段是你要匹配的文本
# p1 = r"ll*"#这是我们写的正则表达式规则，你现在可以不理解啥意思
# pattern1 = re.compile(p1)#我们在编译这段正则表达式
#matcher1 = re.search(pattern1,key)
#print (pattern1.findall(key))


key = r"chu x123.343.212.1@hit.edu.cn"
k = '"GET" \ | ui-ab|g_glass_80_d7ebf9_1x400."png"'
#p1 = r"\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}"
p1 = r'(?<=u).+?(?=u)'
p2 = r'^c.*'
p = r'[\\|]'
pattern1 = re.compile(p2)
pattern = re.compile(p)
print(pattern.findall(k))


# long_str='{"totalPage":100,"curPage":1}'
# pattern=re.compile('(?<=Page":).*?(?=,)')
# print(pattern.findall(long_str))
