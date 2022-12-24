const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather'
const imageUrl = 'http://openweathermap.org/img/wn/'
const apiKey = 'e4849cdb381c89d0c8bc72edb00497bb'
const units = 'metric'

let input = document.getElementById('city')
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("fetch").click();
    }
  });

function fetchWeather() {
    let city = document.getElementById('city').value.trim()
    if(city === undefined || city === '') {
        document.getElementById('error').style.display = 'block'
        document.getElementById('weather-details').style.display = 'none'
        document.getElementById('error-desc').textContent = 'City name cannot be empty'
        return
    }
    fetch(weatherApiUrl + '?q=' + city + '&appid=' + apiKey + '&units=' + units)
        .then((response) => response.json())
        .then((data) => {
            if(data.cod != undefined && data.cod === '404') {
                document.getElementById('error').style.display = 'block'
                document.getElementById('weather-details').style.display = 'none'
                document.getElementById('error-desc').textContent = data.message
            }
            else {
                document.getElementById('weather-details').style.display = 'block'
                document.getElementById('error').style.display = 'none'
                document.getElementById('icon').setAttribute('src', imageUrl + data.weather[0].icon + '@2x.png')
                document.getElementById('forecast').textContent = data.weather[0].main
                document.getElementById('temp').textContent = data.main.temp
            }
        });
}