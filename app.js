
const inputValue = document.querySelector('#input');
const searchValue = document.querySelector('#search-btn');
const currentLocation = document.querySelector('#location');
const timezone = document.querySelector('#timezone-info');
const weatherIcon = document.querySelector('#weather-icon');
const temperature = document.querySelector('#temperature-info');
const description = document.querySelector('#weather-description');

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

const CONVERT = 273; //Convert To Celcius

// Fetch Api with search button
const getValue = async() => {
    const searchData = inputValue.value;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchData}&appid=c3b0698c2da89518cd239ee150dc1386`);
    const data = await response.json();
    console.log(data);
    
    weather.temperature.value = Math.floor(data.main.temp - CONVERT);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country

    displayWeather()
};

//Display weather info to the DOM
function displayWeather() {
    currentLocation.innerHTML = `${weather.city}, ${weather.country}`
    weatherIcon.innerHTML = `<img src="icons/${weather.iconId}.png"/>;`
    temperature.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    description.innerHTML = weather.description;
}

//Covert to Fahrenheit
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

//On click convert to Fahrenheit
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

searchValue.addEventListener('click', getValue);
temperature.addEventListener('click', convertTemperature);