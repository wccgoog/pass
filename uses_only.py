def uses_only(word,str):
	for letter in word:
		if letter not in str:
			return False
	return True

def new_uses_only(word,str):
    return set(word)<=set(str)