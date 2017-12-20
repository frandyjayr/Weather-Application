
document.getElementById('submit-button').addEventListener('click', function(event) {
	var APIKEY = "&units=imperial&appid=c35745783d32e01207d00cac1b9cf6bf";
	var req = new XMLHttpRequest();
	var payload = {};
	
	payload.cityName = document.getElementById("city-entered").value;
	console.log(payload.cityName);
	req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=' + payload.cityName + ',us' + APIKEY, true);
	
	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
			console.log(response);
			updateApp(response);
		} else {
			console.log("Error in network request: " + req.statusText);
		}
	});

	req.send(null);
	event.preventDefault();
});

function updateApp(response) {
	updateCity(response);
	updateTemperature(response);
	updateDescription(response);
	updateHighLow(response);
	updateHumidity(response);
	updateWeatherIcon(response);
}

function updateCity(response) {
	document.getElementById('city-name').textContent = response.name;
}

function updateTemperature(response) {
	document.getElementById('temperature').innerHTML = response.main.temp + '&deg;F';
}

function updateDescription(response) {
	document.getElementById('description').textContent = toTitleCase(response.weather[0].description);
}

function updateHighLow(response) {
	document.getElementById('min').innerHTML = response.main.temp_min + '&deg;F' + ' ';	
	
	document.getElementById('max').innerHTML = '/ ' + response.main.temp_max + '&deg;F';
}

function updateHumidity(response) {
	document.getElementById('humidity').innerHTML = 'Humidity: ' + response.main.humidity + '&deg;F';
}

// Capitalization function
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function updateWeatherIcon(response) {
	var weather = toTitleCase(response.weather[0].description);
	var weatherIcon;
	
	if (weather === 'Clear Sky') {
		weatherIcon = 'wi wi-day-sunny display-1';	
	} else {
		weatherIcon = 'wi wi-day-sunny display-1';
	}
	
	document.getElementById('weather-icon').className = weatherIcon;
}