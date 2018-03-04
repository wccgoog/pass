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

import shelve
def store_anagrams(d,shelve_name):
    db=shelve.open(shelve_name,'c')
    for word,anagrams in d.items():
        db[word]=anagrams
    db.close()
    
def read_anagrams(d,word):
    for wordlist in d.values():
        if word in wordlist:
            return wordlist
        else:
            raise KeyError

def word_print(d):
	t=list(d.items())
	t.sort(key=lambda x:len(x[1]),reverse=True)
	for i,j in t:
		if len(j)>1:
			print(j)
d=all_anagrams('words.txt')
word_print(d)