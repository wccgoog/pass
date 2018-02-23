from has_no_e import has_no_e
fin=open('words.txt')
count=0
count_no_e=0
for line in fin:
	word=line.strip()
	count=count+1
	if has_no_e(word):
		count_no_e=count_no_e+1
		print(word)
print(count_no_e/count*100,'%')