
const getCity = async () => {
    let base = 'http://dataservice.accuweather.com/locations/v1/topcities/50?apikey=o9I8UmxOErWHZmnRw2WQi755tEID5ZZD';
    const response = await fetch(base);
    const data = await response.json();
    return data;
}

getCity()
    .then(data => console.log(data[33].LocalizedName))
    .catch(err => console.log(err));



function initialize() {
    let search = document.querySelector('.search');
    new google.maps.places.Autocomplete(search);
  }
//google.maps.event.addDomListener(window, 'load', initialize);





// get city
  
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

  const cities = [];
  fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));
  
  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      // here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex)
    });
  }
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
        </li>
      `;
    }).join('');
    suggestions.innerHTML = html;
  }
  
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');
  
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);



  // voice recognition

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  let p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p);

  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

      const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
      p.textContent = poopScript;

      if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
      }
  });

  recognition.addEventListener('end', recognition.start);

  recognition.start();



