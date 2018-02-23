from ish import ish
def countish(n):	
	i=0
	j=n
	count=0
	while j<100:
		if ish(str(i).zfill(2)+str(j)):
			count+=1
		i+=1
		j+=1
	return count
