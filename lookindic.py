
fin=open('words.txt')
d={}
for line in fin:
	word=line.strip()
	d.setdefault(word,1)
fin.close()



fin=open('cmudict.txt')
d1={}
for line in fin:
	word=line.strip()
	t=word.split()
	words=t[0].lower()
	pron=''.join(t[1:])
	d1[words]=pron
fin.close()


for word in d:
	if len(word)==5 and word in d1:
		word1=word[1:]
		word2=word[0]+word[2:]
		if word1 in d1 and word2 in d1 and d1[word]==d1[word1] and d1[word1]==d1[word2]:
			print(word,word1,word2)
	else:
		pass
