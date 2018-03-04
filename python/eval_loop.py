import math
def eval_loop():
	print('如果要终止请输入done')
	while True:
		x=input('输入算式')
		if x=='done':
			print('已结束')
			break
		print(eval(x))
eval_loop()