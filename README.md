# UK Used Cars Price Estimator App
By Adriana Ovalle, Deepika Awasthi & Maria Lara

![Figure1](images/Image1.png)

## Objective
This application helps estimating UK used cars price based on:  make, model, year, transmission, mileage, fuel type, miles per gallon (mpg), and engine size

## Data Source
The data was downloded from Kaggle at: https://www.kaggle.com/adityadesai13/used-car-dataset-ford-and-mercedes?select=vw.csv. It contains 100,000 scraped used car listings, cleaned and split into car make. The lasy update was done in June, 2020.

## Architecture
* For Storage: Amazon Simple Storage Service (Amazon S3) was used because of it offering on scalability, data availability, security, and performance. 
* For Application Deployment: Heroku was used as cloud platform to deploy the application becasue its suppprt of different programming languages.
![Figure2](images/Image2.png)

## Technologies Used
A vartiety of technologies were combined for data analysis, machine learning, application functionality and user interface.
![Figure3](images/Image3.png)

## Workflow Used for model selection
The following workflow was used to test 8 different regression models.
![Figure4](images/Image4.png)

## Models Analyzed
 XGB egressor was selected at the moment of code freeze because of its high accuracy comapred to the other models. Results of each model are presented in the table below.
![Figure5](images/Image5.png)

## XGB Regressor Test
20 random samples were selected to test the XGB Regressor model. The predicted vs actual difference is below 4%.
![Figure6](images/Image6.png)

## User Interface
The user 
