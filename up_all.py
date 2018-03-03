# -*- coding: utf-8 -*-
"""
Created on Fri Feb  2 13:21:13 2018

@author: wccgo
"""

import pip
from subprocess import call
for package in pip.get_installed_distributions():
    call('pip install --upgrade ' + package.project_name)

