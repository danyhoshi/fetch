async function weather(city, country) {
  const latLon = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=5&appid=7b24199f0989325cac1e1e147b6a5b17`)
    .then((response) => (response.ok ? response.json() : Promise.reject(response)))
    .then((data) => {
      console.log(data[0].lat);
      const p = document.querySelector('p');
      p.textContent = data[0].lat;
      const long = document.createElement('p');
      long.textContent = data[0].lon;
      const body = document.querySelector('body');
      body.appendChild(long);
      const latLon = { lat: data[0].lat, lon: data[0].lon };
      return latLon;
    })
    .catch((err) => {
      const message = err.statusText || 'Ocurrio un error';
      alert(`Error ${err.status}: ${message}`);
    });
  console.log(latLon);

  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=7b24199f0989325cac1e1e147b6a5b17&units=metric`)
    .then((response) => (response.ok ? response.json() : Promise.reject(response)))
    .then((data) => {
      console.log(data.main.temp);
      const body = document.querySelector('body');
      const temp = document.createElement('p');
      temp.textContent = data.main.temp;
      body.appendChild(temp);
    })
    .catch((err) => {
      const message = err.statusText || 'Ocurrio un error';
      alert(`Error ${err.status}: ${message}`);
    });
}

export default weather;