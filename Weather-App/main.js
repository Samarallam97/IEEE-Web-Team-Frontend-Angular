// "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=okVXDvwj1gJfCEI6uh9cqu6A0uzjAEWQ&q=cairo"
// city
//"http://dataservice.accuweather.com/forecasts/v1/daily/5day/127164?apikey=okVXDvwj1gJfCEI6uh9cqu6A0uzjAEWQ"
//key


let search=document.getElementById("search")
let weekDay1=document.getElementById("weekDay1")
let monthDay1=document.getElementById("monthDay1")

let town =document.getElementById("town")
let temperature=document.getElementById("temp")
let icon=document.getElementById("icon")
let description=document.getElementById("description")

let direction=document.getElementById("direction")
let wind=document.getElementById("wind")
let rain=document.getElementById("rain")


let nextDay=document.getElementsByClassName("nextDay")
let maxTemp=document.getElementsByClassName("maxTemp")
let minTemp=document.getElementsByClassName("minTemp")
let iconNext=document.getElementsByClassName("iconNext")
let descNext=document.getElementsByClassName("descNext")




/////////////////////////////////////////////

let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let months=["January","February","March","April","May","June","July","August","September","October","November","December"]

///////////////////////////////////////////// using one API

let promise,data,currentCity;

async function getWeather(city="cairo") {
     promise= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${city}&days=3`)
     data=await promise.json()
    
    displayToday()
    displayNext() 
   
}
getWeather()


///////////////////////////////////////today

 function displayToday() {
    weekDay1.innerHTML=days[new Date(data.forecast.forecastday[0].date).getDay()]
    monthDay1.innerHTML=`${new Date(data.forecast.forecastday[0].date).getDate()} ${months[new Date(data.forecast.forecastday[0].date).getMonth()]}`
    town.innerHTML=data.location.name
    temperature.innerHTML=`${data.forecast.forecastday[0].day.avgtemp_c}°C`
    icon.src=`https:${data.forecast.forecastday[0].day.condition.icon}`
    description.innerHTML=data.forecast.forecastday[0].day.condition.text
    rain.innerHTML = `${data.current.humidity} %`;
    wind.innerHTML = `${data.current.wind_kph} kph`;
    direction.innerHTML =data.current.wind_dir;
    
}
////////////////////////////////////tomorrows
function displayNext() {
    for( let i=0; i<2;i++){
         nextDay[i].innerHTML=days[new Date(data.forecast.forecastday[i+1].date).getDay()]
         maxTemp[i].innerHTML = `${data.forecast.forecastday[i+1].day.maxtemp_c}°C`;
         minTemp[i].innerHTML = `${data.forecast.forecastday[i+1].day.mintemp_c}°C`;
         iconNext[i].src =`https:${data.forecast.forecastday[i+1].day.condition.icon}`
         descNext[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text
    
     }
}

/////////////////////////////////////////// search
search.addEventListener("keyup",function(){
    currentCity= search.value;
  getWeather(currentCity);
  })
  

















// ///////////////////////////////////////////// using two APIs

// ///////////////////////////////////////////// findKey

// let key,dailyForecasts,city;

// async function findKey(city="cairo") {
    
//     const api=await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=okVXDvwj1gJfCEI6uh9cqu6A0uzjAEWQ&q=${city}`) 
    
//     const data=await api.json()

//     // return data[0].Key 
//     key=await data[0].Key 
//     dailyForecasts=await findCity(key)
//     displayToday() 
//     displayNext()
// }

// findKey() 

//  ///////////////////////////////////////////// findCity

// async function findCity(key) {
//     const api= await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=okVXDvwj1gJfCEI6uh9cqu6A0uzjAEWQ`)
//     const data=await api.json()
//     return data.DailyForecasts;
   
// }


// ////////////////////////////////////////////today

//  function displayToday() {
//     weekDay1.innerHTML=days[new Date(dailyForecasts[0].Date).getDay()]
//     monthDay1.innerHTML=`${new Date(dailyForecasts[0].Date).getDate()} ${months[new Date(dailyForecasts[0].Date).getMonth()]}`

//     temperature.innerHTML=`${parseInt(((dailyForecasts[0].Temperature.Maximum.Value +dailyForecasts[0].Temperature.Minimum.Value)/2-32)*5/8)}°C`;
//     description.innerHTML=dailyForecasts[0].Day.IconPhrase
//  icon.src=`https://developer.accuweather.com/sites/default/files/0${dailyForecasts[0].Day.Icon}-s.png`

// }


// ///////////////////////////////////////tomorrows

//  function displayNext() {
//     for (let i = 0; i <2; i++) {
//         nextDay[i].innerHTML=days[new Date(dailyForecasts[i+1].Date).getDay()]
//         maxTemp[i].innerHTML=`${parseInt(((dailyForecasts[i+1].Temperature.Maximum.Value)-32)*5/8)}°C`
//         minTemp[i].innerHTML=`${parseInt(((dailyForecasts[i+1].Temperature.Minimum.Value)-32)*5/8)}°C`
//         descNext[i].innerHTML=dailyForecasts[i+1].Day.IconPhrase
//          iconNext[i].src=`https://developer.accuweather.com/sites/default/files/0${dailyForecasts[i+1].Day.Icon}-s.png`
//      }
    
// }

// //////////////////////////////////// search

// search.addEventListener("keyup",function(){
//     city= search.value;
//   findKey(city);

//   })


 







