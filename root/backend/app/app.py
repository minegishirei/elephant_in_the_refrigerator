from flask import Flask
from flask import jsonify
from flask import render_template,request

from search_image import search_image

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
@app.route("/refrigerator/set", methods=["GET"])
def refrigerator_add():
    food_kind      = request.args.get("food_kind","")
    title          = request.args.get("title","")
    food_count     = request.args.get("food_count","1")
    refrigeratorDAO = RefrigeratorDAO()
    refrigeratorDAO.change_food(
      title,
      food_kind,
      food_count
    )
    return refrigeratorDAO.take_out_all()

## ユーザー冷蔵庫データ
## > sample
## http://0.0.0.0/refrigerator/add?food_kind=%E3%81%95%E3%81%8B%E3%81%AA&title=%E3%83%8B%E3%82%B7%E3%83%B3
@app.route("/refrigerator/get")
def refrigerator_get():
    refrigeratorDAO = RefrigeratorDAO()
    return refrigeratorDAO.take_out_all()



class RefrigeratorDAO():
    def __init__(self):
        self.jsonIO = JsonIO("/app/refrigerator.json")

    def take_out_all(self):
        return self.jsonIO.read() 
    
    def change_food(self, title, food_kind, food_count):
        food_list = self.jsonIO.read()
        if not (len(title) > 0 and len(food_kind) > 0):
            return self.take_out_all()
        if (food_kind in food_list.keys()):
            # 食材の種類があるとき
            if ( title in list(map(lambda row: row["title"] ,food_list[food_kind])) ):
                def update_row(row):
                    if row["title"]==title:
                        return {
                            "category": int(food_count),
                            "title": title,
                            "img": search_image(f"食べ物 {title}")[0]["previewURL"]
                        }
                    else:
                        return row
                food_list[food_kind] = list(map(update_row, food_list[food_kind]))
            else:
                # 冷蔵庫に食材がないとき
                food_list[food_kind].append({
                    "category": int(food_count),
                    "title": title,
                    "img": search_image(f"食べ物 {title}")[0]["previewURL"]
                })
        else:
            # 冷蔵庫に食材がないとき
            food_list[food_kind] = [
              {
                  "category": int(food_count),
                  "title": title,
                  "img": search_image(f"食べ物 {food_kind}")[0]["previewURL"]
              }
            ]
        self.jsonIO.write(food_list)
        return self.take_out_all()
    




import json
class JsonIO():
    def __init__(self, file_path):
        self.file_path = file_path
    
    def read(self):
        with open(self.file_path, 'r') as f:
            return json.load(f)

    def write(self, target_dict):
        with open(self.file_path, 'w') as f:
            json.dump(target_dict, f , ensure_ascii=False, indent=4)






