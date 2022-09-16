const wrapper = document.querySelector('.wrapper'),
inputPart = wrapper.querySelector('.input-part'),
infoTxt = inputPart.querySelector('.info-txt'),
inputField = inputPart.querySelector('input'),
locationBtn = inputPart.querySelector('button');

wIcon =document.querySelector('.weather-part img');

arrowBack = wrapper.querySelector('header i'); 

let api;
let apiKey = '57eecb89474492befa7f0129ce345724';

inputField.addEventListener('keyup', e =>{
  // if user pressed enter btn input value is not empty
  if(e.key == 'Enter' && inputField.value != '') {
    requesrApi(inputField.value);
  }
});

locationBtn.addEventListener('click', () => {
  if(navigator.geolocation) { // if browser support geolocatoin api
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }else {
    alert('your browser not support geolocation api');
  }
});

function onSuccess(position) {
  // console.log(position);
  const {latitude, longitude} = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  infoTxt.classList.remove('error');
  fetchData();
}

function onError(error) {
  infoTxt.innerHTML = error.message;
  infoTxt.classList.add('error');
}

function requesrApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}

function fetchData() {
  infoTxt.innerHTML = 'Getting weather details...';
  infoTxt.classList.add('pending');
  // get api response
  fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
  infoTxt.classList.replace('pending', 'error')
  if(info.cod == "404") {
    infoTxt.innerHTML = `${inputField.value} isn't a valid city name  `;
  }else {
    // let's get required properties value
    const city = info.name;
    const country = info.sys.country;
    const {description, id} = info.weather[0];
    const {feels_like, humidity, temp } = info.main;

    if(id == 800) {
      wIcon.src = 'icons/clear.svg';
    }else if(id >= 200 && id <= 232) {
      wIcon.src = 'icons/strom.svg';
    }else if(id >= 600 && id <= 622){
      wIcon.src = 'icons/snow.svg';
    }else if(id >= 701 && id <= 781){
      wIcon.src = 'icons/haze.svg';
    }else if(id >= 801 && id <= 804){
      wIcon.src = 'icons/cloud.svg';
    }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
      wIcon.src = 'icons/rain.svg';
    }

    wrapper.querySelector('.temp .numb').innerText = Math.floor(temp);
    wrapper.querySelector('.weather').innerText = description;
    wrapper.querySelector('.location span').innerText = `${city}, ${country}`;
    wrapper.querySelector('.temp .numb2').innerText = Math.floor(feels_like);
    wrapper.querySelector('.humidity span').innerText = `${humidity}%`;

    infoTxt.classList.remove('pending', 'error')
    wrapper.classList.add('active');
    console.log(info);

  }
}

arrowBack.addEventListener('click', ()=> {
  wrapper.classList.remove('active');
})







