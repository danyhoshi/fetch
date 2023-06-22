export function getLocation() {
    if (navigator.geolocation) {
        console.log(navigator.geolocation);
      return navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
       alert("Geolocation is not supported by this browser.");
    }
  }
  
export function showPosition(position) {
    let latLon = {lat: position.coords.latitude, 
        lon: position.coords.longitude};
       // console.log(`"Latitude: "  ${position.coords.latitude}  Longitude:  ${position.coords.longitude}`);
    return  latLon;
    
  }

  export function requestPosition() {

    // additionally supplying options for fine tuning, if you want to
    var options = {
      enableHighAccuracy: true,
      timeout:    5000,   // time in millis when error callback will be invoked
      maximumAge: 0,      // max cached age of gps data, also in millis
    };
  
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        pos => { resolve(pos); }, 
        err => { reject (err); }, 
        options);
    });
  }

  export async function componentDidMount(){
    return position = await requestPosition(); 
  }

  export function getPosition(){
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(pos){
        let latLon = {lat: pos.coords.latitude, lon: pos.coords.longitude};
        resolve(latLon);
      }) 
    })
  }