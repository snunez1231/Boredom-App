var temp = document.getElementById('temperature0');
var cityname = document.getElementById('city0');
var searchform = document.querySelector('.search');
var cityinput = document.getElementById('cityInput');
var brewerycontainer = document.getElementById('brewery-container'); 
var apiKey = "fcdb77bcab0f5e656f374a185e3665bd";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => displayWeather(data));
}

function getCoordinates(city) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log("Weather API Response:", data);
            var lat = data[0].lat;
            var lon = data[0].lon;
            getWeather(lat, lon);
            getBrewery(city);
        })
        .catch(error => console.error("Error fetching weather API:", error));
}

function getBrewery(city) {
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=3`)
        .then(response => response.json())
        .then(data => {
            console.log("Brewery API Response:", data);
            displayBrewery(data);
        })
        .catch(error => console.error("Error fetching brewery API:", error));
}

function displayWeather(data) {
    console.log(data);
    cityname.textContent = data.name;
    temp.textContent = data.main.temp;
    var iconCode = data.weather[0].icon;
    var iconImg = document.createElement('img');
    iconImg.src = `http://openweathermap.org/img/w/${iconCode}.png`;
    temp.appendChild(iconImg);
}

function displayBrewery(breweryData) {
    brewerycontainer.innerHTML = "";

    breweryData.forEach(brewery => {
        var breweryTile = document.createElement('article');
        breweryTile.classList.add('tile', 'is-child', 'box'); 

        var breweryName = document.createElement('p');
        breweryName.classList.add('title');
        breweryName.textContent = brewery.name || "Name not available";

        var breweryAddress = document.createElement('p');
        breweryAddress.classList.add('subtitle');
        breweryAddress.textContent = `Address: ${brewery.address_1 || "Address not available"}, ${brewery.city || "City not available"}, ${brewery.state || "State not available"}, ${brewery.postal_code || "Postal Code not available"}`;

        breweryTile.appendChild(breweryName);
        breweryTile.appendChild(breweryAddress);
        brewerycontainer.appendChild(breweryTile);
    });
}

searchform.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(cityinput.value);
    getCoordinates(cityinput.value);
    getBrewery(cityinput.value);
});
