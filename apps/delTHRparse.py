import re
from playwright.sync_api import sync_playwright
import random

double_button_selector = '#vuetify > div.v-dialog__content.v-dialog__content--active > div > form > div > div > footer > div > button'
max_timeout = 3000
out_of_stock_selector = '#item-page > div > div:nth-child(2) > div > div.product-page > div > div:nth-child(3) > div:nth-child(1) > div > div > div.flex.flex-wrap.justify-center.space-x-2.float-left.mb-2 > span.bg-red-500.mb-2.rounded.text-light.px-4.py-1.inline-block.text-sm'
add_to_cart_button_selector = '#item-page > div > div:nth-child(2) > div > div.product-page > div > div:nth-child(3) > div:nth-child(2) > div.add-to-cart-button > div > div.my-6 > div > button'
lift_gate_selector = '#cart > div > div:nth-child(2) > div.cart-footer > div > div.box > div.block.deliveryopts > div > div.left > label > input'

def perform_add_to_cart_view_cart_calculate_and_retrieve_price(url, zipindex):
    cleaned_price = None  # Initialize with a default value
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
        page = context.new_page()

        # Navigate to the specified URL
        page.goto(url)
        print('came to url: ', url)

        page.wait_for_timeout(random.uniform(2000, 3000))
        out_of_stock_element = page.locator(out_of_stock_selector)
        if out_of_stock_element.is_visible():
            print("Product is out of stock. Skipping...")
            browser.close()
            return ['Out', zipindex]
        else:

            # # Click on the "Add to Cart" button

            add_to_cart_button = page.locator(add_to_cart_button_selector)

            
            add_to_cart_button.click()

            # Wait for some time to allow any JavaScript code triggered by the click to execute
            page.wait_for_timeout(random.uniform(2000, 3000))  # Adjust the timeout based on your specific case

            double_button = page.locator(double_button_selector)

            # Try to click the double button (modal), handle exception if not clickable
            try:
                double_button.click(timeout=max_timeout)
                page.wait_for_timeout(random.uniform(2000, 3000))
            except Exception as e:
                print(f"Failed to click the double button: {e}")



            # Print a message after clicking the "Add to Cart" button
            print("Add to Cart button clicked!")

            # Click on the "Cart" link
            cart_link_selector = '.flex.items-center.justify-center.w-24.h-28.bg-gray-200'
            cart_link = page.locator(cart_link_selector)
            cart_link.click()

            # Wait for some time to allow any JavaScript code triggered by the click to execute
            page.wait_for_timeout(random.uniform(2000, 3000))  # Adjust the timeout based on your specific case

            # Get the current URL of the page
            current_url = page.url

            # Print the URL of the page after clicking the "Cart" link
            print("URL after Cart link click:", current_url)

            # Find and fill in the zip code field
            zip_code_field_selector = '#new-zipcode'
            page.wait_for_selector(zip_code_field_selector)
            zip_code_field = page.locator(zip_code_field_selector)

            # Replace '90001' with the zip code you want to input
            zip_code_to_input = str(zipindex)
            zip_code_field.type(zip_code_to_input)

            # Wait for some time to allow any JavaScript code triggered by the input to execute
            page.wait_for_timeout(random.uniform(2000, 3000))  # Adjust the timeout based on your specific case

            # Print a message after typing into the zip code field
            print(f"Typed '{zip_code_to_input}' into the zip code field.")

            # Click on the "Calculate" button
            calculate_button_selector = '#zipcode-submit'
            calculate_button = page.locator(calculate_button_selector)
            calculate_button.click()

            # Wait for some time to allow any JavaScript code triggered by the click to execute
            page.wait_for_timeout(random.uniform(2000, 3000))  # Adjust the timeout based on your specific case

            # Print a message after clicking the "Calculate" button
            print("Calculate button clicked!")

            # Retrieve text from all elements with class 'shipping-method-price'
            shipping_price_selector = '.shipping-method-price'
            shipping_price_elements = page.locator(shipping_price_selector).element_handles()

            # Iterate over the elements and print their text content
            for index, element in enumerate(shipping_price_elements):
                shipping_price_text = element.text_content()

                # Use regular expression to keep only numbers and "."
                cleaned_price = re.sub(r'[^0-9.]', '', shipping_price_text)

                print(f"Shipping Method Price {index + 1}:", cleaned_price)
                break
            
            lift_gate_element = page.locator(lift_gate_selector).element_handles()
            if len(lift_gate_element) == 1:
                cleaned_price = float(cleaned_price) - 55

            # Close the browser
            browser.close()
            
        return [cleaned_price, zipindex]


print(perform_add_to_cart_view_cart_calculate_and_retrieve_price('https://www.therestaurantstore.com/items/452809','90001'))