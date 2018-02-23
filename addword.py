fin=open('words.txt')
t=[]
for line in fin:
	word=line.strip()
	t.append(word)
print(t)
fin.close()
