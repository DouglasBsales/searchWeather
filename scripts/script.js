let divPaiResultados = document.getElementById('divPaiResultados');
let divResultados = document.getElementById("resultados");
let divCampoClima = document.getElementById("campoClima");
let divClimaAll = document.getElementById("climaAll");
let imgClima = document.getElementById("imgClima");
let error = document.getElementById("error");
let backModal = document.getElementById("backModal");
let pErrorServer = document.getElementById("errorServer");
let animationCircle = document.getElementById('animationCircle');
let animationModal = document.getElementById('animationModal');
let pTempMax = document.getElementById("tempMax");
let pTempMin = document.getElementById("tempMin");

function openModalCidades(){
  divPaiResultados.classList.remove('hidden');
  backModal.classList.remove("hidden");
  animationModal.classList.remove('hidden');
  divResultados.innerHTML = '';
}
divCampoClima.addEventListener('focus', openModalCidades);

async function getCidades() {
  let campoClima = document.getElementById("campoClima").value;

  const response = await fetch(`https://www.meteoblue.com/pt/server/search/query3?query=${campoClima}&apikey=UWBsg08vMwA1ODuE`);

  let data = await response.json();
  if(data.results.length === 0){
    error.classList.remove('hidden');
    divResultados.innerHTML = '';
  } else {
    error.classList.add('hidden');
    createElements(data.results);
  }
  console.log(data.results);
  animationModal.classList.add('hidden');
}
divCampoClima.addEventListener('keyup', getCidades);

function createElements(resultados){
  divResultados.innerHTML = '';
  resultados.forEach((element) => {
    let divResults = document.createElement("div");
    divResults.innerHTML = `   
    <button class="flex w-[100%] gap-[5px] my-[5px] py-[10px] outline-none hover:bg-[#F2F2F2] pl-[10px] rounded-[3px]"  onclick="getClimas('${element.name}', ${element.lat}, ${element.lon}, '${element.admin1}', '${element.country}')">
      <p>${element.name}, </p>
      <p>${element.admin1} - </p>
      <p>${element.country}</p>
     </button>`;
    divResultados.appendChild(divResults);
  });
}

let prevTempo = document.getElementById("prevTempo");
let divDiaSemana = document.getElementById("diaSemana");
let divPictograma = document.getElementById("pictograma");
let divIconeGraus = document.getElementById("graus");
let divCountry = document.getElementById("country");
let divTemperature = document.getElementById("temperatura");
let body = document.querySelector("body");

async function getClimas(nomeCidade, latitude, longitude, nomeEstado, pais) {
  const response = await fetch(
    `https://my.meteoblue.com/packages/current_basic-day?&name=${nomeCidade}&windspeed=kmh&lat=${latitude}&lon=${longitude}&apikey=1EP8nySF9DlqArQN`);
  
  animationCircle.classList.add('hidden');

  let infosClima = await response.json();
  console.log(infosClima);
  let data_current = infosClima.data_current;
  let isDayLight = data_current.isdaylight;
  let pictocode = data_current.pictocode;
  let temperature = data_current.temperature.toFixed();
  let temperatureMin = infosClima.data_day.temperature_min;
  let temperatureMax = infosClima.data_day.temperature_max;
  let time = new Date(data_current.time);
  let infoDay = time.getDay();
  let infoHour = time.getHours();
  let infoMinutes = time.getMinutes();
  let hours = infoHour < 10 ? `0${infoHour}` : infoHour;
  let minutes = infoMinutes < 10 ? `0${infoMinutes}` : infoMinutes;
  let isNight = isDayLight === 0;

  divIconeGraus.classList.remove("hidden");
  backModal.classList.add("hidden");

  tempMaxAndTempMin(temperatureMax, temperatureMin, temperature);
  weatherInfoData(pictocode, isNight);
  days(infoDay, hours, minutes);
  Nigth(isNight);

  divCountry.innerText = `${nomeCidade}, ${nomeEstado} - ${pais}`;
  divPaiResultados.classList.add("hidden");
}

function days(infoDay, hours, minutes){
  let daysOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  document.getElementById("diaSemana").innerText = `${daysOfWeek[infoDay]}, ${hours}:${minutes}`;
}

function weatherInfoData(pictocode, isNight){
  let imgPath = isNight? "public/imgsNoite/" : "public/imgsDia/";
  let weatherInfo = {
    1: "Céu limpo e sem nuvens", 
    2: "Claro e poucas nuvens", 
    3: "Parcialmente nublado", 
    4: "Nublado", 
    5: "Névoa",
    6: "Nublado com chuva",
    7: "Misturado com chuva",
    8: "Possíveis pancadas de chuva e trovoadas", 
    9: "Nublado com neve", 
    10: "Misturado com pancadas de chuva",
    11: "Muito nublado com uma mistura de neve e chuva",
    12: "Nublado com chuva fraca", 
    13: "Nublado com neve fraca", 
    14: "Parcialmente nublado com chuva", 
    15: "Maioritariamente nublado com neve", 
    16: "Nublado com chuva fraca",
    17: "Parcialmente nublado com neve fraca"
  };

  document.getElementById("pictograma").innerText = weatherInfo[pictocode];
  imgClima.src = `${imgPath}${weatherInfo[pictocode].replace(/ /g, "")}.png`;
}

function tempMaxAndTempMin(temperatureMax, temperatureMin, temperature){
  let TempMaxNumber = 0;
  for (i = 0; i < temperatureMax.length; i++) {
    if (TempMaxNumber < temperatureMax[i]) {
      TempMaxNumber = temperatureMax[i];
    }
  }
  pTempMax.innerText = `Max: ${TempMaxNumber.toFixed(0)}°`;

  let TempMinNumber = 0;
  for (i = 0; i < temperatureMin.length; i++) {
    if (TempMinNumber < temperatureMin[i]) {
      TempMinNumber = temperatureMin[i];
    }
  }
  pTempMin.innerHTML = `Min: ${TempMinNumber.toFixed(0)}°`;
  divTemperature.innerText = temperature;
}

function Nigth(isNight){
  if (isNight) {
    body.classList.add("bg-[#202020]");
    prevTempo.classList.add("text-[#fff]");
    divCountry.classList.add("text-[#fff]");
    divDiaSemana.classList.add("text-[#CCCCCC]");
    divPictograma.classList.add("text-[#CCCCCC]");
    divTemperature.classList.add("text-[#fff]");
    divIconeGraus.classList.add("text-[#fff]");
    pTempMax.classList.add('text-[#fff]');
    pTempMin.classList.add('text-[#fff]');
  } else {
    body.classList.remove("bg-[#202020]");
    body.classList.remove("bg-[#202020]");
    prevTempo.classList.remove("text-[#fff]");
    country.classList.remove("text-[#fff]");
    divDiaSemana.classList.remove("text-[#CCCCCC]");
    divPictograma.classList.remove("text-[#CCCCCC]");
    divTemperature.classList.remove("text-[#fff]");
    divIconeGraus.classList.remove("text-[#fff]");
    pTempMax.classList.remove('text-[#fff]');
    pTempMin.classList.remove('text-[#fff]');
  }
}

window.onload = function () {
  getClimas("São Paulo", -23.5505, -46.6333, "São Paulo", "Brasil");
};

function closeResults() {
    divPaiResultados.classList.add("hidden");
    divResultados.innerHTML = '';
    animationModal.classList.add('hidden');
    backModal.classList.add("hidden");
    error.classList.add("hidden");
}

document.addEventListener('click', function(event) {
  if (!divPaiResultados.contains(event.target) && !divCampoClima.contains(event.target)) {
      closeResults();
  }
});
