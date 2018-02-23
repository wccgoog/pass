def nested_sum(t):
	sumall=0
	for i in range(len(t)):
		sumall=sumall+sum(t[i])
	return sumall

