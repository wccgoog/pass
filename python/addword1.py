fin=open('words.txt')
t1=[]
for line in fin:
	word=line.strip()
	t1=t1+word.split()
print(t1)

fin.close()