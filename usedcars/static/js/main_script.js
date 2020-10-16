// Engine Size Sliders
var engineSlider = document.getElementById("engineSize");
var engineOutput = document.getElementById("engineSizeValue");
engineOutput.innerHTML = engineSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
engineSlider.oninput = function() {
    engineOutput.innerHTML = this.value;
}

// Car Make Dropdown Selection
// Load CSV File
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

    var modelDropDown = d3.select("#Model");
    var modelDefaultOption = modelDropDown.append("option");
    modelDefaultOption.text("Model").property("value","Model");

}

dropdownSelection()