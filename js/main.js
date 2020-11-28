let data = 0;
let dataGeocode = 0;
let adress = "";
const time = document.getElementById("time");
const latlon = document.getElementById("latLon");
const suggest = document.getElementById("suggest");
const submit = document.getElementById("submit"); 

let refreshButton = document.getElementById("refreshButton");
const dayOfWeekArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   

// функция показывает время 
// добавить изменение языка по требованию изменения языка

function showTime() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const day = today.getDate()
  const mouth = today.getMonth();
  const hour = today.getHours();
  const min = today.getMinutes();
  // вывод времени
  time.innerHTML = `${dayOfWeekArr[dayOfWeek]} ${day} ${monthArr[mouth]} ${hour}:${addZero(min)}`;
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
navigator.geolocation.getCurrentPosition(
  function(position) {
    latlon.innerHTML = `<div>latitude: ${position.coords.latitude.toFixed(3)}</div><div>longitude: ${position.coords.longitude.toFixed(3)}</div>`;
}
);


// функция изменения картинки фона
async function getLinkToImage() {
  const proxy = 'https://cors-anywhere.herokuapp.com/'; //удалить на гитхабе
  const url = `${proxy}https://api.unsplash.com/photos/random?client_id=yghwryjYRXVTaNnEhzou83Z8zgbsJhiN9a7meyPMRhk`;
  const res = await fetch(url);
  data = await res.json();
  console.log(data);
  console.log(data.urls.regular)
  document.body.style.background =`linear-gradient(rgba(8, 15, 26, 0.59) 0%,
    rgba(17, 17, 46, 0.46) 100% ) center center / cover fixed, url(${data.urls.regular})
      no-repeat fixed`;//center center
}
refreshButton.addEventListener("click", () => { getLinkToImage();}) 


// функция получения координат по введенному городу
submit.addEventListener("click", () => {getLatLng(document.getElementById("suggest").value)}) 

async function getLatLng(adress) {
  const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=3f4fd225-4360-4411-ad3c-832c9cd61d81&geocode=${adress}&results=1`;
  const res = await fetch(url);
  const data = await res.json();
  let LatLng = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ");
  let Lat = LatLng[1];
  let Lng = LatLng[0];
  console.log(`Lat = ${Lat} & Long = ${Lng}`)
  latlon.innerHTML = `<div>latitude: ${Lat}</div><div>longitude: ${Lng}</div>`;
  L.latLng( {lat: Lat, lng: Lng} );
 }

// функция изменения языка из language.json


// функция показывания картинки погоды (дождь, ветер, солнечно) напротив температуры


// функция показывае карты по координатам


// функция перевода из градусов С в F