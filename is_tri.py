def is_tri(word):
	if len(word)<6:
		return False
	else:
		for i in range(len(word)-5):
			if word[i]==word[i+1] and word[i+2]==word[i+3] and word[i+4]==word[i+5]:
				return True
		return False