function printToday(city, day, dateF, tempT, tempMax, tempMin, wc) {
    const divToday = document.createElement("div");
    divToday.classList.add("containerDay");
    //console.log(data.hourly.temperature_2m[showTime()]);
    const divSvg = document.createElement("div");
    const svg = document.createElement("img");
    const body = document.querySelector(".container");
    divSvg.classList.add("container-svg");
    let ci = document.createElement("h2");
    const place = document.createElement("h2");
    place.textContent = city;
    ci.textContent = day;
    divToday.appendChild(place);
    divToday.appendChild(ci);
    svg.src = wc;
    //console.log(data.hourly.weathercode[showTime()]);
    console.log(`Weathercode: ${wc}`);
  
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
    temp.textContent = `Temperature: ${tempT}°C`;
    divToday.appendChild(temp);
    // let hourDom = document.createElement('p');
    // console.log(showTime());
    // hourDom.textContent = showTime();
    // body.appendChild(hourDom);
    let maxMinTemp = document.createElement("p");
    maxMinTemp.textContent = `${tempMax}°C \u00A0 \u00A0  ${tempMin}°C`;
    divToday.appendChild(maxMinTemp);
    // let latLon = {lat: data[0].lat, lon: data[0].lon};
    const date = document.createElement("p");
  
    // fecha.textContent = `Fecha de hoy: ${data.hourly.time[showTime()]}`;
    date.textContent = `${dateF}`;
    divToday.appendChild(date);
    body.appendChild(divToday);
  }
  export default printToday;
  