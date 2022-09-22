const search = document.querySelector('.search');
const searchOverlay = document.querySelector('.overlay.searcher')
const close = document.querySelector('.close');
const formInput = document.querySelectorAll('form input');
const formBtn = document.querySelectorAll('form button');

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

const confirmOverLay = document.querySelector('.confirmer');
const confirmBox = document.querySelector('.confirmation');
const preloader = document.querySelector('.preloader');
const permit = document.querySelector('.permit');
const reject = document.querySelector('.reject');
const apikey = "o9I8UmxOErWHZmnRw2WQi755tEID5ZZD";
const searchByLoc = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?";
const welcome = document.querySelector('.welcome-content');
const mainContent = document.querySelector('.content');

const condition = document.querySelector('.desc-text');
const temp = document.querySelector('.temp');
const locus = document.querySelector('.country-name');


setTimeout(() => {
  confirmOverLay.style.display = 'flex';
}, 7000);

permit.addEventListener('click', function() {
  // alert('working')
  navigator.geolocation.getCurrentPosition((position) => {
    setTimeout(() => {
      confirmBox.style.display = 'none';
      preloader.style.display = 'block';
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
  confirmOverLay.style.display = 'none';
  welcome.style.display = 'none';
  mainContent.style.display = 'block';
  condition.textContent = weatherCondition;
  temp.textContent = Math.round(temperature);
  locus.textContent = countryName;
}


// const allowBtn = document.querySelector('.allowBtn');
// const endPoint = 'http://dataservice.accuweather.com/locations/v1/topcities/50?apikey=o9I8UmxOErWHZmnRw2WQi755tEID5ZZD';
// const dont = document.querySelector('.dont');
// const reject = document.querySelector('.reject');
// const allow = document.querySelector('.allow');
// const barUp = document.querySelector('.bar-up');
// const preloader = document.querySelector('.preloader');
// const apikey = "o9I8UmxOErWHZmnRw2WQi755tEID5ZZD";
// const searchByLoc = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?";


// search.addEventListener('click', () => {
//     overlay.classList.remove('hidden');
//     mainInputField.forEach(inputField => inputField.focus());
// });

// clos.addEventListener('click', () => {
//     overlay.classList.add('hidden');
// });

// mainInputField.forEach(inputField => inputField.addEventListener('change', ()=>{
//   mainBtn.forEach(btn => btn.addEventListener('click', () => {
//   // async function fetchyTwo() {
//   //   const resp = await fetch()
//   // }
//   document.querySelector('.search-div').style.display = 'none';
//   preloader.style.display = 'block';

//   console.log('good');
//     console.log(inputField.value);
  
//     searchValue = inputField.value;
//   //console.log(searchValue);

//   async function fetchCountry(countryName) {
//     const resp = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${countryName}`);
//     const data = await resp.json();
//     console.log(data);
//     const countryNameOne = data[0].Country.EnglishName || countryName;
//     const locationKeyOne = data[0].Key;

//     getWeather(locationKeyOne, countryNameOne);
//   }
 
//   fetchCountry(searchValue);

// })
// )

// }) 
// )



// const confirm = document.querySelector('.confirmation');

// setTimeout(() => {
//   confirm.classList.remove('hidden')
// }, 5000);





// allowBtn.addEventListener('click', function() {
//   navigator.geolocation.getCurrentPosition((position) => {
//     barUp.style.display = 'none';
//     preloader.style.display = 'block';

//     let long = position.coords.longitude;
//     let lat = position.coords.latitude;

    

    

//   })
// })



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