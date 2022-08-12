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