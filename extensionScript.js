const API_KEY = '53f9e21ea76a085e7fa8813febe2aa9e';
// Pass a number, not a string.
function dateKeyToDate(dateKey) {
  let date = new Date('March 11, 1950');
  date.setDate(date.getDate() + dateKey);
  return date;
}

function kToF(degreesK) {
  return (((degreesK - 273.15) * 9) / 5) + 32;
}

function isSameDate(date1, date2) {
  return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(pos => {
    let colheaders = document.querySelectorAll("div[role='presentation'] div[role='columnheader'] h2");
    if (colheaders.length > 0) {
      fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude + '&appid=' + API_KEY)
        .then(res => res.json())
        .then(weatherAll => {
          const weather = weatherAll.list;
          const now = new Date();
          const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          console.log(weather);
          for (el of colheaders) {
            const dateKey = parseInt(el.querySelector("div[role='link']").getAttribute("data-datekey"), 10);
            const colDate = dateKeyToDate(dateKey);
            if (colDate.getTime() < startOfToday.getTime()) continue;
            const tempPoints = [];
            const iconIds = {};
            for (key of Object.keys(weather)) {
              if (isSameDate(new Date(weather[key].dt_txt), colDate)) {
                tempPoints.push(kToF(weather[key].main.temp));
                iconIds[weather[key].weather[0].icon] = !iconIds[weather[key].weather[0].icon] ? 1 : iconIds[weather[key].weather[0].icon] + 1;
              }
            }
            console.log(tempPoints);
            const avgTemp = Math.round((tempPoints.reduce((acc, temp) => acc + temp)) / tempPoints.length);
            console.log(colDate + ' ' + avgTemp);
            console.log(iconIds);
          }
        })
    }
  });
}