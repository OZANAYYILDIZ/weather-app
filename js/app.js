// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=17ea5ba9a9dc62a9c0de1045c75d8170



// https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json

const containerDiv = document.querySelector('.container');

const cityList = [];

fetch('https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json', {mode: 'cors'})
.then(function(citynames) {
    return citynames.json();
})
.then(function(citynames) {
    for(let index = 0; index < citynames.length; index++){
        cityList.push(citynames[index].name);
    }
    selectMaker();
});

const selectMaker = () => {
    const select = document.querySelector('#city-options')

    for(let index = 0; index < cityList.length; index++){
        const option = document.createElement('option');
        option.classList.add('options');
        option.setAttribute('value', cityList[index]);
        option.textContent = `${cityList[index]}`
        select.appendChild(option);

    }
};

const selectOpt = document.querySelector('#city-options');


selectOpt.addEventListener('change', () => {
    console.log(selectOpt.value)

//    https://api.openweathermap.org/data/2.5/weather?q=London&APPID=17ea5ba9a9dc62a9c0de1045c75d8170
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectOpt.value}&APPID=17ea5ba9a9dc62a9c0de1045c75d8170`, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            const displayDiv = document.createElement('div');
            displayDiv.classList.add('display')
            displayDiv.textContent = `${selectOpt.value} Temperature : ${Math.floor(response.main.temp - 273.15)} °C
                                    But it feels like : ${Math.floor(response.main.feels_like - 273.15)} °C
                                    It is expected to see highest as ${Math.floor(response.main.temp_max - 273.15)} °C and lowest ${Math.floor(response.main.temp_min - 273.15)} °C
                                    Sky has ${response.weather[0].description}`
            containerDiv.appendChild(displayDiv)
            console.log('temperature : ' + Math.floor(response.main.temp - 273.15) + ' °C' + ' but it feels like : ' + Math.floor(response.main.feels_like - 273.15) + ' °C');
            console.log('it is expected to see highest as ' + Math.floor(response.main.temp_max - 273.15) + ' °C'  + ' and lowest as ' + Math.floor(response.main.temp_min - 273.15) + ' °C');
            console.log('Sky has ' + response.weather[0].description);
        })
})


