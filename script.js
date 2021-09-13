const apiKey = 'dc5ccd32a8df91c843db8202bfff0abe';

const weatherInfo = document.createElement('img')
const tempInfo = document.createElement('div')

const locationHeader = document.createElement('div')

const locationInput = document.createElement('input')
locationInput.placeholder = 'Location'
let locationValue = 'London'

const currentLocation = document.createElement('h1')
currentLocation.textContent = locationValue

const form = document.createElement('form')

const button = document.createElement('button')
button.textContent = 'Go'
button.classList.add('btn')

const celciusConverter = (kelvin) => {
    return Math.round(kelvin - 273.15)
}

// const locationContent = (input) => {
//     console.log('click')
//     locationValue = `${input}`
// }

fetch(`http://api.openweathermap.org/data/2.5/weather?q=${locationValue}&APPID=dc5ccd32a8df91c843db8202bfff0abe`, {mode: 'cors'})
  .then(function(response) {
    return response.json()
  })
  .then(function(response) {
    console.log(response)
    weatherInfo.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
    tempInfo.textContent = `${celciusConverter(response.main.temp)} °C`
  })

form.addEventListener('submit', (e) => {
    e.preventDefault()
    locationValue = `${locationInput.value}`
    currentLocation.textContent = locationValue
    locationInput.value = ''
    console.log(locationValue)
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${locationValue}&APPID=dc5ccd32a8df91c843db8202bfff0abe`, {mode: 'cors'})
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        console.log(response)
        weatherInfo.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
        tempInfo.textContent = `${celciusConverter(response.main.temp)} °C`
      })
      .catch(function(err) {
        alert('Enter City Name')
      })
}) 

const content = document.querySelector('#content')
content.append(locationHeader)
locationHeader.append(form)
form.append(locationInput)
form.append(button)
locationHeader.append(currentLocation)
content.append(weatherInfo)
content.append(tempInfo)