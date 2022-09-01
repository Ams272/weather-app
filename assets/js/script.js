const search = document.querySelector('.search');
const overlay = document.querySelector('.overlay.hidden');
const clos = document.querySelector('.close');

search.addEventListener('click', () => {
    overlay.classList.remove('hidden');
});

clos.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const date =  new Date();
const day = date.getDay();
const month = date.getMonth();
const year =  date.getFullYear();

const today = document.querySelector('.day');
today.textContent = days[day];
const thisMonth = document.querySelector('.month-year');
thisMonth.textContent = `${months[month]}, ${year}`;

const confirm = document.querySelector('.confirmation');

setTimeout(() => {
  confirm.classList.remove('hidden')
}, 5000);


const allowBtn = document.querySelector('.allowBtn');
const endPoint = 'http://dataservice.accuweather.com/locations/v1/topcities/50?apikey=o9I8UmxOErWHZmnRw2WQi755tEID5ZZD';
const dont = document.querySelector('.dont');
const reject = document.querySelector('.reject');
const allow = document.querySelector('.allow');
const barUp = document.querySelector('.bar-up');
const preloader = document.querySelector('.preloader');
const apikey = "o9I8UmxOErWHZmnRw2WQi755tEID5ZZD";
const searchByLoc = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?";



allowBtn.addEventListener('click', function() {
  navigator.geolocation.getCurrentPosition((position) => {
    barUp.style.display = 'none';
    preloader.style.display = 'block';

    let long = position.coords.longitude;
    let lat = position.coords.latitude;

    async function fetchy() {
        const resp = await fetch(`${searchByLoc}apikey=${apikey}&q=${lat}%2C${long}`);
        const data = await resp.json();
        //console.log(data)
        //console.log(data.Country.EnglishName);
        //console.log(data.Key);
        const countryName = data.Country.EnglishName;
        const locationKey = data.Key;
        const locationDetails = {countryName, locationKey};
        
        async function getWeather() {
            const searchByKey = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`
             const resp = await fetch(`${searchByKey}?apikey=${apikey}`);
             const data = await resp.json();
             //console.log(data);
             //console.log(data[0].Temperature);
             const temperature = `${data[0].Temperature.Metric.Value} degrees`;
             const weatherCondition = data[0].WeatherText;
             perm.style.display = 'none'
             alert(weatherCondition);
             alert(temperature);
           }
          
           getWeather()
       }
      
       fetchy()

  })
})

dont.addEventListener('click', () => {
  confirm.style.display = 'none';
  allow.style.display = 'none';
  reject.style.display = 'block'
})


// async function fetchy() {
//   const resp = await fetch(endPoint);
//   const data = await resp.json();
//   console.log(data)
// }

// fetchy()