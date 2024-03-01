from playwright.sync_api import sync_playwright

with open('configemailfortracknubers.txt') as config_file:
    config = config_file.readlines()

email_web = config[0].strip().split('=')[1]
order_number_field = '#order_number'
acount_email_field = '#email2'
track_buton = '#the_track_button'


def go_check_status(order_number):
    tracking_status = 'processing'
    tracking_number = '0'
    url = 'https://www.webstaurantstore.com/trackorder.html'

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()

        # Navigate to the URL
        page.goto(url)

        # Enter order number
        page.type(order_number_field, order_number)
        print('Enterd order number')
        # Wait for 1.5 seconds
        page.wait_for_timeout(1500)

        # Enter email
        page.type(acount_email_field, email_web)  # Replace with the actual email
        print('Entered email')
        # Wait for 1.5 seconds
        page.wait_for_timeout(1500)

        # Click the track button
        page.click(track_buton)
        print('Clicked track button')

        # Wait for 3 seconds
        page.wait_for_timeout(3000)
        current_url = page.url

        print('Came to url', current_url )        

        # Extract tracking status and number (adjust the selectors accordingly)
        # tracking_status = page.inner_text('#tracking_status_selector')
        # tracking_number = page.inner_text('#tracking_number_selector')

        # Close the browser
        browser.close()

    return [tracking_status, tracking_number]

# test_procesing = ''
# test_nonexisting = '12525'
# test_shiped = ''
# test_delivererd = ''
# go_check_status(test_nonexisting)