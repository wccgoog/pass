def findWords(words):
        """
        :type words: List[str]
        :rtype: List[str]
        """
        al=['qwertyuiop','asdfghjkl','zxcvbnm'] #键盘每行的按键
        rl=[]
        for word in words:
            word1=word.lower()
            for allow in al:
                if set(word1)==set(word1)&set(allow):  #只用一行键盘就能打出来的单词
                    rl.append(word)
        return rl

words=['Hello', 'Alaska', 'Dad', 'Peace']
print(findWords(words))