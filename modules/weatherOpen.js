import weathercode from "./weathercode.js";
import {getLocation, showPosition, componentDidMount} from "./geoLocal.js"
import config from '../config.js'; 
import printDay from "./printDay.js";
import {showTime, dateFormat, dateFormatD} from './hour.js';

async function weatherOpen(city, country, latLon) {
  try {
   const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latLon.lat}&longitude=${latLon.lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`)
   return await response.json();
  } catch (err){
    const message = err.statusText || 'Ocurrio un error';
    alert(`Error ${err.status}: ${message}`);
  }
}
  
  export default weatherOpen;