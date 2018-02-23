def in_bisect(t,word):
	i=len(t)//2
	if word==t[i]:
		return t0.index(word)
	elif i<1:
		return None
	elif word<t[i]:
		return in_bisect(t[:i],word)
	elif word>t[i]:
		return in_bisect(t[i:],word)


