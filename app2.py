from flask import Flask, render_template, request, jsonify,  redirect, session, url_for,send_file, make_response
from flask_socketio import SocketIO, emit
from pymongo import MongoClient
from bson import ObjectId, json_util
from bcrypt import checkpw
import json
from werkzeug.utils import secure_filename
import csv
import os
import pandas as pd
from apps.delWEBSparser import parser_solo,count,multiparse
from apps.delTHRparse import perform_add_to_cart_view_cart_calculate_and_retrieve_price
from apps.deliverymultiparse import perform_add_to_cart_view_cart_calculate_and_retrieve_price_multi
import traceback
from datetime import datetime
import subprocess
import time
import telebot
import threading
from flask_cors import CORS
from bson.json_util import dumps 
import secrets #new
from apps.thetrackingnumber import delivery_thestore_automation
from apps.webtrackparse2 import go_check_status


app = Flask(__name__, static_folder='build/static', template_folder='build')

CORS(app)  # Enable CORS for all routes

socketio = SocketIO(app, cors_allowed_origins="*")
app.secret_key = 'supadupasecretkey10101010'

class User:
    def __init__(self, id, user_name, password):
        self.id = id
        self.user_name = user_name
        self.password = password
    
    def __repr__(self):
        return f'<User: {self.user_name}>'
        
users = []
users.append(User(id=1,user_name="test1",password="pass101010"))     
users.append(User(id=2, user_name="test2", password="pass1660"))
users.append(User(id=3, user_name="q", password="q"))
print(users)
 

# TELEGRAM
# 6516311619:AAFBIJhirKEdhONp2Ypf9ckXwqlUwYXM6tg 
TELEGRAM_TOKEN = '6516311619:AAFBIJhirKEdhONp2Ypf9ckXwqlUwYXM6tg'
bot = telebot.TeleBot(TELEGRAM_TOKEN)

@bot.message_handler(func=lambda message: True)
def echo_all(message):
    bot.reply_to(message, message.text)

def send_telegram_message(message):
# Ваш chat_id в Telegram (можно получить, написав боту @userinfobot)  
    chat_id = '-1002093650751'
    bot.send_message(chat_id, message)
 
 
# Также это переключатель состояние кнопок парсеров disable.
#  Если будет новый параметр где нужно заблокировать кнопку, то нужно добавить в объект disable_object <- поиск
is_parsing = False
is_parsing_delivery = False
is_parsing_delivery_selected = False
is_parsing_selected = False

@app.route('/')
def index():
    return render_template('index.html') 
@app.route('/Products')
def route_products():
    return render_template('index.html') 
@app.route('/Sales')
def route_sales():
    return render_template('index.html') 

@app.route('/<path:filename>')
def serve_static(filename):
    root_dir = os.path.dirname(os.getcwd())
    return send_file(os.path.join(root_dir, 'build', filename))


# Read configuration from config.txt
with open('config.txt') as config_file:
    config = config_file.readlines()

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Parse configuration values
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

# @app.route('/login', methods=['GET', 'POST'])
user_tokens = {}  # Хранение токенов 
@socketio.on('login')
def handle_login(data):
    print(data)
    username = data['username']
    password = data['password']

    user = next((x for x in users if x.user_name == username), None)
    if user and user.password == password:
        # Генерация уникального токена
        user_token = secrets.token_urlsafe(16)
        user_tokens[user.id] = user_token  # Сохранение токена для пользователя
        session['user_id'] = user.id 
        socketio.emit('login_response', {'success': True, 'token': user_token , "user":session['user_id']})
    else:
        socketio.emit('login_response', {'success': False}) 
@socketio.on('check_token')
def check_token(data):
    print("_____________",data)
    user_id = data.get('user_id')
    token = data.get('token')

    if user_id in user_tokens and user_tokens[user_id] == token:
        socketio.emit('token_checked', {'valid': True})
    else:
        socketio.emit('token_checked', {'valid': False})


@socketio.on('get_data')  # Socket.IO event to request data
def get_data(clientdata):  # Accept data passed from the client
    print(clientdata) 
    data = db[clientdata].find()  # Fetch data from MongoDB collection
    data_json = dumps(data)  # Convert MongoDB cursor to JSON
    emit('data', data_json)  # Send the data to the client

  
    socketio.emit("disable_object", {
        "is_parsing":{"disable":is_parsing}, 
        "is_parsing_delivery":{"disable":is_parsing_delivery},
        "is_parsing_delivery_selected":{"disable":is_parsing_delivery_selected},
        "is_parsing_selected":{"disable":is_parsing_selected},
    })  

 
@socketio.on('add_product')
def add_product(client_data):
    data = client_data.get("data_item") 
    collection_name = db[client_data.get("collection_name")] 
    print(data)
    new_product = data
    collection_name.insert_one(new_product) 
    data_json = dumps(data) 
    socketio.emit("new_item", data_json)
    socketio.emit("message","Product added successfully")  
 

# Add a new route to handle the update process
@socketio.on('update_product') 
def update_product(client_data): 
    data = client_data.get("data_item") 
    collection_name = db[client_data.get("collection_name")]   
    # Извлекаем значение '_id' из объекта, если оно присутствует
    oid = data.get('_id', {}).get('$oid')  
    print("_+_+_+_+_+_+_+_+_+____", oid)
    if oid:
        # Удаляем '_id' из объекта, чтобы избежать ошибки обновления неизменного поля
        print("_+_+_+_+_+_+_+_+_+____", {'_id': ObjectId(oid)}, {'$set': data})
        del data['_id'] 
        # Обновляем запись в коллекции по значению '_id'
        collection_name.update_one({'_id': ObjectId(oid)}, {'$set': data})
        print("_+_+_+_+_+_+_+_+_+____", {'_id': ObjectId(oid)}, {'$set': data})
        socketio.emit("message", 'Product updated successfully') 
    else:
        socketio.emit("message", 'Invalid or missing _id field')  



@socketio.on('delete_element')  
def delete_selected_items(client_data):  
    data = client_data.get("data_item") 
    collection_name = db[client_data.get("collection_name")] 
    oid = data.get('_id', {}).get('$oid')  
    print(data)  
    collection_name.delete_one({'_id': ObjectId(oid)}) 
    socketio.emit("message", 'Item deleted.')  

@socketio.on('delete_selected')  
def delete_selected_items(client_data):
    try:
        counter = 0  # Инициализация счетчика
        data = client_data.get("data_item") 
        collection_name = db[client_data.get("collection_name")]  
        print(collection_name)
        # Extract the list of selected item IDs from the request data
        selected_ids = data 
        # Check if there are selected IDs
        if not selected_ids:
            socketio.emit("message", 'No items selected for deletion')
            return jsonify({'success': False, 'message': 'No items selected for deletion'})  
        # Delete the selected items from the MongoDB collection 

        for item_id in selected_ids:
            # Перед началом цикла учитываем общее количество выбранных элементов
            total_urls_selected = len(selected_ids) 
            collection_name.delete_one({'_id': ObjectId(item_id)}) 

            counter += 1
            progress = int((counter / total_urls_selected) * 100)
            socketio.emit('progress_update', {'progress': progress, 'category': "delete_selected"})
        socketio.emit("message", 'Items deleted.')
        return jsonify({'success': True, 'message': f'Deleted {len(selected_ids)} items'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@socketio.on('delete_column')
def delete_column(client_data):
    column_name = client_data.get("thisColumn")
    collection_name = db[client_data.get("collection_name")]

    # Проверяем, что column_name - строка
    if isinstance(column_name, str):
        counter = 0  # Инициализируем счетчик перед циклом
        total_docs = collection_name.count_documents({})  # Получаем общее количество документов

        # Проходимся по всем документам в коллекции
        for doc in collection_name.find():
            print(doc)
            # Удаляем указанный столбец из документа, если он присутствует
            if column_name in doc:
                print(column_name)
                print("_+_+_+_+_+_+_+", doc[column_name])
                del doc[column_name]
                counter += 1  # Увеличиваем счетчик только при удалении поля

                # Сохраняем измененный документ обратно в коллекцию, удаляя поле (колонку)
                collection_name.update_one({'_id': doc['_id']}, {'$unset': {column_name: ""}}) 
                progress = int((counter / total_docs) * 100)
                socketio.emit('progress_update', {'progress': progress, 'category': "delete_column"})
        socketio.emit("message", 'Column deleted.')
    else:
        socketio.emit("message", 'Invalid data format for column deletion.')



def allowed_file(filename): # ваша логика проверки разрешенных расширений
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'csv', 'tsv'} 
@app.route('/Upload_file', methods=['POST'])
def upload_file():
    request_collection_name = request.form.get('collection_name')
    collection_name = db[request_collection_name] 
    socketio.emit("message", "Wait, the file will be added now.")
    
    if 'csv_file' not in request.files:
        socketio.emit("message", "No file part")
        return jsonify({'success': False, 'message': 'No file part'})

    file = request.files['csv_file']

    if file.filename == '':
        socketio.emit("message", "No selected file")
        return jsonify({'success': False, 'message': 'No selected file'})

    if file and allowed_file(file.filename):
        try:
            # Save the uploaded file to the uploads directory
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            # Process the CSV/TSV file and add elements to the MongoDB collection
            new_items = []
            delimiter = ',' if file.filename.endswith('.csv') else '\t'
            with open(os.path.join(app.config['UPLOAD_FOLDER'], filename), 'r') as data_file:
                csv_reader = csv.DictReader(data_file, delimiter=delimiter)
                total_rows = sum(1 for _ in csv_reader)  # Count total rows
                data_file.seek(0)  # Reset file pointer

                current_row = 0
                for row in csv_reader:
                    current_row += 1
                    progress = min((current_row / total_rows) * 100, 100)
                    progress = round(progress, 2)

                    new_product = {header: row.get(header) for header in csv_reader.fieldnames}
                    collection_name.insert_one(new_product)
                    new_items.append(new_product)
                    socketio.emit("progress_update", {'progress': progress, 'category': filename})
                    socketio.emit("new_item", dumps(new_product))

            data_json = dumps(new_items)
            socketio.emit("message", "File uploaded and processed successfully")

            return jsonify({'success': True, 'message': 'File uploaded and processed successfully'})
        except Exception as e:
            socketio.emit("message", str(e))
            return jsonify({'success': False, 'message': str(e)})
    else:
        socketio.emit("message", 'Invalid file format')
        return jsonify({'success': False, 'message': 'Invalid file format'})

@socketio.on('track_automate')
def automation_track_number():
    orders = sales.find()
    count_automate = 0
    checked_orders = 0 
    for order in orders:
        order_id = str(order['_id'])
        order_number = order['SUP_id']
        suplier = order['SUP'] 
        tracking_number = order['Tracking_number']

        if (not tracking_number) and suplier == "Therestaurantstore.com":
            feedback = delivery_thestore_automation(order_number)

        elif order_number and suplier == "Webstaurant":  
            feedback = go_check_status(order_number)

        if feedback[0] and feedback[3]:
            send_telegram_message(f'Sales: Order # {order_number}')
            # 'send tg message multitraack'
        elif feedback[0]:
            send_telegram_message(f'Sales: sometging wrong with # {order_number}')
            # 'smthing wrong send notif with order number'
        elif not feedback[0] and not feedback[3] and feedback[2] != 'Delivered, use old tracker' and feedback[2] != '0' and feedback[1] == 'Shipped':
            sales.update_one(
                    {'_id': ObjectId(order_id)},
                    {'$set': {'Tracking_number': feedback[2]}}
                )  
            send_telegram_message(f'Order number #{order_number} got tracking #{tracking_number}')
        elif feedback[1] != 'Shipped' and feedback[2]:
            send_telegram_message(f'Sales: something wrong with # {order_number}')

@socketio.on('parse_all')
def parse_urls(message):
    global is_parsing
    socketio.emit('message', 'Wait, the parser will start now..') 
    if is_parsing:
        # Redirect to the main page with a message that parsing is ongoing
        socketio.emit('message', 'Parsing in progress. Please w8')
        return jsonify({'message': 'Parsing in progress. Please w8'})

    is_parsing = True
    socketio.emit('disabled', {'disabled': is_parsing, "category":"is_parsing"}) 
    # Get all the URLs from MongoDB
    urls = collection.find()

    # Calculate the total number of URLs to parse
    total_urls = count()

    # Start parsing and emit progress updates
    parsed_urls = 0 
    for index, url in enumerate(urls): 
        url_id = str(url['_id'])
        link = url['WSlink']
        multi = url['multiurl'] 
        multipack_quantity = url['multipack_quantity']
        try:
            if multi == 'No':
            # Perform parsing using the parser_solo function
                parsed_data = parser_solo(link) 
                # Update the document in MongoDB with the parsed data  
                collection.update_one(
                    {'_id': ObjectId(url_id)},
                    {'$set': {'supplier_price': round(float(parsed_data[0]),2), 'StockAviability': parsed_data[1], 'FreeShippingWithPlus' : parsed_data[2]}}
                )  
                # Increment the parsed_urls counter
                
                # Emit new_item only if parsing and updating were successful
                this_item = collection.find_one({'_id': ObjectId(url_id)})
                socketio.emit("new_item", dumps(this_item))
            elif multi == 'Yes' and multipack_quantity == 1:
                parsed_data = multiparse(link) 
                # Update the document in MongoDB with the parsed data  
                collection.update_one(
                    {'_id': ObjectId(url_id)},
                    {'$set': {'supplier_price': round(float(parsed_data[0]),2), 'StockAviability': parsed_data[1], 'FreeShippingWithPlus' : parsed_data[2]}}
                )  
                # Increment the parsed_urls counter
                
                # Emit new_item only if parsing and updating were successful
                this_item = collection.find_one({'_id': ObjectId(url_id)})
                socketio.emit("new_item", dumps(this_item))
            elif multi == 'Yes' and multipack_quantity != 1:
                parsed_data = multiparse(link) 
            # Update the document in MongoDB with the parsed data  
                collection.update_one(
                    {'_id': ObjectId(url_id)},
                    {'$set': {'supplier_price': round(parsed_data[0]*multipack_quantity, 2), 'StockAviability': parsed_data[1], 'FreeShippingWithPlus' : parsed_data[2]}}
                )  
                # Increment the parsed_urls counter
                
                # Emit new_item only if parsing and updating were successful
                this_item = collection.find_one({'_id': ObjectId(url_id)})
                socketio.emit("new_item", dumps(this_item))


        except Exception as e:
            traceback.print_exc()  # Add this line to print the exception traceback

            # Handle the exception here, for example, set the "Stock" field to "Out"
            collection.update_one(
                {'_id': ObjectId(url_id)},
                {'$set': {'StockAviability': 'Out'}}
            )
            full_price = (url['DeliveryPriceTHR90001'] + url['DeliveryPriceTHR90001'])/2 + url['supplier_price']
            collection.update_one(
                        {'_id': ObjectId(url)},
                        {"$set": {"full_price": full_price}}
                    )  
        parsed_urls += 1
        # Calculate progress and emit progress update
        progress = int((parsed_urls / total_urls) * 100) 
        socketio.emit('progress_update', {'progress': progress, 'category': "progress_update"})
        socketio.emit('disabled', {'disabled': is_parsing, "category":"is_parsing"})  
        # socketio.sleep(0.5) 

    is_parsing = False 

    last_parsed_timestamp = datetime.now()
    parsingdate.update_one(
        {'name': 'parsing_status'},
        {'$set': {'last_parsed_timestamp': last_parsed_timestamp}},
        upsert=True
    )

    # Emit a message to indicate that all URLs are parsed successfully
    socketio.emit('disabled',  {'disabled': is_parsing, "category":"is_parsing"})  
    send_telegram_message("All URLs parsed successfully.")
    socketio.emit('message', 'All URLs parsed successfully.')

    # Return a JSON response with a success message
    return jsonify({'message': 'All URLs parsed successfully.'})

@socketio.on('selected_parse')
def handle_selected_parse(data):
    global is_parsing_selected
    is_parsing_selected = True
    socketio.emit('disabled',  {'disabled': is_parsing_selected, "category":"is_parsing_selected"}) 
    socketio.emit('message', 'Wait, the parser will start now..')  
    try:
    # Check if the emitted data contains the 'arrData' field 
        arr_data = data
        parsed_urls = 0
        # Process the received data as needed
        print("Selected items:", arr_data)
        total_urls_selected = len(arr_data)
        # Perform the parsing with the received data
        # Call your parsing function here and pass arr_data as needed

        for index, item_data in enumerate(arr_data):
            item_id = str(item_data['_id']['$oid'])
            link = item_data['WSlink']  
            multi = item_data['multiurl']
            multipack_quantity = item_data['multipack_quantity']

            try:
                if multi == 'No':
                # Perform parsing using the parser_solo function
                    parsed_data = parser_solo(link)

                    # Update the document in MongoDB with the parsed data
                    collection.update_one(
                        {'_id': ObjectId(item_id)},
                        {'$set': {'supplier_price': round(float(parsed_data[0]),2), 'StockAviability': parsed_data[1], 'FreeShippingWithPlus' : parsed_data[2]}}
                    )

                    # Increment the parsed_urls counter
                    # parsed_urls += 1
                    # Emit new_item only if parsing and updating were successful
                    this_item = collection.find_one({'_id': ObjectId(item_id)})
                    socketio.emit("new_item", dumps(this_item))
                elif multi == 'Yes' and multipack_quantity == 1:
                    parsed_data = multiparse(link) 
                # Update the document in MongoDB with the parsed data  
                    collection.update_one(
                        {'_id': ObjectId(item_id)},
                        {'$set': {'Price': round(float(parsed_data[0]),2), 'supplier_price': parsed_data[1], 'FreeShippingWithPlus' : parsed_data[2]}}
                    )  
                    # Increment the parsed_urls counter
                    
                    # Emit new_item only if parsing and updating were successful
                    this_item = collection.find_one({'_id': ObjectId(item_id)})
                    socketio.emit("new_item", dumps(this_item))
                elif multi == 'Yes' and multipack_quantity != 1:
                    parsed_data = multiparse(link) 
                # Update the document in MongoDB with the parsed data  
                    collection.update_one(
                        {'_id': ObjectId(item_id)},
                        {'$set': {'supplier_price': round(parsed_data[0]*multipack_quantity, 2), 'StockAviability': parsed_data[1], 'FreeShippingWithPlus' : parsed_data[2]}}
                    )  
                    # Increment the parsed_urls counter
                    
                    # Emit new_item only if parsing and updating were successful
                    this_item = collection.find_one({'_id': ObjectId(item_id)})
                    socketio.emit("new_item", dumps(this_item))

            except Exception as e: 
                traceback.print_exc()  # Add this line to print the exception traceback

                # Handle the exception here, for example, set the "DeliveryPrice" field to an error value
                print(f"Error parsing item {item_id}: {e}")
            # update full_price
            full_price = (item_data['DeliveryPriceTHR90001'] + item_data['DeliveryPriceTHR90001'])/2 + item_data['supplier_price']
            collection.update_one(
                        {'_id': ObjectId(item_id)},
                        {"$set": {"full_price": full_price}}
                    )  
            parsed_urls += 1
            progress = int((parsed_urls / total_urls_selected) * 100)
            socketio.emit('progress_update', {'progress': progress, 'category': "progress_update_selected"})  
            socketio.emit('disabled',  {'disabled': is_parsing_selected, "category":"is_parsing_selected"}) 

        # Emit a message or result back to the frontend if needed 
        socketio.emit('disabled',  {'disabled': is_parsing_selected, "category":"is_parsing_selected"}) 
        send_telegram_message("Parse Selected Prices: Parsing completed successfully.")
        socketio.emit('message',  'Parsing completed successfully')
 
    except Exception as e:
        print(f"Error processing 'selected_parse' event: {e}")
        socketio.emit('message', {'error': str(e)})
    is_parsing_selected = False
    socketio.emit('disabled',  {'disabled': is_parsing_selected, "category":"is_parsing_selected"})  
 
    
@socketio.on('delivery_all_parse') 
def start_parsing(message):
    global is_parsing_delivery
    # is_parsing_delivery = True 
    # socketio.emit('disabled', {'disabled': is_parsing_delivery, "category":"is_parsing_delivery"})  
    socketio.emit('message',  'Wait, the parser will start now..') 

    if is_parsing_delivery:
        # Redirect to the main page with a message that parsing is ongoing
        socketio.emit('message', 'Parsing delivery in progress. Please wait.')
        return jsonify({'message': 'Parsing delivery in progress. Please wait.'})

    # Get all the URLs from MongoDB
    urls = collection.find()

    # Calculate the total number of URLs to parse
    total_urls = count()

    # Start parsing in a separate thread 
    socketio.start_background_task(target=perform_parsing_async, urls=urls, total_urls=total_urls) 
    # Return a JSON response with a success message 
    return jsonify({'message': 'Parsing delivery started successfully.'})



def perform_parsing_async(urls, total_urls):
    global is_parsing_delivery 

    parsed_urls = 0
    is_parsing_delivery = True   
    for index, url in enumerate(urls):
        socketio.emit('disabled', {'disabled': is_parsing_delivery, "category":"is_parsing_delivery"})  
        url_id = str(url['_id'])
        link = url['ThrLink'] 
        try:
            # Perform parsing using the parsing function
            time.sleep(6)
            old_delivery_90001 = url['DeliveryPriceTHR90001']
            old_delivery_10001 = url['DeliveryPriceTHR10001']
            parsed_data = perform_add_to_cart_view_cart_calculate_and_retrieve_price_multi(link)
            # Increment the parsed_urls counter
            # parsed_urls += 1
            # if int(parsed_urls%2) == 0:
            #     proxy_p = True
            # else:
            #     proxy_p =False
            if parsed_data[0] != 'Out':

                # Update the document in MongoDB with the parsed data
                collection.update_one(
                    {'_id': ObjectId(url_id)},
                    {'$set': {'DeliveryPriceTHR90001': round(float(parsed_data[0]), 2)}}
                )
                
                collection.update_one(
                    {'_id': ObjectId(url_id)},
                    {'$set': {'DeliveryPriceTHR10001': round(float(parsed_data[1]), 2)}}
                )
                # Perform parsing for the other zip code (10001)
                # time.sleep(5)

        except Exception as e:
            traceback.print_exc()  # Add this line to print the exception traceback

            # Handle the exception here, for example, set the "Stock" field to "Out"
            collection.update_one(
                {'_id': ObjectId(url_id)},
                {'$set': {'DeliveryPriceTHR90001': old_delivery_90001}}
            )

            collection.update_one(
                {'_id': ObjectId(url_id)},
                {'$set': {'DeliveryPriceTHR10001': old_delivery_10001}}
            )
        # Calculate progress and emit progress update 
        # parsed_urls += 1 
        parsed_urls += 1
        progress_delivery = int((parsed_urls / total_urls) * 100)  
        socketio.emit('progress_update', {'progress': progress_delivery, 'category': "progress_delivery_update"})  
        this_item = collection.find_one({'_id': ObjectId(url_id)})
        socketio.emit("new_item", dumps(this_item))  

    is_parsing_delivery = False 

    last_parsed_timestamp = datetime.now()
    parsingdate.update_one(
        {'name': 'parsing_status_delivery'},
        {'$set': {'last_parsed_timestamp': last_parsed_timestamp}},
        upsert=True
    ) 
    # Emit a message to indicate that all URLs are parsed successfully
    send_telegram_message("All URLs delivery price parsed successfully.")
    socketio.emit('disabled', {'disabled': is_parsing_delivery, "category":"is_parsing_delivery"})  
    socketio.emit('message',  'All URLs delivery price parsed successfully.' )
 
@socketio.on('delivery_selected_parse')
def collect_and_start_delivery(data): 
    is_parsing_delivery_selected = True
    socketio.emit('disabled', {'disabled': is_parsing_delivery_selected, "category":"is_parsing_delivery_selected"}) 
    socketio.emit('message', 'Wait, the parser will start now..')  
    try: 
        arr_data = data  
        # Process the received data as needed
        print("Selected items:", arr_data)
        total_urls_selected = len(arr_data)
        print(total_urls_selected)
        # Perform the delivery selected parsing with the received data 
        # Call your parsing function here and pass arr_data as needed
        parsed_urls = 0
        for index, data_item in enumerate(arr_data):
            url_id = str(data_item['_id']['$oid'])
            link = data_item['ThrLink']
            old_delivery_90001 = data_item['DeliveryPriceTHR90001']
            old_delivery_10001 = data_item['DeliveryPriceTHR10001']

            try:
                # Perform parsing using the parsing function
                time.sleep(6)
                parsed_data = perform_add_to_cart_view_cart_calculate_and_retrieve_price_multi(link)
                # Increment the parsed_urls counter
                # parsed_urls += 1
                if parsed_data[0] != 'Out':

                    # Update the document in MongoDB with the parsed data
                    collection.update_one(
                        {'_id': ObjectId(url_id)},
                        {'$set': {'DeliveryPriceTHR90001': round(float(parsed_data[0]), 2)}}
                    )

                    
                    # Update the document in MongoDB with the parsed data for 10001
                    collection.update_one(
                        {'_id': ObjectId(url_id)},
                        {'$set': {'DeliveryPriceTHR10001': round(float(parsed_data[1]), 2)}}
                    )
            
            except Exception as e:
                traceback.print_exc()  # Add this line to print the exception traceback

                # Handle the exception here, for example, set the "Stock" field to "Out"
                collection.update_one(
                    {'_id': ObjectId(url_id)},
                    {'$set': {'DeliveryPriceTHR90001': old_delivery_90001}}
                )

                collection.update_one(
                    {'_id': ObjectId(url_id)},
                    {'$set': {'DeliveryPriceTHR10001': old_delivery_10001}}
                )
        # Increment the parsed_urls counter
            parsed_urls += 1
            progress_delivery = int((parsed_urls / total_urls_selected) * 100) 
            socketio.emit('progress_update', {'progress': progress_delivery, 'category': "progress_delivery_update_selected"})    
            socketio.emit('disabled', {'disabled': is_parsing_delivery_selected, "category":"is_parsing_delivery_selected"}) 
            print(progress_delivery)
            this_item = collection.find_one({'_id': ObjectId(url_id)})
            socketio.emit("new_item", dumps(this_item))  
            # Emit a message or result back to the frontend if needed 

        is_parsing_delivery_selected = False
        socketio.emit('disabled', {'disabled': is_parsing_delivery_selected, "category":"is_parsing_delivery_selected"}) 
        send_telegram_message("Parse Selected Prices: Parsing completed successfully.") 
        socketio.emit('message', 'Parsing completed successfully')  
    except Exception as e:
        print(f"Error processing 'delivery_selected_parse' event: {e}")
        socketio.emit('message', {'error': str(e)})
        is_parsing_delivery_selected = False
        socketio.emit('disabled', {'disabled': is_parsing_delivery_selected, "category":"is_parsing_delivery_selected"})


# @socketio.on('test')
# def handle_message(data):
#     for i in range(11):  # Пример: 10 итераций
#         progress = i * 10
#         print(progress) 
#         # Отправка данных на клиент
#         socketio.emit("progress_update", {'progress': progress, 'category': "test"})   
#         socketio.sleep(0.5)
# @socketio.on('test2')
# def handle_message(data): 
#     for i in range(11):  # Пример: 10 итераций
#         progress = i * 10
#         print(progress) 
#         # Отправка данных на клиент
#         socketio.emit("progress_update", {'progress': progress, 'category': "test2"})  
#         socketio.sleep(0.3)



 

if __name__ == '__main__':
    '''[<User: test1>, <User: test2>, <User: q>]
Traceback (most recent call last):
  File "/app/app2.py", line 677, in <module>
    socketio.run(app, debug=True, host="0.0.0.0", port=8080)
  File "/usr/local/lib/python3.9/site-packages/flask_socketio/__init__.py", line 640, in run
    raise RuntimeError('The Werkzeug web server is not '
RuntimeError: The Werkzeug web server is not designed to run in production. Pass allow_unsafe_werkzeug=True to the run() method to disable this error.'''
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True, host="0.0.0.0", port=8080)
