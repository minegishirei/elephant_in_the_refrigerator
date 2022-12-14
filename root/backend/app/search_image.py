
import requests

def search_image(query):
    endpoint = "https://pixabay.com/api"

    headers= {

    }
    params={
        "key":"32060178-04db4035c7070283d16f91063",
        "q":query,
        "lang":"ja",
        "image_type":"photo"
    }
    result = requests.get(endpoint, headers=headers, params=params)
    print(result.json())
    print(query)
    print("!!!!!!!!!!!!!!!!!!")
    return result.json()["hits"]

"""
print(res["total"])
for hit in res["hits"]:
    print("詳細URL："+hit["pageURL"])
    print("イメージタイプ："+hit["type"])
    print("カテゴリ："+hit["tags"])
    print("プレビュー画像URL："+hit["previewURL"])
    print("画像URL："+hit["largeImageURL"])
    print("ダウンロード数："+str(hit["downloads"]))
    print("お気に入り数："+str(hit["likes"]))
    print("---------------------------")
"""