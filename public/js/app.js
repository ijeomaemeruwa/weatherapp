
const inputValue = document.querySelector('#input');
const searchValue = document.querySelector('#search-btn');
const currentLocation = document.querySelector('#location');
const weatherIcon = document.querySelector('#weather-icon');
const temperature = document.querySelector('#temperature-info');
const description = document.querySelector('#weather-description');
const storedResults = document.querySelector('#city-data')

const weather = {};

weather.temperature = {
    unit : "celsius"
}

const CONVERT = 273; //Convert To Celcius

// Fetch Api with search button
const getValue = async(e) => {
    e.preventDefault();
    const searchData = inputValue.value.trim();

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchData}&appid=c3b0698c2da89518cd239ee150dc1386`);
    const data = await response.json();
    console.log(data);
    
    weather.temperature.value = Math.floor(data.main.temp - CONVERT);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    //weather.date = new Date(data.timezone).toDateString();
    
    displayWeather()

    /*if(searchData) {
        localStorage.setItem('results', searchData);
    }*/

    storeWeatherInfo();
};


//Local Storage
/*
function storeWeatherInfo()  {
    if(localStorage.getItem('results')) {
        let searchResults = localStorage.getItem('results');

        storedResults.innerHTML = 
          `
          <div class="stored-data">
          <h3>${weather.city}</h3>
          <small>${weather.description}</small>
          </div>
          `
    }
}
*/

//Display weather info to the DOM
function displayWeather() {
    currentLocation.innerHTML = weather.city;
    weatherIcon.innerHTML = `<img src="icons/${weather.iconId}.png" alt="icon"/>;`
    temperature.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    description.innerHTML = weather.description;
}

//Covert to Fahrenheit
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

//On click, convert to Fahrenheit
function convertTemperature() {
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        temperature.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        temperature.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
}





//Event Listeners
searchValue.addEventListener('click', getValue);
temperature.addEventListener('click', convertTemperature);