let data = 0;
let dataGeocode = 0;
let adress = "";
const time = document.getElementById("time");
const latlon = document.getElementById("latLon");
const suggest = document.getElementById("suggest");
const submit = document.getElementById("submit");
const cityname = document.getElementById("city");

const mainTemp = document.getElementById("mainTemp");
const weaterDescription = document.getElementById("weaterDescription");
const weaterFeels = document.getElementById("weaterFeels");
const weaterWind = document.getElementById("weaterWind");
const weaterHumidity = document.getElementById("weaterHumidity");

let refreshButton = document.getElementById("refreshButton");
const dayOfWeekArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// функция показывае карты по координатам
let options = {
  key: "2EGrjPuE7U6PsUORrn5L5Bn9gpeuU1kC", // Required: API key
  verbose: true, // Put additional console output
  lat: 50.4, // Optional: Initial state of the map
  lon: 23.83,
  zoom: 11,
};

windyInit(options, (windyAPI) => {
  // Initialize Windy API
  const { map } = windyAPI; // windyAPI is ready, and contain 'map', 'store', 'picker' and other usefull stuff
  map.panTo([Lat, Lng]);
});

// функция показывает время
// добавить изменение языка по требованию изменения языка

function showTime() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const day = today.getDate();
  const mouth = today.getMonth();
  const hour = today.getHours();
  const min = today.getMinutes();
  // вывод времени
  time.innerHTML = `${dayOfWeekArr[dayOfWeek]} ${day} ${
    monthArr[mouth]
  } ${hour}:${addZero(min)}`;
  // вызываем каждую секунду менять
  setTimeout(showTime, 1000);
}
//функция добовления нуля во времени
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}
showTime();

// функция запроса разрешения на получение HTML5 Геолокация браузера
// переспросить правильно ли выбран город, если нет попросить ввести город
navigator.geolocation.getCurrentPosition(function (position) {
  latlon.innerHTML = `
  <div>latitude: ${position.coords.latitude.toFixed(3)}</div>
  <div>longitude: ${position.coords.longitude.toFixed(3)}</div>`;
  options.lat = position.coords.latitude.toFixed(3);
  options.lon = position.coords.longitude.toFixed(3);
  windyInit(options);
});

// функция изменения картинки фона
async function getLinkToImage() {
  const url = `https://api.unsplash.com/photos/random?client_id=yghwryjYRXVTaNnEhzou83Z8zgbsJhiN9a7meyPMRhk`;
  const res = await fetch(url);
  data = await res.json();
  document.body.style.background = `linear-gradient(rgba(8, 15, 26, 0.59) 0%,
    rgba(17, 17, 46, 0.46) 100% ) center center / cover fixed, url(${data.urls.full})
      no-repeat center center fixed`;}
refreshButton.addEventListener("click", () => {
  getLinkToImage();
});

// функция получения координат по введенному городу
submit.addEventListener("click", () => {
  getLatLng(document.getElementById("suggest").value);
});

async function getLatLng(adress) {
  const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=3f4fd225-4360-4411-ad3c-832c9cd61d81&geocode=${adress}&results=1`;
  const res = await fetch(url);
  const data = await res.json();
  cityname.innerText = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;
  let LatLng = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ");
  let Lat = LatLng[1];
  let Lng = LatLng[0];
  //console.log(`Lat = ${Lat} & Long = ${Lng}`);
  latlon.innerHTML = `<div>latitude: ${Lat}</div><div>longitude: ${Lng}</div>`;
  options.lat = Lat;
  options.lon = Lng;
  windyInit(options);
  getLinkToImage();
  getforecast(Lat, Lng);
  getweather(Lat, Lng);
}

// Функция запроса погоды
async function getweather(Lat, Lng) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lng}&APPID=57d69ed5ac76f17bc142f4c83b5cedda`;
  const res = await fetch(url);
  const data = await res.json();
  weaterDescription.innerHTML = `${data.weather[0].main}`;
  weaterFeels.innerHTML = converToGradus(data.main.feels_like);
  weaterHumidity.innerHTML = `${data.main.humidity} \%`;
  weaterWind.innerHTML = `${data.wind.speed} M/s`;
  mainTemp.innerHTML = converToGradus(data.main.temp);
}
async function getforecast(Lat, Lng) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${Lat}&lon=${Lng}&APPID=57d69ed5ac76f17bc142f4c83b5cedda`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}

// функция перевода из градусов K в F или С
function converToGradus(grad) {
  return Math.round(grad - 273, 15);
}

// функция изменения языка из language.json

// функция показывания картинки погоды (дождь, ветер, солнечно) напротив температуры
