def has_duplicates(t):
	for i in range(len(t)-1):
		if t[i] in t[i+1:]:
			return True
	return False

def new_has_duplicates(t):
    return len(set(t))<len(t)