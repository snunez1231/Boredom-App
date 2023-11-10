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
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data=> {
        console.log(data)
        var lat = data[0].lat
        var lon = data [0].lon
        getWeather(lat,lon)
   
    })
}

function getBrewery(city){
    console.log(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=3`)
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=3`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        

    })

}

function displayWeather(data){
    console.log(data)
    cityname.textContent=data.name
    temp.textContent= data.main.temp
}

function displayBrewery(){
  

}



searchform.addEventListener("submit", (event) =>{
    event.preventDefault()
    console.log(cityinput.value)
getCoordinates(cityinput.value)
getBrewery(cityinput.value)
} )