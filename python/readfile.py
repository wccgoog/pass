import string
deli=string.punctuation+string.whitespace+'"'+'“'+'”'+'·'+'-'+'—'

def readfile(n,start=0):
	t=[]
	fin=open(n,encoding='UTF-8')
	lines=fin.readlines()
	for line in lines[start:]:	
		for x in deli:
			line=line.replace(x,' ')	
		word=line.lower().split()
		if word!=[]:
			t.append(word)
	fin.close()
	return t


def re_t(t):
	new_t=[]
	for i in range(len(t)):
		for j in t[i]:
			new_t.append(j)
	return new_t



def count_in_dict(t):
	d={}
	for word in t:
		if word not in d:
			d[word]=1
		else:
			d[word]=d.get(word)+1
	return d

def file_count_words(n,start=0):
	t=readfile(n,start)
	t1=re_t(t)
	d=count_in_dict(t1)
	count=sorted(d.items(),key=lambda x:x[1])
	print(count)

def different_words(wdict,book,start=0):
	d=count_in_dict(re_t(readfile(wdict)))
	b=count_in_dict(re_t(readfile(book,start=0)))
	wrong={}
	for word in b:
		if word not in d and word.isdigit()==False:
			wrong.setdefault(word)
	for i,j in wrong.items():
		print(i,end=' ')

different_words('words.txt','british_birds.txt',251)


