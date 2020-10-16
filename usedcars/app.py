from flask import Flask, render_template, redirect, request
# from xgboost import XGBClassifier
import pandas as pd
import numpy as np
import pickle
import os
# Create an instance of Flask
app = Flask(__name__)

# with open(f'best_logistic_reg_model.pickle', "rb") as f:
filepath =  os.path.join("usedcars", "data", 'best_xgb_pipeline_model.pickle')

with open(filepath, "rb") as f:
    model = pickle.load(f)

# feature_names = model.get_booster().feature_names

# Route to render index.html template using data from Mongo
@app.route("/", methods=["GET", "POST"])
def home():
    output_message = ""

    if request.method == "POST":
        carmake = request.form["carmake"]
        carmodel = request.form["carmodel"]
        purchaseyear = int(request.form["purchaseyear"])
        transmission = request.form["transmission"]
        fueltype = request.form["fueltype"]
        mileage = float(request.form["mileage"])
        mpg = float(request.form["mpg"])
        enginesize = float(request.form["enginesize"])
        print(f'model is {carmake}')
        
        # data must be converted to df with matching feature names before predict
        # data = pd.DataFrame(np.array([[recency, frequency, monetary, time]]), columns=feature_names)
        testdata = np.array([[1.17]])
        rawdata = pd.DataFrame(np.array([[carmodel,purchaseyear,transmission,mileage,fueltype,mpg,enginesize,carmake]]), columns=['model','year','transmission','mileage','fuelType','mpg','engineSize','make'])
        
        # result = model.predict(testdata)
        # output_message = f'Please check results === {carmake} and ======{carmodel} ======== {purchaseyear} ======= {transmission}============={fueltype}============{mileage}======={mpg} ==== {enginesize}'
        result = model.predict(rawdata)
        output_message = f'Please check results =========={result}'
        
    return render_template("index.html", message = output_message)

if __name__ == "__main__":
    app.run()
