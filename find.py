def find(word,letter,index):
	while index<len(word):
		if word[index]==letter:
			return index
		index=index+1
	return -1
