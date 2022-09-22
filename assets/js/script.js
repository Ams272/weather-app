const search = document.querySelector('.search');
const searchOverlay = document.querySelector('.overlay.searcher')
const close = document.querySelector('.close');
const formInput = document.querySelector('.form input');
const formBtn = document.querySelector('.form button');
const reject = document.querySelector('.reject');
const allow = document.querySelector('.allow');
const content = document.querySelector('.content');

// Search functionality

search.addEventListener('click', () => {
  searchOverlay.style.display = 'flex';
})

close.addEventListener('click', () => {
  searchOverlay.style.display = 'none';
})

// Date functionality

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const date =  new Date();
const day = date.getDay();
const month = date.getMonth();
const year =  date.getFullYear();

const today = document.querySelector('.day');
today.textContent = days[day];
const thisMonth = document.querySelector('.month');
thisMonth.textContent = `${months[month]}, ${year}`;

// Geolocation confirmation

const confirmBox = document.querySelector('.confirmer');

setTimeout(() => {
  confirmBox.style.display = 'flex';
}, 6000);

reject.addEventListener('click', ()=> confirmBox.style.display = 'none');

// const allowBtn = document.querySelector('.allowBtn');
const endPoint = 'http://dataservice.accuweather.com/locations/v1/topcities/50?apikey=o9I8UmxOErWHZmnRw2WQi755tEID5ZZD';
// const dont = document.querySelector('.dont');
// const reject = document.querySelector('.reject');
// const allow = document.querySelector('.allow');
// const barUp = document.querySelector('.bar-up');
// const preloader = document.querySelector('.preloader');
const apikey = "o9I8UmxOErWHZmnRw2WQi755tEID5ZZD";
const searchByLoc = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?";


// search.addEventListener('click', () => {
//     overlay.classList.remove('hidden');
//     formInput.forEach(inputField => inputField.focus());
// });

// clos.addEventListener('click', () => {
//     overlay.classList.add('hidden');
// });

  formBtn.addEventListener('click', () => {
  // async function fetchyTwo() {
  //   const resp = await fetch()
  // }

    //console.log('good');
    //console.log(formInput.value);
  
    let searchValue = formInput.value;
  //console.log(searchValue);

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

})



// const confirm = document.querySelector('.confirmation');

// setTimeout(() => {
//   confirm.classList.remove('hidden')
// }, 5000);


const condition = document.querySelector('.desc-text');
const temp = document.querySelector('.temp');
const locus = document.querySelector('.country-name');


allow.addEventListener('click', function() {
  navigator.geolocation.getCurrentPosition((position) => {
    confirmBox.style.display = 'none';
    //content.style.display = 'block';

    let long = position.coords.longitude;
    let lat = position.coords.latitude;

    setTimeout(() => {
      async function fetchy() {
        const resp = await fetch(`${searchByLoc}apikey=${apikey}&q=${lat}%2C${long}`);
        const data = await resp.json();
        //console.log(data.EnglishName);
        //console.log(data.Country.EnglishName);
        //console.log(data.Key);
        const countryName = `${data.EnglishName}, ${data.Country.EnglishName}`;
        const locationKey = data.Key;
        const locationDetails = {countryName, locationKey};
        
        
          
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
  condition.textContent = weatherCondition;
  temp.textContent = Math.round(temperature);
  locus.textContent = countryName;
  content.style.display = 'block';
}

// dont.addEventListener('click', () => {
//   confirm.style.display = 'none';
//   allow.style.display = 'none';
//   reject.style.display = 'block'
// })


// async function fetchy() {
//   const resp = await fetch(endPoint);
//   const data = await resp.json();
//   console.log(data)
// }

// fetchy()