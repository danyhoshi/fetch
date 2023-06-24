function printDay(city, dateF, tempMax, tempMin, weathercode) {
    const divToday = document.createElement("div");
    divToday.classList.add("containerDay");
    const divSvg = document.createElement("div");
    const svg = document.createElement("img");
    const body = document.querySelector(".container");
    divSvg.classList.add("container-svg");
    let ci = document.createElement("h2");
    ci.textContent = city;
    divToday.appendChild(ci);
    svg.src = weathercode;
    console.log(`Weathercode en forecast: ${weathercode}`);
    svg.setAttribute("alt", "forecast");
    svg.setAttribute("width", 100);
    svg.setAttribute("height", 100);
    divSvg.appendChild(svg);
    divToday.appendChild(divSvg);
    let maxMinTemp = document.createElement("p");
    maxMinTemp.textContent = `${tempMax}° \u00A0 \u00A0  ${tempMin}°`;
    divToday.appendChild(maxMinTemp);
    const date = document.createElement("p");
    date.textContent = `${dateF}`;
    console.log(`Fecha: ${dateF}`);
    divToday.appendChild(date);
    body.appendChild(divToday);
  }
  
  export default printDay;
  