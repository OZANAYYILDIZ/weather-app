// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=17ea5ba9a9dc62a9c0de1045c75d8170

const containerDiv = document.querySelector('.container');



const formDOM = document.querySelector('#city-name-form');
const input = document.createElement('input');
const button = document.createElement('button');

input.setAttribute('id', 'city-name-input');
input.setAttribute('placeholder', 'Enter your city');

button.setAttribute('id', 'form-btn');
button.textContent = 'Search';

formDOM.appendChild(input);
formDOM.appendChild(button);

formDOM.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    let cityName = document.querySelector('#city-name-input').value;
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=17ea5ba9a9dc62a9c0de1045c75d8170`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response)
        if(response.cod === '404'){
            alert('Enter a valid city name');
            return
        }
        const display = document.querySelector('.display');
        if(display){
            display.remove();
        }
        const displayDiv = document.createElement('div');
        displayDiv.classList.add('display')
        displayDiv.textContent = `${cityName} Temperature : ${Math.floor(response.main.temp - 273.15)} °C
                                But it feels like : ${Math.floor(response.main.feels_like - 273.15)} °C
                                It is expected to see highest as ${Math.floor(response.main.temp_max - 273.15)} °C and lowest ${Math.floor(response.main.temp_min - 273.15)} °C
                                Sky has ${response.weather[0].description}`
        containerDiv.appendChild(displayDiv)
    });
    formDOM.reset();
})