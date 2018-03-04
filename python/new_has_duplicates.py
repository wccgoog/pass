from histogram import histogram
def new_has_duplicates(t):
	d=histogram(t)
	if len(d)<len(t):
		return True
	return False



t=['wro','svs','sos','wri','sos']
print(new_has_duplicates(t))