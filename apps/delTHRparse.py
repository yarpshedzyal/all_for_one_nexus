import re
from playwright.sync_api import sync_playwright

def perform_add_to_cart_view_cart_calculate_and_retrieve_price(url):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the specified URL
        page.goto(url)

        # Click on the "Add to Cart" button
        add_to_cart_button_selector = '.flex-grow.v-btn.v-btn--is-elevated.v-btn--has-bg.v-btn--rounded.theme--light.v-size--large.cart.text-lg'
        add_to_cart_button = page.locator(add_to_cart_button_selector)
        add_to_cart_button.click()

        # Wait for some time to allow any JavaScript code triggered by the click to execute
        page.wait_for_timeout(2000)  # Adjust the timeout based on your specific case

        # Print a message after clicking the "Add to Cart" button
        print("Add to Cart button clicked!")

        # Click on the "Cart" link
        cart_link_selector = '.flex.items-center.justify-center.w-24.h-28.bg-gray-200'
        cart_link = page.locator(cart_link_selector)
        cart_link.click()

        # Wait for some time to allow any JavaScript code triggered by the click to execute
        page.wait_for_timeout(2000)  # Adjust the timeout based on your specific case

        # Get the current URL of the page
        current_url = page.url

        # Print the URL of the page after clicking the "Cart" link
        print("URL after Cart link click:", current_url)

        # Find and fill in the zip code field
        zip_code_field_selector = '#new-zipcode'
        zip_code_field = page.locator(zip_code_field_selector)

        # Replace '90001' with the zip code you want to input
        zip_code_to_input = '90001'
        zip_code_field.type(zip_code_to_input)

        # Wait for some time to allow any JavaScript code triggered by the input to execute
        page.wait_for_timeout(2000)  # Adjust the timeout based on your specific case

        # Print a message after typing into the zip code field
        print(f"Typed '{zip_code_to_input}' into the zip code field.")

        # Click on the "Calculate" button
        calculate_button_selector = '#zipcode-submit'
        calculate_button = page.locator(calculate_button_selector)
        calculate_button.click()

        # Wait for some time to allow any JavaScript code triggered by the click to execute
        page.wait_for_timeout(2000)  # Adjust the timeout based on your specific case

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

        # Close the browser
        browser.close()

if __name__ == "__main__":
    # Replace 'https://example.com' with the URL of the website you want to interact with
    website_url = 'https://www.therestaurantstore.com/items/36165'
    perform_add_to_cart_view_cart_calculate_and_retrieve_price(website_url)
