count=0
def a():
	x=0
	def b():
		nonlocal x
		global count
		x=x+1
		print(x)
		count+=1
		print(count)
	b()
	print(x)

