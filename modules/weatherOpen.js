import weathercode from "./weathercode.js";
import {getLocation, showPosition, componentDidMount} from "./geoLocal.js"
import config from '../config.js'; 
import printDay from "./printDay.js";
import {showTime, dateFormat, dateFormatD} from './hour.js';

async function weatherOpen(city, country, latLon) {
 //console.log(`api: KEY: ${process.env.API_KEY}`);
    // const latLon = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=5&appid=${config.API_KEY}`)
    //   .then((response) => (response.ok ? response.json() : Promise.reject(response)))
    //   .then((data) => {
    //     console.log(data[0].lat);
    //     const latLon = { lat: data[0].lat, lon: data[0].lon };
    //     return latLon;
    //   })
    //   .catch((err) => {
    //     const message = err.statusText || 'Ocurrio un error';
    //     alert(`Error ${err.status}: ${message}`);
    //   });
   
// componentDidMount().then(latLon);
//      console.log(latLon);
    //const latLon = showPosition();
 //   console.log( getLocation() );
//  const success = (position) =>{
//   //console.log(position);
//     latLon = {lat: position.coords.latitude, lon: position.coords.longitude};;
//  }
    

//   const locat =  navigator.geolocation.getCurrentPosition(success);
   console.log(latLon);
    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latLon.lat}&longitude=${latLon.lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data) => {   
        const divToday = document.createElement("div");
        divToday.classList.add("containerDay");
        console.log(data.hourly.temperature_2m[showTime()]);
        const divSvg = document.createElement("div");
        const svg = document.createElement("img");
        const body = document.querySelector(".container");
        divSvg.classList.add("container-svg");
        let ci = document.createElement("h2");
        ci.textContent = city;
        divToday.appendChild(ci);
        console.log(data.hourly.weathercode[showTime()]);
        console.log(
          `Weathercode: ${weathercode.get(data.hourly.weathercode[showTime()])}`
        );
        if(showTime() >= 6 && showTime() < 18) {
          svg.src = weathercode.get(data.hourly.weathercode[showTime()]);
        } else {
          svg.src = weathercode.get(`${data.hourly.weathercode[showTime()]}N`);
        }
        svg.setAttribute("alt", "forecast");
        svg.setAttribute("width", 100);
        svg.setAttribute("height", 100);
        divSvg.appendChild(svg);
        divToday.appendChild(divSvg);
        //const p = document.querySelector("p");
        //  p.textContent = `Latitud: ${data.latitude}`;
        //const long = document.createElement("p");
        //  long.textContent = `Longitud: ${data.longitude}`;
        //  body.appendChild(long);
        const temp = document.createElement("p");
        temp.textContent = `Temperature: ${
          data.hourly.temperature_2m[showTime()]
        }°`;
        divToday.appendChild(temp);
        // let hourDom = document.createElement('p');
        // console.log(showTime());
        // hourDom.textContent = showTime();
        // body.appendChild(hourDom);
        let maxMinTemp = document.createElement("p");
        maxMinTemp.textContent = `${data.daily.temperature_2m_max[0]}° \u00A0 \u00A0  ${data.daily.temperature_2m_min[0]}°`;
        divToday.appendChild(maxMinTemp);
        // let latLon = {lat: data[0].lat, lon: data[0].lon};
        const date = document.createElement("p");
  
        // fecha.textContent = `Fecha de hoy: ${data.hourly.time[showTime()]}`;
        date.textContent = `${dateFormat(data.hourly.time[showTime()])}`;
        divToday.appendChild(date);
        body.appendChild(divToday);
      for (let ii = 1; ii < 5; ii++) {
        printDay(city, dateFormatD(data.daily.time[ii]), data.daily.temperature_2m_max[ii], data.daily.temperature_2m_min[ii], weathercode.get(data.daily.weathercode[ii]));
      }
      })
      .catch((err) => {
        const message = err.statusText || 'Ocurrio un error';
        alert(`Error ${err.status}: ${message}`);
      });
  }
  
  export default weatherOpen;