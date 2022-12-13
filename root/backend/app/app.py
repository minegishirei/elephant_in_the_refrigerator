from flask import Flask
from flask import jsonify

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




@app.route("/food_complement")
def food_complement():
    # 食品補足用API
    return jsonify(
      {
        "food_kind": "さかな",
        "category": 1,
        "title": "さば",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0gKRUcBjTN2lQmDekPzK2NfM9Ay4tt_LMVmbuta4B&s"
      }
    )
