function printDay(city, day, dateF, tempMax, tempMin, weathercode) {
    const divToday = document.createElement("div");
    divToday.classList.add("containerDay");
    const divSvg = document.createElement("div");
    const svg = document.createElement("img");
    const body = document.querySelector(".container");
    divSvg.classList.add("container-svg");
    let ci = document.createElement("h2");
    const place = document.createElement("h2");
    ci.textContent = day;
    place.textContent = city;
    divToday.appendChild(place);
    divToday.appendChild(ci);
    svg.src = weathercode;
    svg.setAttribute("alt", "forecast");
    svg.setAttribute("width", 100);
    svg.setAttribute("height", 100);
    divSvg.appendChild(svg);
    divToday.appendChild(divSvg);
    let maxMinTemp = document.createElement("p");
    maxMinTemp.textContent = `${tempMax}°C \u00A0 \u00A0  ${tempMin}°C`;
    divToday.appendChild(maxMinTemp);
    const date = document.createElement("p");
    date.textContent = `${dateF}`;
    divToday.appendChild(date);
    body.appendChild(divToday);
  }
  
  export default printDay;
  