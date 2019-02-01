from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains


action=ActionChains(driver)
action.click_and_hold(start)    调试距离用
action.move_by_offset(250,0)