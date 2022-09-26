const search = document.querySelector('.search');
const searchOverlay = document.querySelector('.overlay.searcher');
const searchField = document.querySelector('.search-field');
const close = document.querySelector('.close');
const formInput = document.querySelector('.form input');
const formBtn = document.querySelector('.form button');
const mainForm = document.querySelector('form');
const welcome = document.querySelector('.welcome-content');
const mainContent = document.querySelector('.content');

const preloader = document.querySelectorAll('.preloader');

// Search functionality

search.addEventListener('click', () => {
  // alert('started')
  searchOverlay.style.display = 'flex';
})

close.addEventListener('click', () => {
  searchOverlay.style.display = 'none';
})

function showPreloader() {
  preloader.forEach((pre) => {
    if (window.getComputedStyle(pre).display == 'none') {
      pre.style.display = 'block'
    } else {
      pre.style.display = 'none';
    }
  })
}

// Date functionality

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const date = new Date();
const day = date.getDay();
const month = date.getMonth();
const year = date.getFullYear();

const today = document.querySelector('.day');
today.textContent = days[day];
const thisMonth = document.querySelector('.month');
thisMonth.textContent = `${months[month]}, ${year}`;

// Geolocation confirmation

const confirmOverLay = document.querySelector('.confirmer');
const confirmBox = document.querySelector('.confirmation');

const permit = document.querySelector('.permit');
const reject = document.querySelector('.reject');
const apikey = "o9I8UmxOErWHZmnRw2WQi755tEID5ZZD";
const endPoint = 'http://dataservice.accuweather.com/locations/v1/topcities/50?apikey=o9I8UmxOErWHZmnRw2WQi755tEID5ZZD';
const searchByLoc = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?";


const condition = document.querySelector('.desc-text');
const temp = document.querySelector('.temp');
const locus = document.querySelector('.country-name');

// const confirmBox = document.querySelector('.confirmer');

setTimeout(() => {
  confirmOverLay.style.display = 'flex';
}, 7000);

reject.addEventListener('click', () => confirmOverLay.style.display = 'none');

permit.addEventListener('click', function () {
  // alert('working')
  navigator.geolocation.getCurrentPosition((position) => {
    setTimeout(() => {
      confirmBox.style.display = 'none';
      // preloader.style.display = 'block';
      showPreloader();
    }, 500);

    let long = position.coords.longitude;
    let lat = position.coords.latitude;


    setTimeout(() => {
      async function fetchy() {
        const resp = await fetch(`${searchByLoc}apikey=${apikey}&q=${lat}%2C${long}`);
        const data = await resp.json();
        //console.log(data)
        //console.log(data.Country.EnglishName);
        //console.log(data.Key);
        const countryName = data.Country.EnglishName;
        const locationKey = data.Key;
        const locationDetails = { countryName, locationKey };

        getWeather(locationKey, countryName)
      }

      fetchy()
    }, 2000);



  })
})


async function getWeather(locationKey, countryName) {
  const searchByKey = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`
  const resp = await fetch(`${searchByKey}?apikey=${apikey}`);
  const data = await resp.json();
  //console.log(data);
  //console.log(data[0].Temperature)
  const temperature = `${data[0].Temperature.Metric.Value}`;
  const weatherCondition = data[0].WeatherText;
  if (window.getComputedStyle(welcome).display == 'block') {
    welcome.style.display = 'none'
  }  else {
    welcome.style.display = 'block'
  }
  confirmOverLay.style.display = 'none';
  welcome.style.display = 'none';
  mainContent.style.display = 'block';
  condition.textContent = weatherCondition;
  temp.textContent = Math.round(temperature);
  locus.textContent = countryName;
}



mainForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const searchValue = formInput.value;
  searchField.style.display = 'none';
  showPreloader();
  setTimeout(() => {
    searchOverlay.style.display = 'none';
    fetchCountry(searchValue);
    showPreloader();
  }, 3000);
  
})

async function fetchCountry(countryName) {
  const resp = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${countryName}`);
  const data = await resp.json();
  //console.log(data);
  const countryNameOne = `${data[0].EnglishName}, ${data[0].Country.EnglishName}` || countryName;
  const locationKeyOne = data[0].Key;

  getWeather(locationKeyOne, countryNameOne);
}

fetchCountry(searchValue);
searchOverlay.style.display = 'none';
formInput.value = '';