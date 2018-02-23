def mysqrt(a,x):
	while True:
		print(x)
		y=(x+a/x)/2
		if abs(y-x)<0.00001:
			return y
		x=y