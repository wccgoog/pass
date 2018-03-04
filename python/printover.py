from is_tri import is_tri

fin=open('words.txt')


for line in fin:
	word=line.strip()
	if is_tri(word):
		print(word)