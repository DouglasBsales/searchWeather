let divResultados = document.getElementById("resultados");
let divCampoClima = document.getElementById("campoClima");
let divClimaAll = document.getElementById("climaAll");
let imgClima = document.getElementById("imgClima");
let error = document.getElementById("error");

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
      error.innerText = "Não foi possível encontrar sua cidade";
      closeResults();
    } else {
      error.innerText = "";
    }

    divResultados.innerHTML = "";
    console.log(results);
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
    `https://my.meteoblue.com/packages/current?&name=${nomeCidade}&lat=${latitude}&lon=${longitude}&apikey=73WC9IzLXcoNfuPw`
  ).then(async (res) => {
    if (!res.ok) {
      throw new Error("Não foi possível encontrar a cidade");
    }

    let infosClima = await res.json();
    console.log(infosClima);

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

    document.getElementById(
      "country"
    ).innerText = `${nomeCidade}, ${nomeEstado} - ${pais}`;
    document.getElementById("temperatura").innerText = temperature;
    document.getElementById("graus").classList.remove("hidden");

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
      17: "Parcialmente nublado com neve fraca",
    };

    let isNight = isDayLight === 0;
    let imgPath = isNight ? "public/imgsNoite/" : "public/";

    document.getElementById("pictograma").innerText = weatherInfo[pictocode];
    document.getElementById("imgClima").src = `${imgPath}${weatherInfo[
      pictocode
    ].replace(/ /g, "")}.png`;

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
};

function closeResults() {
  document.querySelector("body").addEventListener("click", () => {
    divResultados.innerText = "";
    divResultados.classList.add("hidden");
  });
}

closeResults();
