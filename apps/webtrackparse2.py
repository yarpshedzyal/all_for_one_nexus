import requests
from bs4 import BeautifulSoup
with open('configemailfortracknubers.txt') as config_file:
    config = config_file.readlines()

email_web = config[0].strip().split('=')[1]



def go_check_status(order_number):
    tracking_status = 'error on logic web'
    tracking_number = 'error on logic web'
    tracking_numbers = []
    str_order_number = str(order_number)
    varaible_for_tg_bot = False
    multitrack_bool = False

    url_order= f'https://www.webstaurantstore.com/myaccount:trackorder/ordertracking/order_number/{str_order_number}/email/{email_web}/'
    # url_order = url_string.replace("/93514293/", str_order_number)



    response = requests.get(url_order)
    soup = BeautifulSoup(response.text, 'html.parser')
    if response.status_code != 200 :
        tracking_status = 'error'

        varaible_for_tg_bot = True
    elif response.status_code == 200 and 'Order Status: Processing' in soup.text:
        tracking_status = 'Processing'
    elif response.status_code == 200  and 'Unable to find an order matching the details provided.' in soup.text:
        tracking_status = 'error: bad number'
        varaible_for_tg_bot = True
    elif response.status_code == 200 and ('Order Status: Shipped' in soup.text or 'Order Status: On The Way' in soup.text):
        first_tracking_number_element = soup.find_all('a', class_='order__packages-num')
        tracking_status = 'Shipped'
        # print(first_tracking_number_element)
        for element in first_tracking_number_element:
            tracking_numbers.append(element.get_text(strip=True))
        if first_tracking_number_element:
            if len(first_tracking_number_element) > 1:
                multitrack_bool = True
                varaible_for_tg_bot = True
            # tracking_number = first_tracking_number_element.get_text(strip=True)
            tracking_number = tracking_numbers[0]
        else:
            print("Tracking number not found.")
    elif response.status_code == 200 and 'Order Status: Delivered' in soup.text:
        tracking_status = 'Delivered'
        tracking_number = 'Delivered'

    return [varaible_for_tg_bot, tracking_status, tracking_number, multitrack_bool]

# test_procesing = '94139485'
# test_nonexisting = '12525'
# test_shiped = '93972172'
# test_delivererd = '93411973'
# test_multitrack = '94098513'
# print(go_check_status(test_shiped))
# print(go_check_status(test_procesing))
# print(go_check_status(test_nonexisting))
# print(go_check_status(test_delivererd))
# print(go_check_status(test_multitrack))
