const request = require('request');
const config = require('./conf/default.js');

var WeatherApp = module.exports = function WeatherApp() {

};

WeatherApp.prototype.forecast = function (callback) {
    let url = config.openWeatherAPI.forecastUrl + config.openWeatherAPI.appID;
    request({
        method: 'GET',
        uri: url
    }, (err, resp, body) => {
        if (err) {
            throw new Error(err);
        }
        callback(_bodyToObject(body));
    });
}

WeatherApp.prototype.currentWeather = function (callback) {
    let url = config.openWeatherAPI.currentWeatherUrl + config.openWeatherAPI.appID;
    request({
        method: 'GET',
        uri: url
    }, (err, resp, body) => {
        if (err) {
            throw new Error(err);
        }
        let respBody = _bodyToObject(body);
        respBody.weather[0].icon = _getIconImage(respBody.weather[0].icon);
        callback(respBody);
    });
}

/**
 * The name of the wether icon returned by the API
 * @param {String} iconName 
 */
function _getIconImage(iconName) {
    const iconMap = {
        '01d': 'wi-day-sunny',
        '02d': 'wi-day-cloudy',
        '03d': 'wi-cloudy',
        '04d': 'wi-day-cloudy-high',
        '09d': 'wi-day-rain-wind',
        '10d': 'wi-day-rain-mix',
        '11d': 'wi-day-thunderstorm',
        '13d': 'wi-day-snow',
        '50n': 'wi-fog',
        '01n': 'wi-night-sunny',
        '02n': 'wi-night-cloudy',
        '03n': 'wi-cloudy',
        '04n': 'wi-night-cloudy-high',
        '09n': 'wi-night-rain-wind',
        '10n': 'wi-night-rain-mix',
        '11n': 'wi-night-thunderstorm',
        '13n': 'wi-night-snow',
        '50n': 'wi-night-fog',
    };
    if (typeof iconMap[iconName] !== "undefined") {
        return `<i class="wi ${iconMap[iconName]}"></i>`;
    } else {
        return `<img src="http://openweathermap.org/img/w/${iconName}.png" class="weatherImage" />`;
    }
}


function _bodyToObject(body) {
    if (typeof body !== "object") {
        return JSON.parse(body)
    }
    return body;
}