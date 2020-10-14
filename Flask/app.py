import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():

    int_features = [int(x) for x in request.form.values()]
    array_features = [np.array(int_features)]
    df_features = pd.DataFrame(array_features,columns=['make','model','year','mileage','transmission','fuelType','mpg','engineSize','tax'])
    prediction = model.predict(final_features)

    output = round(prediction[0], 2)

    return render_template('index.html', prediction_text='Car Price should be $ {}'.format(output))


if __name__ == "__main__":
    app.run(debug=True)