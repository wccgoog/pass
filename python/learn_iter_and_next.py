class myrange():
    def __init__(self,start,stop):
        self.start=start-1
        self.stop=stop
    def __iter__(self):
        return self
    def __next__(self):
        if self.start==self.stop:
            raise StopIteration
        self.start+=1
        return self.start

for i in myrange(1,5):
    print(i)