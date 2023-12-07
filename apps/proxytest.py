import requests
from playwright.sync_api import sync_playwright

# windows_vds_proxy = "http://yaroslav:q1w2e3r4_0@185.174.100.76:8080"
# proxies = {
#     "http": windows_vds_proxy,
#     "https": windows_vds_proxy,
# }

with sync_playwright() as p:
        browser = p.chromium.launch(
                proxy={'server':'185.174.100.76:8080',
                       'username':'yaroslav',
                        'password':'q1w2e3r4_0'}
		)
        context = browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
        page = context.new_page()
        url  = 'https://httpbin.org/ip'
        page.goto(url)
        print('came to' , url)
        html_content = page.content()
        print(html_content)
        


# url = "https://www.therestaurantstore.com/food-coloring-nov-23"  # Replace with your target URL

# response = requests.get(url, proxies=proxies)
# print(response.text)
