def gcd(a,b):
	if b==0:
		print('最大公约数为',a)
		return
	r=a%b
	if r==1:
		print('最大公约数为1')
		return
	return gcd(b,r)
	
a=int(input('a:'))
b=int(input('b:'))
gcd(a,b)
