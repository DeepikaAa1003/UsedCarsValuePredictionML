// Engine Size Sliders
var engineSlider = document.getElementById("engineSize");
var engineOutput = document.getElementById("engineSizeValue");
engineOutput.innerHTML = engineSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
engineSlider.oninput = function() {
    engineOutput.innerHTML = this.value;
}

// Tax Slider
var taxSlider = document.getElementById("Tax");
var taxOutput = document.getElementById("taxValue");
taxOutput.innerHTML = taxSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
taxSlider.oninput = function() {
    taxOutput.innerHTML = this.value;
}

// Car Make Dropdown Selection
// Load CSV File
function dropdownSelection (){
    d3.csv("Matrix/Make_Model_Only.csv").then(function(data){
        console.log(data);

// Get the inputs from user
let carMake=d3.select("#Make").property('value');
console.log(carMake);

let modelOptions=[];

// Review Make to retrieve Models
data.forEach(row=>{
    if (row["Make"]===carMake){
        modelOptions.push(row["model"])
    }
})
console.log(modelOptions)


    })
}

dropdownSelection()