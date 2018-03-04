def cumsum(t):
	new_t=[]
	for i in range(len(t)):
		new_t.append(sum(t[:i+1]))
	return new_t