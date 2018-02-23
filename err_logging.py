#err_logging.py
import logging
def foo(s):
	return 10/int(s)
def bar(s):
	return foo(s)*2
def main():
	try:
		bar('0')
	except:
		logging.exception(Exception)
main()
print('END')
