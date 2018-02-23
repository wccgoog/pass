def ish(word):
	if len(word)<2:
		return True
	elif word[0]==word[-1]:
		return ish(word[1:-1])
	else:
		return False
