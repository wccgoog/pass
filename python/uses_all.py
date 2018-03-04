def uses_all(word,str):
	for letter in str:
		if letter not in word:
			return False
	return True
def new_uses_all(word,str):
    return all(letter in word for letter in str)