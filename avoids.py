fin=open('words.txt')
def avoids(word,forbid_str):
	for letter in forbid_str:
		if letter in word:
			return False
	return True



def countforbid(forbid_str):
	count=0
	for line in fin:
		word=line.strip()
		if avoids(word,forbid_str):
			count=count+1
	print('forbidden letter is',forbid_str)
	print(count)

forbid_str=input('输入禁用字符串')
countforbid(forbid_str)