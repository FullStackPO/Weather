let api_key = `your_api_key`;

let place = document.querySelector('#location');
let temp = document.querySelector('#temp');
let wind = document.querySelector('#wind');
let humidity = document.querySelector('#humidity');
let feels = document.querySelector('#feels');
let desc = document.querySelector('#desc');
let ecity = document.querySelector('#ecity');
let btn = document.querySelector('#getInfo');

async function weather(city) {
    try {
        place.innerText = "Loading...";

        let raw = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);

        if (raw.ok) {
            let data = await raw.json();

            place.innerText = data.name;
            temp.innerText = `${data.main.temp}°C`;
            wind.innerText = data.wind.speed + " km/h";
            feels.innerText = data.main.feels_like + "°C";
            humidity.innerText = data.main.humidity + "%";
            desc.innerText = data.weather[0].main;
        } 
        else {
            alert(`No City found named "${city}"`);
        }

    } catch (err) {
        console.log("Error:", err.message);
    }
}

weather('delhi');

function getWeather() {
    let city = ecity.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    weather(city);
}

ecity.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        getWeather();
    }
})