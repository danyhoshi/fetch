import { getPosition } from "./modules/geoLocal.js";
import weathercode from "./modules/weathercode.js";
import weatherOpen from "./modules/weatherOpen.js";
import printDay from "./modules/printDay.js";
import {showTime, dateFormatD} from './modules/hour.js';
import printToday from "./modules/printToday.js";
const city = "Maracay";
const country = "ve";

getPosition().then((latLon) => {
  console.log(`desde la promesa lat: ${latLon.lat} y lon: ${latLon.lon}`);
  weatherOpen(city, country, latLon).then((data) => {   
    let wc;
    if(showTime() >= 6 && showTime() < 18) {
      wc = weathercode.get(data.hourly.weathercode[showTime()]);
    } else {
      wc = weathercode.get(`${data.hourly.weathercode[showTime()]}N`);
    }
    console.log(`Temperatura hoy: ${data.hourly.temperature_2m[showTime()]}`)
   printToday(city, dateFormatD(data.daily.time[0]), data.hourly.temperature_2m[showTime()], data.daily.temperature_2m_max[0], data.daily.temperature_2m_min[0], wc);
  for (let ii = 1; ii < 5; ii++) {
    printDay(city, dateFormatD(data.daily.time[ii]), data.daily.temperature_2m_max[ii], data.daily.temperature_2m_min[ii], weathercode.get(data.daily.weathercode[ii]));
  };
});
 }).catch(err => {
    console.log(err);
 });

// console.log(weathercode.get(3));
//  let cloudy1 = document.createElement("img");
//  let cloudy2 = document.createElement("img");
//  let cloudy3 = document.createElement("img");
//  let cloudy4 = document.createElement("img");
//  let day = document.createElement("img");
//  let rainy1 = document.createElement("img");
//  let rainy2 = document.createElement("img");
//  let rainy3 = document.createElement("img");
//  let rainy4 = document.createElement("img");
//  let rainy5 = document.createElement("img");
//  let rainy6 = document.createElement("img");
//  cloudy1.src = "./img/cloudy-day-1.svg";
//  cloudy2.src = "./img/cloudy-day-2.svg";
//  cloudy3.src = "./img/cloudy-day-3.svg";
//  cloudy4.src = "./img/cloudy.svg";
//  day.src = "./img/day.svg";
//  rainy1.src = "./img/rainy-1.svg";
//  rainy2.src = "./img/rainy-2.svg";
//  rainy3.src = "./img/rainy-3.svg";
//  rainy4.src = "./img/rainy-4.svg";
//  rainy5.src = "./img/rainy-5.svg";
//  rainy6.src = "./img/rainy-6.svg";
//   let body = document.querySelector(".container");
//  body.appendChild(cloudy1);
//  body.appendChild(cloudy2);
//  body.appendChild(cloudy3);
//  body.appendChild(cloudy4);
//   body.appendChild(rainy1);
//  body.appendChild(rainy2);
//   body.appendChild(rainy3);
//   body.appendChild(day);
//    body.appendChild(rainy4);
//   body.appendChild(rainy5);
//   body.appendChild(rainy6);

// let myDate = new Date();
//     console.log('en showTime');
//    let hours = myDate.getHours();
//    let minutes = myDate.getMinutes();
//    let seconds = myDate.getSeconds();
   
    // if (hours < 10) hours = 0 + hours;
    
    // if (minutes < 10) minutes = "0" + minutes;
    
    // if (seconds < 10) seconds = "0" + seconds;
    // console.log(hours + ":" + minutes + ":" + seconds);