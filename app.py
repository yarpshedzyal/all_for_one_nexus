from flask import Flask, render_template
from pymongo import MongoClient

app = Flask(__name__)

# Read configuration from config.txt
with open('config.txt') as config_file:
    config = config_file.readlines()

# Parse configuration values
mongo_uri = config[0].strip().split('=')[1]
database_name = config[1].strip().split('=')[1]
collection_name = config[2].strip().split('=')[1]

# MongoDB Configuration
client = MongoClient(mongo_uri)
db = client[database_name]
collection = db[collection_name]

@app.route('/')
def index():
    items = collection.find()
    return render_template('index.html', items=items)

if __name__ == '__main__':
    app.run(debug=True)