import random
from has_duplicates import has_duplicates

def countdup():
	countd=count=0
	while countd<100:
		count=count+1
		t23=[]
		for i in range(23):
			t23.append(random.randint(1,365))
		if has_duplicates(t23):
			countd=countd+1
			print(t23)
	print('概率为',countd/count*100,'%')

countdup()