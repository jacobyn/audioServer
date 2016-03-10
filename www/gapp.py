#import os;
#sys.path.insert(1, os.path.dirname(os.path.realpath(__file__)))

from flask import Flask, render_template, json, request
#from flask.ext.mysql import MySQL
import random

from werkzeug import generate_password_hash, check_password_hash

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('index.html')

@app.route('/getseed')
def get_python_data():
    x=random.randint(0, 100);
    return json.dumps(x)

@app.route('/postRes', methods = ['POST'])
def postRes():
    # jsdata = request.form['data']
    # print json.loads(jsdata)[0]
    # return json.loads(jsdata)[0]
    #user =  request.form['username'];
    #password = request.form['password'];
    data=request.form
    print data;
    return json.dumps({'status':'OK','data':json.dumps(data)});

if __name__ == "__main__":
    #app.run(host='104.236.171.189')
    app.run(host='0.0.0.0')
