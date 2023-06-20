export function showTime(){
    let myDate = new Date();
    let hours = myDate.getHours();
    // let minutes = myDate.getMinutes();
    // let seconds = myDate.getSeconds();
   
    //hours = (hours < 10) ? "0" + hours : hours.toString();
    // minutes = (minutes < 10) ? "0" + minutes : minutes.toString();
    // seconds = (seconds < 10) ? "0" + seconds : seconds.toString();

   // return hours + ":" + minutes + ":" + seconds;
    return hours;
}

export function dateFormat(date) {
    let arrayDateHour = date.split('T');
    let dateF = arrayDateHour[0].split('-');
    return dateF[2] + '-' + dateF[1] + '-' + dateF[0];
}

export function dateFormatD(date) {
    let dateF = date.split('-');
    return dateF[2] + '-' + dateF[1] + '-' + dateF[0];
}
