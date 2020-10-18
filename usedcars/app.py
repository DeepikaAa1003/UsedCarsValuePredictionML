from flask import Flask, render_template, redirect, request
import pandas as pd
import numpy as np
import pickle
import os
# Create an instance of Flask
app = Flask(__name__)

filepath =  os.path.join("usedcars", "data", 'best_xgb_pipeline_model.pickle')

def loadmodel():

    with open(filepath, "rb") as f:
        model = pickle.load(f)
    return(model)


# Route to render index.html template 
@app.route("/", methods=["GET", "POST"])
def home():            
        
    return render_template("index.html")

# Route to predict the results using tuned model
@app.route("/predict/<make>/<model>/<purchaseyear>/<transmission>/<fuelType>/<mileage>/<mpg>/<engineSize>")
def predictInput(make, model,purchaseyear,transmission, fuelType, mileage,mpg,engineSize):
    predicted_result = ""
    if  mileage.isnumeric():
        try:
            mpg_value = float(mpg)
            purchaseyear_value = int(purchaseyear)
            mileage_value = float(mileage)
            enginesize_value = float(engineSize)
            rawdata = pd.DataFrame(np.array([[model,purchaseyear_value,transmission,mileage_value,fuelType,mpg_value,enginesize_value, make]]), columns=['model','year','transmission','mileage','fuelType','mpg','engineSize','make'])
            model = loadmodel()
            result = model.predict(rawdata)
            predicted_result = round(float(result))
            
        except Exception as e:
            print (e)
            raise e 
    return(str(predicted_result))

if __name__ == "__main__":
    app.run(debug = True)
