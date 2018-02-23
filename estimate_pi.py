import math
def estimate_pi():
	k=0
	sum=sum0=math.factorial(4*k)/math.factorial(k)**4*(26390*k+1103)/396**(4*k)
	while sum0>=10**-15:
		k+=1
		sum0=math.factorial(4*k)/math.factorial(k)**4*(26390*k+1103)/396**(4*k)
		sum=sum+sum0
	pi=1/(2*math.sqrt(2)/99**2*sum)
	print(pi)
estimate_pi()