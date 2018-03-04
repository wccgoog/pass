def koch(t,x):    # x代表长度
	if x<3:
		t.fd(x)
		return
	koch(t,x/3)
	t.lt(60)
	koch(t,x/3)
	t.rt(120)
	koch(t,x/3)
	t.lt(60)
	koch(t,x/3)