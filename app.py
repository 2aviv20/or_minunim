import os 
import requests 

# docs folder path
docsPath = os.path.dirname(os.path.abspath( __file__ )) + "/docs"
#server url
url = "http://amitai-net.co.il/weight_dose2.asp"

def getDataFromServer(weight):
    payload = 'weight=' + weight + '&age='
    headers = {
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept-Language': 'en,he;q=0.9',
    }
    response = requests.request("POST", url, headers=headers, data = payload)
    return response.text.encode('utf8')

def writeFile(weight,html):
    f = open(docsPath + "/" + weight + ".html", "w")
    f.write(html)
    f.close()

if os.path.exists(docsPath) == False:
    print("docs folder doesnt exist!")
    os.mkdir(docsPath)
    print("docs folder was created.")
else:
    print("docs folder exist")

print("insert weight list: ")
weightList = raw_input()
weightList = weightList.split(",")

for item in weightList:
    res = getDataFromServer(item)
    res = res.replace("n11/css/style.css", "../style.css")
    writeFile(item,res)

