# -*- coding: utf-8 -*-
import scrapy
import os
from pic.items import PicItem
import logging
import re


class XhSpider(scrapy.Spider):
    name = 'xh'
    allowed_domains = ['xiaohuar.com']
    start_urls = ['http://www.xiaohuar.com/meinv/']

    def parse(self, response):
        # 获取所有图片的a标签
        allPics = response.xpath('//div[@id="images"]/div')
        logging.warning(allPics)
        for pic in allPics:
            # 分别处理每个图片，取出名称及地址
            item = PicItem()
            name = pic.xpath('./p/a/text()').extract()[0]
            addr = pic.xpath('./a/img/@src').extract()[0]
            logging.warning(addr)
            logging.warning(name)
            if 'http' in addr:
                pass
            else:
                addr = 'http://www.xiaohuar.com'+addr
            item['name'] = re.sub(r'[<>/\\|:"*?]', '', name)
            item['addr'] = addr
            # 返回爬取到的数据
            yield item
