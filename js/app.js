// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=17ea5ba9a9dc62a9c0de1045c75d8170

fetch('https://api.openweathermap.org/data/2.5/weather?q=Istanbul&APPID=17ea5ba9a9dc62a9c0de1045c75d8170', {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        console.log('temperature :' + response.main.temp + ' but it feels like :' + response.main.feels_like);
        console.log('it is expected to see highest as ' + response.main.temp_max + ' and lowest as ' + response.main.temp_min);
        console.log('Sky has ' + response.weather[0].description);
        console.log('end of the weather fetch')
    })

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
    const select = document.createElement('select');
    select.classList.add('city-selector');
    select.setAttribute('id', 'city-options')
    containerDiv.appendChild(select);

    for(let index = 0; index < cityList.length; index++){
        const option = document.createElement('option');
        option.classList.add('options');
        option.setAttribute('value', cityList[index]);
        option.textContent = `${cityList[index]}`
        select.appendChild(option);
    }
};