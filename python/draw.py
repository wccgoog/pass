import math
def polygon(t,n,length):
	angle=360/n
	polyline(t,n,length,angle)
		
def circle(t,r):
	arc(t,r,360)
	
def arc(t,r,angle):
	n=int((math.pi*r*2*angle/360)/3)+1
	length=math.pi*r*2/100*angle/360
	step_angle=angle/n
	polyline(t,n,length,step_angle)
		
def polyline(t,n,length,angle):
	for i in range(n):
		t.fd(length)
		t.lt(angle)


