
// Engine Size Sliders
var engineSlider = document.getElementById("engineSize");
var engineOutput = document.getElementById("engineSizeValue");
engineOutput.innerHTML = engineSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
engineSlider.oninput = function() {
    engineOutput.innerHTML = this.value;
}

// Car Make Dropdown Selection
// Load CSV File to populate drop down values
function dropdownSelection (){
    d3.csv("static/js/Make_Model_Only.csv").then(function(data){
        console.log(data);

// Get the inputs from user

d3.select("select")
  .on("change",function(d){
    var selected = d3.select("#Make").node().value;
    console.log(selected);

    //clear previous models options
    document.getElementById("Model").innerHTML = null;

    let modelOptions=[];

// Review Make to retrieve Models
    data.forEach(row=>{
    if (row["Make"]===selected){
        modelOptions.push(row["model"])
    }
})
    console.log(modelOptions)
    
    //html Model dropDown selector
    var dropDwnSelect = d3.select("#Model");
    
    //append "option" and value for each model
    modelOptions.forEach(sample =>{
        var option = dropDwnSelect.append("option");
            option.text(sample).property("value",sample);
    })
})
    })
}

// Reset Button
var resetButton = d3.select("#reset-btn");
resetButton.on("click", resetSearch);

//reset the search form
function resetSearch(){
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // reset the form
    document.getElementById("form-id").reset();

    document.getElementById("Model").innerHTML = null;

    var audiModels = ["A1","A2","A3","A4","A5","A6","A7","A8","Q2","Q3","Q5","Q7","Q8","R8","RS3","RS4","RS5","RS6","RS7","S3","S4","S5","S8","SQ5","SQ7","TT"];
    var modelDropDown = d3.select("#Model");
    audiModels.forEach(model=>{
        var option = modelDropDown.append("option");
            option.text(model).property("value",model);
    })

    document.getElementById("result").innerHTML = " ";

}

// Submit button and numeric validation
var submitButton = d3.select("#submit-btn");
submitButton.on("click", numericValidation);

function makeImages(){

    var iframe = document.getElementById('ifrm');
    console.log("hola");

    var makeName = document.getElementById('Make').value;
    console.log(makeName)
    var staticString = "{{url_for('static', filename= 'images/";
    var endstaticString = "')}}";
    switch (makeName) {
        case "Audi":
        iframe.src = "https://public.tableau.com/views/Audi2_16029849782280/Dashboard1?:showVizHome=no&:embed=true";
        for (var i = 1; i<=5; i++){
          document.getElementById(`Image${i}`).src = `static/images/Audi_${i}.jpg`;
        };
        console.log("1")
          break;
        case "BMW":
        iframe.src = "https://public.tableau.com/views/BMW_16029136971440/Dashboard1?:showVizHome=no&:embed=true";
        for (var i = 1; i<=5; i++){
          document.getElementById(`Image${i}`).src = `static/images/BMW_${i}.jpg`;
        };
        console.log("2")
          break;
        case "Ford":
        iframe.src = "https://public.tableau.com/views/Ford_16029142764510/Dashboard1?:showVizHome=no&:embed=true";
        for (var i = 1; i<=5; i++){
          document.getElementById(`Image${i}`).src = `static/images/ford_${i}.jpg`
        };
        console.log("3")
          break;
        case "Hyundi":
        iframe.src = "https://public.tableau.com/views/Hyundai_16029147545360/Dashboard1?:showVizHome=no&:embed=true";
        for (var i = 1; i<=5; i++){
          document.getElementById(`Image${i}`).src = `static/images/Hyundi_${i}.jpg`
        };
        console.log("4")
          break;
        case "Mercedes Benz":
        iframe.src = "https://public.tableau.com/views/Mercedes_16029153489260/Dashboard1?:showVizHome=no&:embed=true";
        for (var i = 1; i<=5; i++){
          document.getElementById(`Image${i}`).src = `static/images/Mercedes_Benz_${i}.jpg`
        };
        console.log("5")
          break;
        case "Skoda":
        iframe.src ="https://public.tableau.com/views/Skoda/Dashboard1?:showVizHome=no&:embed=true";
        for (var i = 1; i<=5; i++){
          document.getElementById(`Image${i}`).src = `static/images/skoda_${i}.jpg`
        };
        console.log("6")
          break;
        case "Toyota":
        iframe.src ="https://public.tableau.com/views/Toyota_16029161101880/Dashboard1?:showVizHome=no&:embed=true";
        for (var i = 1; i<=5; i++){
          document.getElementById(`Image${i}`).src = `static/images/toyota_${i}.jpg`
        };
        console.log("7")
          break;
        case "Volkswagen":
        iframe.src ="https://public.tableau.com/views/VW_16029163851660/Dashboard1?:showVizHome=no&:embed=true";
        for (var i = 1; i<=5; i++){
          document.getElementById(`Image${i}`).src = `static/images/Volkswagen_${i}.jpg`
        };
        console.log("8")
         break;
      }

}

function numericValidation() {

    action = "submit";

    var miles,mpg
 
    // Get the value of the input field
    miles = document.getElementById("Miles").value;

    console.log(miles)

    // Get the value of the input field
    mpg = document.getElementById("mpg").value;

    console.log(mpg)
  
    // If miles is Not a Number or null
    if (isNaN(miles) || null ) {
      alert("Please Enter a Numeric Value For Miles");
    }
    // If x is Not a Number or null
    else if (isNaN(mpg) || null ) {
      alert("Please Enter a Numeric Value For MPG");
    }

    var make = document.getElementById("Make").value;
    console.log(make);
    var model = document.getElementById("Model").value;
    var year = document.getElementById("Year").value;
    var transmission = document.getElementById("Transmission").value;
    var fuelType = document.getElementById("fuelType").value;
    var milesInput = document.getElementById("Miles").value;
    var mpgInput = document.getElementById("mpg").value;
    var engineSize = document.getElementById("engineSize").value;
    console.log(engineSize);
  
    var dataUrl = `/predict/${make}/${model}/${year}/${transmission}/${fuelType}/${milesInput}/${mpgInput}/${engineSize}`;
    console.log(dataUrl);

    fetch(dataUrl)
    .then(response => response.text())
    .then(data => { 

      var formattedPoundValue = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      var data_value = Math.round(parseFloat(data.replace(/,/g, '')) * 1.291)
      var usdTotal = data_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      document.getElementById('result').innerHTML = `Estimated Sales Price: &#163;${formattedPoundValue} | USD$ ${usdTotal}`;
    console.log(data)});

    makeImages();
}

dropdownSelection();
