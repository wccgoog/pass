def new_invert_dict(d):
	inverse={}
	for key in d:
		val=d[key]
		inverse.setdefault(val,key)
	return inverse

