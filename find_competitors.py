import requests
from bs4 import BeautifulSoup
import json

def find_competitors(query):
    headers = {"User-Agent": "Mozilla/5.0"}
    search_url = f"https://www.google.com/search?q={query.replace(' ', '+')}&num=10"
    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    
    competitors = []
    for link in soup.find_all("a"):
        href = link.get("href")
        if "url?q=" in href and "webcache" not in href:
            url = href.split("url?q=")[1].split("&")[0]
            if "google.com" not in url:
                competitors.append(url)
    
    return competitors

keywords = ["best AI tools", "backend development trends", "AI hardware reviews"]
competitor_sites = {}
for keyword in keywords:
    competitor_sites[keyword] = find_competitors(keyword)

# Save competitors to file
with open("competitors.json", "w") as f:
    json.dump(competitor_sites, f)

print("✅ Competitors saved to competitors.json")
