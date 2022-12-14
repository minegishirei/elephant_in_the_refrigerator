from flask import Flask
from flask import jsonify
from flask import render_template,request

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False

@app.route("/")
def index():
    return jsonify(
      {
        "food_kind": "さかな",
        "category": 1,
        "title": "さば",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0gKRUcBjTN2lQmDekPzK2NfM9Ay4tt_LMVmbuta4B&s"
      }
    )


## 食材情報補足API
@app.route("/food_complement")
def food_complement():
    return jsonify(
      {
        "food_kind": "さかな",
        "category": 1,
        "title": "さば",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0gKRUcBjTN2lQmDekPzK2NfM9Ay4tt_LMVmbuta4B&s"
      }
    )




## ユーザー冷蔵庫データ
## > sample
## http://0.0.0.0/refrigerator/add?food_kind=%E3%81%95%E3%81%8B%E3%81%AA&title=%E3%83%8B%E3%82%B7%E3%83%B3
@app.route("/refrigerator/add", methods=["GET"])
def refrigerator_add():
    food_kind = request.args.get("food_kind","")
    title = request.args.get("title","")

    return jsonify(
      {
        "food_kind": food_kind,
        "title": title,
        "category": 1
      }
    )




class RefrigeratorDAO():
    def __init__(self):
        self.jsonIO = JsonIO("/app/refrigerator.json")
        pass

    def take_out_all(self):
        return 
    
    def change_food(self, title, food_kind):
        





import json
class JsonIO():
    def __init__(self, file_path):
        self.file_path = file_path
    
    def read(self):
        with open(self.file_path, 'r') as f:
            return json.load(f)

    def write(self, target_dict):
        with open(self.file_path, 'w') as f:
            json.dump(target_dict, f)






