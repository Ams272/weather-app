// variable declarations
const voice = document.querySelector('.mic');
// const formInput = document.querySelector('.form input');
// const formBtn = document.querySelector('.form button');
const suggestions = document.querySelector('.suggestions');
//const suggestionList = suggestions.forEach(suggestion => suggestion.querySelectorAll('suggestions li'));
const form = document.querySelectorAll('.form');
let cities = [];
//const apikey = "o9I8UmxOErWHZmnRw2WQi755tEID5ZZD";

// get cities
const getCity = async () => {
    let base = 'http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=o9I8UmxOErWHZmnRw2WQi755tEID5ZZD';
    const response = await fetch(base);
    const data = await response.json();
    return data;
}

getCity()
    .then(data => data.map(cityName => {
        cities.push(
          {
            name: cityName.LocalizedName,
            key: cityName.Key
          }
          );
    }))
    .catch(err => console.log(err));

//console.log(cities);
  
  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      // here we need to figure out if the city matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex);
    });
  }

  function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    let html = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
      return `<li>${cityName}</li>`;
    }).join('');
    suggestions.innerHTML = html;

    suggestions.addEventListener('click', (e) => {
      //console.log(e.target.textContent);
      formInput.value = e.target.textContent;

      // clear and redo the lists
      suggestions.innerHTML = `<ul class="suggestions">
      <li>Filter for a city</li>
      <li>or any specific location</li>
    </ul>`;

      //formInput.value = '';

    })
    //formInput.value = '';

    if(formInput.value === ''){
      suggestions.innerHTML = `<ul class="suggestions">
      <li>Filter for a city</li>
      <li>or any specific location</li>
    </ul>`;
    }
    
  }

  formInput.addEventListener('change', displayMatches);
  formInput.addEventListener('keyup', displayMatches);
  formInput.addEventListener('input', displayMatches);

  // clear and revert 




// carry out search action

// formBtn.addEventListener('click', () => {
//   //console.log('good');
//   const searchValue = formInput.value;
//   //console.log(searchValue);
// })


// suggestionList.forEach(list => list.addEventListener('click', () =>{
//   console.log(this.textContent);
//   formInput.value = list.textContent;
// }))


// voice recognition

let isRecording = false;

voice.addEventListener('mousedown', e =>{
    e.preventDefault;

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  isRecording = true;

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript.trim(','))
      .join('');
      formInput.value = transcript.replace(/[^\w\s]/gi, '');

  //recognition.addEventListener('end', recognition.end);
  if(isRecording === true){
    isRecording = false;
  }
})

  isRecording === false ? recognition.end : recognition.start();
})





//voice.addEventListener('click', recognition.start);


//how to get the stock data of Tesla in javascript?

