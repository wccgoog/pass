import re
long_str='{"totalPage":100,"curPage":1}'
pattern=re.compile('(?<=Page":).*?(?=,)')
print(pattern.findall(long_str))