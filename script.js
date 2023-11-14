var temp = document.getElementById('temp')
var cityname= document.getElementById('city-name')
var searchform = document.getElementById('search-form')
var cityinput= document.getElementById('city-input')
var brewerycontainer= document.getElementById('brewery-container') 
var apiKey = "fcdb77bcab0f5e656f374a185e3665bd"

function getWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
      .then(response => response.json())
      .then(data=> displayWeather(data))
    
}
function getCoordinates(city) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data=> {
        console.log(data)
        var lat = data[0].lat
        var lon = data [0].lon
        getWeather(lat,lon)
        getBrewery(city)
   
    })
}

function getBrewery(city){
    console.log(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=3`)
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=3`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        displayBrewery(data);
        

    });

}




function displayWeather(data){
    console.log(data)
    cityname.textContent=data.name
    temp.textContent= data.main.temp
    var iconCode= data.weather[0].icon;
    var iconImg= document.createElement('img');
    iconImg.src = `http://openweathermap.org/img/w/${iconCode}.png`;
    temp.appendChild(iconImg);
}

function displayBrewery(breweryData){
    brewerycontainer.innerHTML="";
     
    breweryData.forEach(brewery => {
        var breweryDiv = document.createElement('div');
        breweryDiv.classList.add('brewery');
    
        var breweryName = document.createElement('h3');
        breweryName.textContent = brewery.name || "Name not available";
    
        var breweryAddress = document.createElement('p');
        breweryAddress.textContent = `Address: ${brewery.address_1 || "Address not available"}, ${brewery.city || "City not available"}, ${brewery.state || "State not available"}, ${brewery.postal_code || "Postal Code not available"}`;
  
        var breweryPhone= document.createElement('p');
        breweryPhone.textContent= `Phone number: ${brewery.phone || "Phone number not available"},`
  
        breweryDiv.appendChild(breweryPhone);
        breweryDiv.appendChild(breweryName);
        breweryDiv.appendChild(breweryAddress);
        brewerycontainer.appendChild(breweryDiv);
  
      });
    }
  



searchform.addEventListener("submit", (event) =>{
    event.preventDefault()
    console.log(cityinput.value)
getCoordinates(cityinput.value)
getBrewery(cityinput.value)
} )