const cloudy = "./img/cloudy-day-1.svg";
async function weatherNew(city, country) {
  await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}%2C%20${country}?unitGroup=metric&key=HGTJ369AQYZUENUM2UACJ8VLH&contentType=json`
  )
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response)
    )
    .then((data) => {
      const divSvg = document.createElement("div");
      const svg = document.createElement("img");
      const body = document.querySelector(".container");
      divSvg.classList.add("container-svg");
      svg.src = cloudy;
      svg.setAttribute("alt", "cd1");
      svg.setAttribute("width", 100);
      svg.setAttribute("height", 100);
      divSvg.appendChild(svg);
      body.appendChild(divSvg);
      console.log(data.days[0].temp);
      const p = document.querySelector("p");
      p.textContent = `Latitud: ${data.latitude}`;
      const long = document.createElement("p");
      long.textContent = `Longitud: ${data.longitude}`;
      body.appendChild(long);
      const temp = document.createElement("p");
      temp.textContent = `Temperatura: ${data.days[0].temp}`;
      body.appendChild(temp);
      // let latLon = {lat: data[0].lat, lon: data[0].lon};
      const fecha = document.createElement("p");
      fecha.textContent = `Fecha de hoy: ${data.days[0].datetime}`;
      body.appendChild(fecha);
      //    return latLon;
    })
    .catch((err) => {
      const message = err.statusText || "Ocurrio un error en newWeather";
      alert(`Error ${err.status}: ${message}`);
    });
  // console.log(latLon);
}

export default weatherNew;
