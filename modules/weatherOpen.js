import weathercode from "./weathercode.js";
import {getLocation, showPosition, componentDidMount} from "./geoLocal.js"
import config from '../config.js'; 
import printDay from "./printDay.js";
import printToday from "./printToday.js";
import {showTime, dateFormat, dateFormatD, showTimeDay} from './hour.js';

async function weatherOpen(city, country, latLon) {
 //console.log(`api: KEY: ${process.env.API_KEY}`);
 //http://api.openweathermap.org/geo/1.0/reverse?lat=10,24&lon=-67,59&appid=7b24199f0989325cac1e1e147b6a5b17
 
    const place = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latLon.lat}&lon=${latLon.lon}&appid=${config.API_KEY}`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data) => {
        console.log(data[0].name);
        console.log(data[0].state);
        console.log(data[0].country);
        const place = { name: data[0].name, state: data[0].state, country: data[0].country};
        return place;
      })
      .catch((err) => {
        const message = err.statusText || 'Ocurrio un error';
        alert(`Error ${err.status}: ${message}`);
      });
   
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
   console.log(place);
    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latLon.lat}&longitude=${latLon.lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data) => {
        let wc;
        if (showTime() >= 6 && showTime() < 18) {
          wc = weathercode.get(data.hourly.weathercode[showTime()]);
        } else {
          wc = weathercode.get(`${data.hourly.weathercode[showTime()]}N`);
        }
        console.log(`Temperatura hoy: ${data.hourly.temperature_2m[showTime()]}`);
        printToday(
          `${place.name}, ${place.country}`,
          showTimeDay(data.daily.time[0]),
          dateFormatD(data.daily.time[0]),
          data.hourly.temperature_2m[showTime()],
          data.daily.temperature_2m_max[0],
          data.daily.temperature_2m_min[0],
          wc
        );
        // const place =  document.createElement("h2");  
        // const divToday = document.createElement("div");
        // divToday.classList.add("containerDay");
        // console.log(data.hourly.temperature_2m[showTime()]);
        // const divSvg = document.createElement("div");
        // const svg = document.createElement("img");
        // const body = document.querySelector(".container");
        // divSvg.classList.add("container-svg");
        // let ci = document.createElement("h2");
        // //ci.textContent = city;
        // ci.textContent = showTimeDay(data.daily.time[0]);
        // place.textContent = `${place1.name}, ${place1.country}`;
        // divToday.appendChild(place);
        // divToday.appendChild(ci);
        // console.log(data.hourly.weathercode[showTime()]);
        // console.log(
        //   `Weathercode: ${weathercode.get(data.hourly.weathercode[showTime()])}`
        // );
        // if(showTime() >= 6 && showTime() < 18) {
        //   svg.src = weathercode.get(data.hourly.weathercode[showTime()]);
        // } else {
        //   svg.src = weathercode.get(`${data.hourly.weathercode[showTime()]}N`);
        // }
        // svg.setAttribute("alt", "forecast");
        // svg.setAttribute("width", 100);
        // svg.setAttribute("height", 100);
        // divSvg.appendChild(svg);
        // divToday.appendChild(divSvg);
        // //const p = document.querySelector("p");
        // //  p.textContent = `Latitud: ${data.latitude}`;
        // //const long = document.createElement("p");
        // //  long.textContent = `Longitud: ${data.longitude}`;
        // //  body.appendChild(long);
        // const temp = document.createElement("p");
        // temp.textContent = `Temperature: ${
        //   data.hourly.temperature_2m[showTime()]
        // }°C`;
        // divToday.appendChild(temp);
        // // let hourDom = document.createElement('p');
        // // console.log(showTime());
        // // hourDom.textContent = showTime();
        // // body.appendChild(hourDom);
        // let maxMinTemp = document.createElement("p");
        // maxMinTemp.textContent = `${data.daily.temperature_2m_max[0]}°C \u00A0 \u00A0  ${data.daily.temperature_2m_min[0]}°C`;
        // divToday.appendChild(maxMinTemp);
        // // let latLon = {lat: data[0].lat, lon: data[0].lon};
        // const date = document.createElement("p");
  
        // // fecha.textContent = `Fecha de hoy: ${data.hourly.time[showTime()]}`;
        // date.textContent = `${dateFormat(data.hourly.time[showTime()])}`;
        // divToday.appendChild(date);
        // body.appendChild(divToday);
      for (let ii = 1; ii < 5; ii++) {
        console.log(typeof data.daily.time[ii]);
        printDay(`${place.name}, ${place.country}`, showTimeDay(data.daily.time[ii]), dateFormatD(data.daily.time[ii]), data.daily.temperature_2m_max[ii], data.daily.temperature_2m_min[ii], weathercode.get(data.daily.weathercode[ii]));
      }
      })
      .catch((err) => {
        const message = err.statusText || 'Ocurrio un error';
        alert(`Error ${err.status}: ${message}`);
      });
  }
  
  export default weatherOpen;