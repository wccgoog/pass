
def all_anagrams(wordlist):
	fin=open(wordlist)
	d={}
	for line in fin:
		word=line.strip().lower()
		new_word=''.join(sorted(word))
		if new_word not in d:
			d[new_word]=[word]
		elif new_word in d:
			d[new_word].append(word)
	fin.close()
	return d




def word_print(d):
	t=list(d.items())
	t.sort(key=lambda x:len(x[1]),reverse=True)
	new_t=[]
	for i,j in t:
		if len(j)>1:
			new_t.append(j)
	for mwords in new_t:
		metatheses(mwords)

def metatheses(mwords):
	for word1 in mwords:
		for i in range(len(word1)//2):
			for j in range(len(word1)//2+1,len(word1)):
				word2=word1[:i]+word1[j]+word1[i+1:j]+word1[i]+word1[j+1:]
				if word2 in mwords and word1!=word2:
					print(word2)



d=all_anagrams('words.txt')
word_print(d)