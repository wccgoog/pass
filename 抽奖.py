# -*- coding: utf-8 -*-
"""
Created on Fri Feb  9 19:21:22 2018

@author: wccgo
"""
from tkinter import *
import tkinter.messagebox as messagebox
class Application(Frame):
    def __init__(self,master=None):
        Frame.__init__(self,master)
        self.pack()
        self.createWidgets()
    def createWidgets(self):
        self.label=Label(self,text='请输入你的尊姓大名!!!!!')
        self.label.pack()
        self.nameInput=Entry(self)
        self.nameInput.pack()
        self.alterButton=Button(self,text='抽奖!!!',command=self.hello)
        self.alterButton.pack()
    def hello(self):
        name=self.nameInput.get() 
        messagebox.showinfo('抽奖结果','恭喜,%s获得一等奖'%name)
        
app=Application()
app.master.title('试试看')
app.mainloop()