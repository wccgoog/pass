# -*- coding: utf-8 -*-
"""
Created on Mon Jan 22 18:01:01 2018

@author: wcc
"""
import math,copy
def distance_between_points(p1,p2):
    return math.sqrt((p1.x-p2.x)**2+(p1.y-p2.y)**2)



def move_rectangle(rect,dx,dy):
    rect1=copy.deepcopy(rect)
    rect1.corner.x+=dx
    rect1.corner.y+=dy
    return rect1


class Point():
    def __init__(self,x=0,y=0):
        self.x=x
        self.y=y
    def __str__(self):
        return 'x=%.2f,y=%.2f'%(self.x,self.y)
    def __add__(self,other):#定义+号
        if isinstance(other,Point):
            return self.add_point(other)
        else:
            return self.incre(other)
    def __radd__(self,other):
        return self.__add__(other)
    def add_point(self,other):
        p=Point()
        p.x=self.x+other.x
        p.y=self.y+other.y
        return p
    def incre(self,t):
        p=Point()
        p.x=self.x+t[0]
        p.y=self.y+t[1]
        return p
p=Point(1,2)
p1=Point(2,2)
p2=Point(3,3)
print(p+p1+(2,2)+p2)

class Rectangle():
    '''
    '''

class Circle():
    '''
    '''


def point_in_circle(point,circle):
    return distance_between_points(circle.center,point)<=circle.radius
#    if distance_between_points(circle.center,point)<=circle.radius:
#        return True
#    else:
#        return False
    
def move_point(p,dx,dy):
    p1=copy.deepcopy(p)
    p1.x+=dx
    p1.y+=dy
    return p1

def rect_in_circle(rectangle,circle):
    p_right_top=move_point(rectangle.corner,rectangle.width,rectangle.height)
    p_right_buttom=move_point(rectangle.corner,rectangle.width,0)
    p_left_top=move_point(rectangle.corner,0,rectangle.height)
    p_left_bottom=rectangle.corner
    t=[p_left_bottom,p_left_top,p_right_buttom,p_right_top]
    for i in t:
        if point_in_circle(i,circle)==False:
            return False
    return True

def point_in_rectangle(rectangle,point):
    sx=rectangle.corner.x
    sy=rectangle.corner.y
    if point.x>=sx and point.x<=sx+rectangle.width and point.y>=sy and point.y<=sy+rectangle.height:
        return True
    return False

def rect_circle_overlap(rectangle,circle):
    p_right_top=move_point(rectangle.corner,rectangle.width,rectangle.height)
    p_right_buttom=move_point(rectangle.corner,rectangle.width,0)
    p_left_top=move_point(rectangle.corner,0,rectangle.height)
    p_left_bottom=rectangle.corner
    if p_right_buttom.x<=circle.center.x and p_right_buttom.y>=circle.center.y and point_in_circle(circle,p_right_buttom)==False:
        return False
    elif p_right_top.x<=circle.center.x and p_right_top.y<circle.center.y and point_in_circle(circle,p_right_top)==False:
        return False
    elif p_left_bottom.x>circle.center.x and p_left_bottom.y>=circle.center.y and point_in_circle(circle,p_left_bottom)==False:
        return False
    elif p_left_top.x>circle.center.x and p_left_top.y<circle.center.y and point_in_circle(circle,p_left_top)==False:
        return False
    else:
        return True
    
import turtle
def draw_rect(t,rectangle):
    t.fd(rectangle.width)
    t.lt(90)
    t.fd(rectangle.height)
    t.lt(90)
    t.fd(rectangle.width)
    t.lt(90)
    t.fd(rectangle.height)
import draw
def draw_circle(t,circle):
    draw.circle(t,circle.radius)
    
    
#def main():
#    box = Rectangle()
#    box.width = 100.0
#    box.height = 200.0
#    box.corner = Point()
#    box.corner.x = 50.0
#    box.corner.y = 50.0
#
#    print(box.corner.x)
#    print(box.corner.y)
#
#    circle = Circle
#    circle.center = Point()
#    circle.center.x = 150.0
#    circle.center.y = 100.0
#    circle.radius = 75.0
#
#    print(circle.center.x)
#    print(circle.center.y)
#    print(circle.radius)
#
#    print(point_in_circle(box.corner, circle))
#    print(rect_in_circle(box, circle))
#    print(rect_circle_overlap(box, circle))
#
#    t=turtle.Turtle()
#    draw_rect(t,box)
#    draw_circle(t,circle)
#if __name__ == '__main__':
#    main()
#    
#
#    