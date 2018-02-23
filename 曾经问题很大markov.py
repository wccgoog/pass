import sys,string,random
deli=r'"#$%&()*+-/<=>@[\]^_`{|}~'+string.whitespace+r'0123456789'
gdeli=r',.!:;?'
d={}
def readfile(n,order):
	global d
	td=[]
	fin=open(n,encoding='UTF-8')
	for line in fin:	
		for x in deli:
			line=line.replace(x,' ')
		for x in gdeli:
			line=line.replace(x,' '+x+' ')
		word=line.lower().split()
		for i in range(len(word)):
			td.append(word[i])
	fin.close()
	for i in range(len(td)-order):
		t=()
		for j in range(i,i+order):
			t=t+(td[j],)
		if t not in d.keys():
			d[t]=[td[i+order]]
		else:
			d[t].append(td[i+order])

	

def get_sentence(n,s_order=5,order=2,*args):
	dict_sum(n,order,*args)
	sentence=sen_sum(s_order)
	print(sentence)

def dict_sum(n,order,*args):
	readfile(n,order)
	for i in args:
		readfile(i,order)
			

def sen_sum(s_order):
	fword=random.choice(list(d.keys()))
	firstword=''
	for i in range(len(fword)):
		firstword=firstword+fword[i]+' '
	sentence=firstword
	j=0
	while j<s_order:
		secondword=random.choice(d[fword])		
		sentence=sentence+secondword+' '
		fword=fword[1:]+(secondword,)
		if fword not in d:
			fword=random.choice(list(d.keys()))
		j+=1
	return sentence		





get_sentence('british_birds.txt',50,3,'emma.txt','gems.txt')


