// Write your JavaScript code here!
window.addEventListener("DOMContentLoaded", function(){
      let form = document.querySelector("form");
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      let faultyItemsVis = document.getElementById("faultyItems");
      let launchStatus = document.getElementById("launchStatus");
   
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
            response.json().then(function(json) {
               let div = document.getElementById("missionTarget");
               let destination = json[Math.floor(Math.random() * json.length)];
               div.innerHTML = ` <h2>Mission Destination</h2>
                                 <ol>
                                    <li>Name: ${destination.name}</li>
                                    <li>Diameter: ${destination.diameter}</li>
                                    <li>Star: ${destination.star}</li>
                                    <li>Distance from Earth: ${destination.distance}</li>
                                    <li>Number of Moons: ${destination.moons}</li>
                                 </ol>
                                       <img src="${destination.image}">`
            });
      });
      form.addEventListener("submit", function(event) {
     
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === ""){
         alert("All fields are required!");
         event.preventDefault();
      }
      if ( isNaN(pilotName.value) == false) {
         alert("Please enter a valid pilot name!");
         event.preventDefault();
      } 
      
      if ( isNaN(copilotName.value) == false){
         alert("Please enter a valid co-pilot name!")
         event.preventDefault();
      }
      if ( isNaN(fuelLevel.value) == true) {
         alert("Please enter a number for fuel level!")
         event.preventDefault();
      }
      if ( isNaN(cargoMass.value) == true){
         alert("Please enter a number for cargo mass!");
         event.preventDefault();
      }
      if (fuelLevel.value < 10000) {
         faultyItemsVis.style.visibility = "visible";
         fuelStatus.innerHTML = "Fuel level too low for launch";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         event.preventDefault();
      } 
      if (cargoMass.value > 10000){
         faultyItemsVis.style.visibility = "visible";
         cargoStatus.innerHTML = "Cargo mass too high for launch";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         event.preventDefault();
      }

      pilotStatus.innerHTML = `${pilotName.value} is ready`;
      copilotStatus.innerHTML = `${copilotName.value} is ready`;
      
      if (pilotName.value != "" && copilotName.value != "" && fuelLevel.value != "" &&
       cargoMass.value != "" && isNaN(pilotName.value) == true && isNaN(copilotName.value) == true
       && isNaN(fuelLevel.value) == false && isNaN(cargoMass.value) == false
       && fuelLevel.value > 10000 && cargoMass.value < 10000) {
         launchStatus.innerHTML = "Shuttle is ready for launch";
         launchStatus.style.color = "green";
         event.preventDefault();
       }
   });
});

