from ish import ish
for num in range(100000,999999):
	if ish(str(num)[2:6]) and ish(str(num+1)[1:6]) and ish(str(num+2)[1:5]):
		print(num)