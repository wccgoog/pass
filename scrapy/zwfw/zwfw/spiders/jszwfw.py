# -*- coding: utf-8 -*-
import scrapy
from zwfw.items import ZwfwItem
import logging


class JszwfwSpider(scrapy.Spider):
    name = 'jszwfw'
    allowed_domains = ['njjbxq.jszwfw.gov.cn']
    start_urls = [
        'http://njjbxq.jszwfw.gov.cn/jszwfw/qlqd/showdeptright.do?webId=137&type=&word=&deptid=320195HB&pageno=1&handlearea=']

    def parse(self, response):
        # last = response.xpath('//a[@class="laypage_last"]')
        items = response.xpath(
            '//div[@class="right_list_sub"]')
        logging.warning(items)
        for item in items:
            logging.warning(item.xpath(
                './div[@class="sub_r1_main"]/div[@class="r_tit"]/a[@class="r_tit_a"]/text()').extract()[0])
