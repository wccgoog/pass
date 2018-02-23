def back_line():
	x=input('输入需要倒序的字符串')
	i=len(x)-1
	while i>=0:
		print(x[i])
		i=i-1
back_line()