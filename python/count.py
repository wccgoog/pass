import find
def count(word,letter):
	count=0
	index=find.find(word,letter,0)
	while index>=0 and index<len(word):
		count=count+1
		index=find.find(word,letter,index)+1
	return count