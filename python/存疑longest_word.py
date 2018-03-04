def wordlist(n):
	d={}
	fin=open(n)
	for line in fin:
		word=line.strip()
		d.setdefault(word)
	fin.close()
	return d

d=wordlist('words.txt')
d.setdefault('')
d.setdefault('a')
d.setdefault('i')

memo={}
memo['']=['']

def children(word,d):
	res=[]
	for i in range(len(word)):
		child=word[:i]+word[i+1:]
		if child in d:
			res.append(child)
	return res



def is_reducible(word,d):
	if word in memo:
		return memo[word]
	res=[]
	for child in children(word,d):
		if is_reducible(child,d):
			res.append(child)
	memo[word]=res
	if [''] in res:					#自行修改后,确保最后一个字母是单词
		return res
	else:
		return []

def all_reducble(d):
	res=[]
	for word in d:
		t=is_reducible(word,d)
		if t!=[]:    
			res.append(word)
	return res

#def print_trail(word):
#	if len(word)==0:
#		return
#	print(word,end=' ')
#	t=is_reducible(word,d)
#	if t==[]:
#		return
#	print_trail(t[0]) 

def print_longest_words(d):
	words=all_reducble(d)
	t=[]
	for word in words:
		t.append((len(word),word))
	t.sort(reverse=True)
	for word in t[0:5]:
		print(word)
		#print('\n')

print_longest_words(d)




