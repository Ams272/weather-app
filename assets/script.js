'use strict'

// date script

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const date = new Date();
const today = date.getDay();
const thisMonth = date.getMonth();
const year = date.getFullYear();

const day = document.querySelector('.date__day');
const month = document.querySelector('.date__year');

day.textContent = days[today];
month.textContent = `${months[thisMonth]}, ${year}`;

// overlay and search functionality

const search = document.querySelector('.toolbar span');
const overlay = document.querySelector('.overlay');
const input = document.querySelector('input');
const close = document.querySelector('section .close');

search.addEventListener('click', () => {
  overlay.classList.toggle('hidden');
  close.addEventListener('click', () => {
    overlay.classList.add('hidden');
  })
  input.focus();
})




// Geolocation functionality


/**
 * So, boss. Here's the thing with this my Geolocation.
 * I attached an eventListener to the window so that when it loads,
 * we are asked for permission to use location.
 * But, apparently — maybe there's a reason I'm yet to understand — it doesn't work that way
 * (especially with the window).
 * However, if I add the event listener to another object like a button and it is clicked,
 * we get what we're looking for.
 * 
 * Try uncommenting FIRST TRIAL, and commenting SECOND TRIAL to see what I mean.
 * 
 * NOTE: Make sure your location is always turned off before trial.
 */






// FIRST TRIAL

window.addEventListener('load', () => {
  navigator.geolocation.getCurrentPosition((position) => {
    alert(position.coords.latitude);
  });
  
});
  // I also tried using a setTimeout, but still the same thing — Doesn't work.
  
  // setTimeout(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     alert(position.coords.latitude);
  //   })
  // }, 3000)
  

/**
 * But then I discovered that the FIRST TRIAL will only work
 * if you had location turned on before loading the page
 * which is not what we want.
 */
 

// SECOND TRIAL

// this is the submit button i was asking for help with 

// document.querySelector('button').addEventListener('click', () => {
//   navigator.geolocation.getCurrentPosition((position) => {
//     alert(position);
//   })
// });
