d={2:[0,1]}

def ackermann(m,n):
	if [m,n] in d.values():
		for k in d:
			if d[k]==[m,n]:
				return k
	if m==0:
		return n+1
	if m>0 and n==0:
		x=ackermann(m-1,1)
		d[x]=[m-1,1]
		return x
	if m>0 and n>0:
		x=ackermann(m-1,ackermann(m,n-1))
		return x

print(ackermann(3,6))