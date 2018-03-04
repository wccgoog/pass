def rotate_word(word,n):
	new_word=''
	for letter in word:
		new_letter=chr(ord(letter)+n)
		new_word=new_word+new_letter
	return new_word

fin=open('words.txt')
d={}
for line in fin:
	word=line.strip()
	d.setdefault(word,1)
fin.close()



for word in d:
	for n in range(1,26):
		new_word=rotate_word(word,n)
		if new_word in d:
			print(word,new_word)
