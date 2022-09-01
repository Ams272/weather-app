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




allowBtn.addEventListener('click', function() {
  navigator.geolocation.getCurrentPosition((position) => {
    barUp.style.display = 'none';
    preloader.style.display = 'block';
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