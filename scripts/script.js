let divResultados = document.getElementById("resultados");
let divCampoClima = document.getElementById("campoClima");
let divClimaAll = document.getElementById("climaAll");
let imgClima = document.getElementById("imgClima");
let error = document.getElementById("error");
let backModal = document.getElementById("backModal");

function getCidades() {
  let campoClima = document.getElementById("campoClima").value;

  fetch(
    `https://www.meteoblue.com/pt/server/search/query3?query=${campoClima}&apikey=73WC9IzLXcoNfuPw.`
  ).then(async (res) => {
    if (!res.ok) {
      throw new Error("ocorreu um erro, já estamos verificando!");
    }

    let data = await res.json();
    let results = data.results;
    if (results.length === 0) {
      error.classList.remove("hidden");
      divResultados.innerText = "";
      divResultados.classList.add("hidden");
    } else {
      error.classList.add("hidden");
    }

    backModal.classList.remove("hidden");
    divResultados.innerHTML = "";
    results.forEach((element) => {
      let divResults = document.createElement("div");

      divResults.innerHTML = `   
      <button class="flex w-[100%] gap-[5px] my-[5px] py-[10px] outline-none hover:bg-[#F2F2F2] pl-[10px] rounded-[3px]"  onclick="getClimas('${element.name}', ${element.lat}, ${element.lon}, '${element.admin1}', '${element.country}')">
        <p>${element.name}, </p>
        <p>${element.admin1} - </p>
        <p>${element.country}</p>
       </button>
  
        `;

      divResultados.appendChild(divResults);
      divResultados.classList.remove("hidden");
    });
  });
}

document.getElementById("campoClima").addEventListener("keyup", getCidades);

function getClimas(nomeCidade, latitude, longitude, nomeEstado, pais) {
  fetch(
    `https://my.meteoblue.com/packages/current?&name=${nomeCidade}&windspeed=kmh&lat=${latitude}&lon=${longitude}&apikey=73WC9IzLXcoNfuPw`
  ).then(async (res) => {
    if (!res.ok) {
      throw new Error("Não foi possível encontrar a cidade");
    }

    let infosClima = await res.json();
    let data_current = infosClima.data_current;
    let isDayLight = data_current.isdaylight;
    let pictocode = data_current.pictocode;
    let temperature = data_current.temperature.toFixed();
    let time = new Date(data_current.time);
    let infoDay = time.getDay();
    let infoHour = time.getHours();
    let infoMinutes = time.getMinutes();
    let hours = infoHour < 10 ? `0${infoHour}` : infoHour;
    let minutes = infoMinutes < 10 ? `0${infoMinutes}` : infoMinutes;

    let divCountry = document.getElementById("country");
    let divTemperature = document.getElementById("temperatura");

    backModal.classList.add("hidden");
    divCountry.innerText = `${nomeCidade}, ${nomeEstado} - ${pais}`;
    divTemperature.innerText = temperature;

    let prevTempo = document.getElementById("prevTempo");
    let divDiaSemana = document.getElementById("diaSemana");
    let divPictograma = document.getElementById("pictograma");
    let divIconeGraus = document.getElementById("graus");
    divIconeGraus.classList.remove('hidden')

    let isNight = isDayLight === 0;
    let imgPath = isNight ? "public/imgsNoite/" : "public/imgsDia/";
    let body = document.querySelector("body");

    if (isNight) {
      body.classList.add("bg-[#202020]");
      prevTempo.classList.add("text-[#fff]");
      divCountry.classList.add("text-[#fff]");
      divDiaSemana.classList.add("text-[#CCCCCC]");
      divPictograma.classList.add("text-[#CCCCCC]");
      divTemperature.classList.add("text-[#fff]");
      divIconeGraus.classList.add("text-[#fff]");
    } else {
      body.classList.remove("bg-[#202020]");
      body.classList.remove("bg-[#202020]");
      prevTempo.classList.remove("text-[#fff]");
      country.classList.remove("text-[#fff]");
      divDiaSemana.classList.remove("text-[#CCCCCC]");
      divPictograma.classList.remove("text-[#CCCCCC]");
      divTemperature.classList.remove("text-[#fff]");
      divIconeGraus.classList.remove("text-[#fff]");
    }

    let weatherInfo = {
      1: "Céu limpo e sem nuvens", // ok
      2: "Claro e poucas nuvens", // ok
      3: "Parcialmente nublado", // ok
      4: "Nublado", // ok
      5: "Névoa", // ok
      6: "Nublado com chuva", // ok
      7: "Misturado com chuva", // ok
      8: "Possíveis pancadas de chuva e trovoadas", // ok
      9: "Nublado com neve", // ok
      10: "Misturado com pancadas de chuva", // ok
      11: "Muito nublado com uma mistura de neve e chuva", // ok
      12: "Nublado com chuva fraca", // ok
      13: "Nublado com neve fraca", // ok
      14: "Parcialmente nublado com chuva", // ok
      15: "Maioritariamente nublado com neve", // ok
      16: "Nublado com chuva fraca",
      17: "Parcialmente nublado com neve fraca", // ok
    };

    document.getElementById("pictograma").innerText = weatherInfo[pictocode];
    imgClima.src = `${imgPath}${weatherInfo[pictocode].replace(/ /g, "")}.png`;
    let daysOfWeek = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    document.getElementById(
      "diaSemana"
    ).innerText = `${daysOfWeek[infoDay]}, ${hours}:${minutes}`;

    divResultados.classList.add("hidden");
    document.getElementById("campoClima").value = "";
  });
}

window.onload = function () {
  getClimas("São Paulo", -23.5505, -46.6333, "São Paulo", "Brasil");
  imgClima.classList.remove("hidden");
  divIconeGraus.classList.remove('hidden')
};

function closeResults() {
  document.querySelector("body").addEventListener("click", () => {
    divResultados.innerText = "";
    divResultados.classList.add("hidden");
    backModal.classList.add("hidden");
    error.classList.add("hidden");
  });
}

closeResults();
