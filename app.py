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

def loadmodel():

    with open(filepath, "rb") as f:
        model = pickle.load(f)
    return(model)

# feature_names = model.get_booster().feature_names

# Route to render index.html template using data from Mongo
@app.route("/", methods=["GET", "POST"])
def home():            
        
    return render_template("index.html")

@app.route("/predict/<make>/<model>/<purchaseyear>/<transmission>/<fuelType>/<mileage>/<mpg>/<engineSize>")
def predictInput(make, model,purchaseyear,transmission, fuelType, mileage,mpg,engineSize):
    output_message = ""
    print("Hello")
    if  mileage.isnumeric():
        print("test")
        try:
            mpg_value = float(mpg)
            print(mpg_value)
            # carmake = request.form["carmake"]
            # carmodel = request.form["carmodel"]
            purchaseyear_value = int(purchaseyear)
            print(purchaseyear_value)
            # transmission = request.form["transmission"]
            # fueltype = request.form["fueltype"]
            mileage_value = float(mileage)
            print(mileage_value)
            enginesize_value = float(engineSize)
            print(enginesize_value)
            # print(f'model is {carmake}')
                    
            rawdata = pd.DataFrame(np.array([[model,purchaseyear_value,transmission,mileage_value,fuelType,mpg_value,enginesize_value, make]]), columns=['model','year','transmission','mileage','fuelType','mpg','engineSize','make'])
            model = loadmodel()
            result = model.predict(rawdata)
            output_message = round(float(result))
            
        except Exception as e:
            print (e)
            raise e 
    return(str(output_message))

if __name__ == "__main__":
    app.run(debug = True)
