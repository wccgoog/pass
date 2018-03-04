import random
def choose_from_hist(d):
	t=[]
	for i,j in d.items():
		for x in range(j):
			t.append(i)
	print(random.choice(t))

choose_from_hist({'a':2,'b':1})