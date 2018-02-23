# -*- coding: utf-8 -*-
"""
Created on Fri Feb  2 12:20:42 2018

@author: wccgo
"""

import numpy as np
from mayavi import mlab

x, y = np.ogrid[-2:2:20j, -2:2:20j]
z = x * np.exp( - x**2 - y**2)

pl = mlab.surf(x, y, z, warp_scale="auto")
mlab.axes(xlabel='x', ylabel='y', zlabel='z')
mlab.outline(pl)