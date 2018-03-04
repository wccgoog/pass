import os
def dir_low():
	l=os.path.split(os.path.abspath('.'))
    for x in os.listdir('.'):
	    os.path.join(l[0],x)