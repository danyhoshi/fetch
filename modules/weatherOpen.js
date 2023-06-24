import weathercode from "./weathercode.js";
import {getLocation, showPosition, componentDidMount} from "./geoLocal.js"
import printToday from "./printToday.js";
import config from '../config.js'; 
import printDay from "./printDay.js";
import {showTime, dateFormat, dateFormatD} from './hour.js';
let latLon; 
async function weatherOpen(city, country) {
 //console.log(`api: KEY: ${process.env.API_KEY}`);
    const latLon = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=5&appid=${config.API_KEY}`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data) => {
        console.log(data[0].lat);
        const latLon = { lat: data[0].lat, lon: data[0].lon };
        return latLon;
      })
      .catch((err) => {
        const message = err.statusText || 'Ocurrio un error';
        alert(`Error ${err.status}: ${message}`);
      });
//     let lat,lon;
//     let promise1 = new Promise(function(resolve, reject) {
//     navigator.geolocation.getCurrentPosition(function(pos){
//         lat = pos.coords.latitude
//         lon = pos.coords.longitude
//         resolve({lat,lon});
//     }) 
// })

// promise1.then(latLon);
// componentDidMount().then(latLon);
//      console.log(latLon);
    //const latLon = showPosition();
 //   console.log( getLocation() );
//  const success = (position) =>{
//   //console.log(position);
//     latLon = {lat: position.coords.latitude, lon: position.coords.longitude};;
//  }
    

//   const locat =  navigator.geolocation.getCurrentPosition(success);
//   console.log(locat);
    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latLon.lat}&longitude=${latLon.lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data) => {   
        let wc;
      if (showTime() >= 6 && showTime() < 18) {
        wc = weathercode.get(data.hourly.weathercode[showTime()]);
      } else {
        console.log(`Weather code:  ${data.hourly.weathercode[showTime()]}`);
        wc = weathercode.get(`${data.hourly.weathercode[showTime()]}N`);
      }
      console.log(`Temperatura hoy: ${data.hourly.temperature_2m[showTime()]}`);
      printToday(
        city,
        dateFormatD(data.daily.time[0]),
        data.hourly.temperature_2m[showTime()],
        data.daily.temperature_2m_max[0],
        data.daily.temperature_2m_min[0],
        wc
      );
      for (let ii = 1; ii < 5; ii++) {
        console.log(`weathercode: ${data.daily.weathercode[ii]} el ${dateFormatD(data.daily.time[ii])}`);
        printDay(city, dateFormatD(data.daily.time[ii]), data.daily.temperature_2m_max[ii], data.daily.temperature_2m_min[ii], weathercode.get(data.daily.weathercode[ii]));
      }
      })
      .catch((err) => {
        const message = err.statusText || 'Ocurrio un error';
        alert(`Error ${err.status}: ${message}`);
      });
  }
  
  export default weatherOpen;