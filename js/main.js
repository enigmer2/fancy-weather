let data = 0;
const time = document.getElementById("time");
const latlon = document.getElementById("latLon");
let refreshButton = document.getElementById("refreshButton");
const dayOfWeekArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ////////////////////////////////////////////////////////////////////////////////ymaps.ready(initMap);
    function initMap(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [52.40, 23.83],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 13,
            controls: [ ]
        });
    }
   

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
 
}

refreshButton.addEventListener("click", () => { 
  
  
}) 
getLinkToImage();
document.body.style.background =`linear-gradient(rgba(8, 15, 26, 0.59) 0%,
    rgba(17, 17, 46, 0.46) 100% ) center center / cover fixed, url(${data.urls.regular})  no-repeat fixed`;//center center

// функция получения координат по введенному городу


// функция изменения языка из language.json


// функция показывания картинки погоды (дождь, ветер, солнечно) напротив температуры


// функция показывания карты по координатам


// функция перевода из градусов С в F