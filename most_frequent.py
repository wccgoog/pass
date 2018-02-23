def most_frequent(s):
	d={}
	for c in s:
		d[c]=d.get(c,0)+1
	t=sorted(d.items(),key=lambda s:s[1],reverse=True)   #出现次数降序排列
	for i,j in t:
		print(i,j)


most_frequent('apple')