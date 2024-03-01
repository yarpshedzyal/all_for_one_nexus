# from app2 import send_telegram_message
from webtrackparse2 import go_check_status
from thetrackingnumber import delivery_thestore_automation
from pymongo import MongoClient
from bson import ObjectId, json_util
import telebot

with open('config.txt') as config_file:
    config = config_file.readlines()

mongo_uri = config[0].strip().split('=')[1]
database_name = config[1].strip().split('=')[1]
collection_name = config[2].strip().split('=')[1] 
parsingdate_name = config[3].strip().split('=')[1]
collection_sales = config[4].strip().split('=')[1]


# MongoDB Configuration
client = MongoClient(mongo_uri)  
db = client[database_name]
collection = db[collection_name]
parsingdate = db[parsingdate_name]
sales = db[collection_sales]

TELEGRAM_TOKEN = '6516311619:AAFBIJhirKEdhONp2Ypf9ckXwqlUwYXM6tg'
bot = telebot.TeleBot(TELEGRAM_TOKEN)

def send_telegram_message(message):
# Ваш chat_id в Telegram (можно получить, написав боту @userinfobot)  
    chat_id = '-1002093650751'
    bot.send_message(chat_id, message)

def automation_track_number():
    orders = sales.find()
    count_automate = 0
    checked_orders = 0 
    for order in orders:
        feedback = [False,'#Null','#Null',False]
        order_id = str(order['_id'])
        order_number = order['SUP_Id']
        suplier = order['SUP'] 
        tracking_number = order['Tracking_number']
        print(order_id, order_number, suplier, tracking_number)

        if len(tracking_number)<9 and tracking_number!='Canceled' and suplier == "Therestaurantstore.com":
            feedback = delivery_thestore_automation(order_number)

        elif len(tracking_number)<9 and tracking_number!='Canceled' and suplier == "Webstaurant":  
            feedback = go_check_status(order_number)

        if feedback[0] and feedback[3] :
            send_telegram_message(f'Sales: Order # {order_number} has multitrack')
            # 'send tg message multitraack'
        elif feedback[0]:
            send_telegram_message(f'Sales: sometging wrong with # {order_number}')
            # 'smthing wrong send notif with order number'
        elif not feedback[3] and feedback[1] == 'Shipped':
            sales.update_one(
                    {'_id': ObjectId(order_id)},
                    {'$set': {'Tracking_number': feedback[2]}}
                )  
            send_telegram_message(f'Order number #{order_number} got tracking #{feedback[2]}')
        elif feedback[1] != 'Shipped' and feedback[2]:
            send_telegram_message(f'Sales: something wrong with # {order_number}')

automation_track_number()