from flask import Flask
import time
import json
app = Flask(__name__)

@app.route("/")
def echo():
    return json.dumps({"started":"true"})

if __name__ == "__main__":
    print('oh hello')
    time.sleep(5)
    app.run(host='127.0.0.1', port=5122)
