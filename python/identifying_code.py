# -*- coding: utf-8 -*-
"""
Created on Sun Jan 28 11:59:03 2018

@author: wccgo
"""

from PIL import Image,ImageFilter,ImageDraw,ImageFont
import random
letters=''
def rndChar():
    letter=chr(random.randint(65,90))
    global letters
    letters+=letter
    return letter
def rndColor():
    return (random.randint(64,255),random.randint(64,255),random.randint(64,255))
def rndColor2():
    return (random.randint(32,127),random.randint(32,127),random.randint(32,127))
width=60*4
height=60
image=Image.new('RGB',(width,height),(255,255,255))
font=ImageFont.truetype('Arial.ttf',36)
draw=ImageDraw.Draw(image)
for x in range(width):
    for y in range(height):
        draw.point((x,y),fill=rndColor())
for t in range(4):
    draw.text((60*t+10,10),rndChar(),font=font,fill=rndColor2())
image=image.filter(ImageFilter.BLUR)
image.save('code.jpg','jpeg')
print(letters)#输出验证码
