// Selecting the form elemensts using the queryselector
const weatherForm = document.querySelector('form');
const inputElement = document.querySelector('#input');

// Adding an eventListener and printing to the web app
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = inputElement.value;
  document.getElementById('message1').innerHTML = 'Loading...';
  document.getElementById('message2').innerHTML = '';

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        document.getElementById('message1').innerHTML = data.error;
      } else {
        document.getElementById('message1').innerHTML = data.location;
        document.getElementById('message2').innerHTML = data.forecast;
      }
    });
  });
});