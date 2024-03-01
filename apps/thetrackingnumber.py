import re
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup

with open('configemailfortracknubers.txt') as config_file:
    config = config_file.readlines()

email_web = config[1].strip().split('=')[1]

url_starter_for_delivery_check = 'https://www.therestaurantstore.com/login'
field_for_mail_selector = '#order-email'
field_for_order_selector = '#order-number'
track_button_selector = '#track-orders-form > div > div > div > button'

def delivery_thestore_automation(order_number):

        with sync_playwright() as p:
            tg_alert_bot = False
            status_match = 'Error'
            tracking_numbers = []
            tracking_number = ''
            multitrack_bool = False
            browser = p.chromium.launch()
                
            context = browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
            page = context.new_page()

            # Navigate to the specified URL
            page.goto(url_starter_for_delivery_check)
            current_page = page.url
            print('came to url: ', current_page)

            page.fill(field_for_mail_selector, email_web)
            page.fill(field_for_order_selector, order_number)

            page.click(track_button_selector)

            page.wait_for_timeout(10000)
            current_page = page.url

            if current_page != 'https://www.therestaurantstore.com/my-account/orders/track':
                tg_alert_bot = True
                status_match = 'Error, cant find order'
                
            
            print('came to url: ', current_page)

            status_element = page.query_selector('#main > div:nth-child(4) > div > div:nth-child(1) > div > div > div.w-full.xl\:w-72.lg\:mr-6.xl\:mr-12 > div > ul:nth-child(1)')
            if status_element:
                status_text = status_element.inner_text()
                # Extract status from the text
                status_match = re.search(r'Status\s+([\w\s]+)', status_text)
                if status_match:
                    status_match = status_match.group(1).strip()

            tracking_element = page.query_selector('#simple-tracking-details > div > div') 
            if tracking_element:
                tracking_entries = tracking_element.query_selector_all('td:nth-child(3)')  # Selecting third column containing tracking numbers
                for entry in tracking_entries:
                    tracking_numbers.append(entry.inner_text().strip())
                if len(tracking_numbers) > 2:
                     multitrack_bool = True
                     tg_alert_bot = True
                tracking_number = tracking_numbers[1]

            browser.close()
    
        return [tg_alert_bot, status_match, tracking_number, multitrack_bool]


# the_test_shipped = '1009488633'
# the_test_non_existing = '21215025'
# the_test_processing = '1009496435'
# the_test_multittrack = '1009496105'
# the_test_shipped_non_track = ''
# the_test_canceled = '1007861157'

# print(delivery_thestore_automation(the_test_non_existing))
# print(delivery_thestore_automation(the_test_processing))
# print(delivery_thestore_automation(the_test_shipped))
# print(delivery_thestore_automation(the_test_multittrack))