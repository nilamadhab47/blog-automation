import scrapy
import json

class KeywordSpider(scrapy.Spider):
    name = "keywords"

    with open("competitors.json") as f:
        competitors = json.load(f)
    
    start_urls = [url for sites in competitors.values() for url in sites]

    def parse(self, response):
        keywords = response.xpath("//meta[@name='keywords']/@content").get()
        if keywords:
            yield {"keywords": keywords.split(", ")}

        with open("keywords.json", "a") as f:
            f.write(json.dumps({"url": response.url, "keywords": keywords}) + "\n")
