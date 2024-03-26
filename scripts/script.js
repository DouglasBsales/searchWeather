let divResultados = document.getElementById("resultados");
let divCampoClima = document.getElementById("campoClima");
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
    console.log(results);
    if (results.length === 0) {
      error.innerHTML = "Não foi possível encontrar sua cidade";
    } else {
      error.innerHTML = "";
    }

    divResultados.innerHTML = "";

    results.forEach((element) => {
      let divResults = document.createElement("div");

      divResults.innerHTML = `   
     <button class="flex w-[100%] gap-[5px] my-[5px] py-[10px] outline-none hover:bg-[#F2F2F2] pl-[10px] rounded-[3px]" onclick="getClimas('${element.name}', ${element.lat}, ${element.lon})">
        <p>${element.name}, </p>
        <p>${element.admin1} - </p>
        <p>${element.country}</p>
     </button>
        `;

      divResultados.appendChild(divResults);
    });
    ClearContent();
    divResultados.style.display = "block";
  });
}

document.getElementById("campoClima").addEventListener("keyup", getCidades);

function getClimas(nomeCidade, latitude, longitude) {
  fetch(
    `https://my.meteoblue.com/packages/basic-1h_basic-day?&name=${nomeCidade}&apikey=73WC9IzLXcoNfuPw&lat=${latitude}&lon=${longitude}`
  ).then(async (res) => {
    if (!res.ok) {
      throw new Error("Não foi possível encontrar a cidade");
    }

    let infosClima = await res.json();
    console.log(infosClima);

    let dataAtual = new Date();
    let horaAtual = dataAtual.getHours();
    let minutoAtual = dataAtual.getMinutes();
    console.log(dataAtual);
    console.log(horaAtual);
    console.log(minutoAtual);

    let tempMin = infosClima.data_day.temperature_min;
    let tempMax = infosClima.data_day.temperature_max;
    let tempAtual = infosClima.data_1h.temperature;
    let tempFh = infosClima.data_1h.felttemperature;
    let veloVento = infosClima.data_1h.windspeed;
    let umidadeRelativa = infosClima.data_1h.relativehumidity;
    console.log(tempMin);
    console.log(tempAtual);
    console.log(tempMax);
    console.log(tempFh);
    console.log(veloVento);
    console.log(umidadeRelativa);
    divResultados.innerHTML = "";
    document.getElementById("campoClima").value = "";
  });
}

function ClearContent() {
  let divCampoClima = document.getElementById("campoClima").value;

  if (divCampoClima.length === 0) {
    divResultados.innerHTML = "";
    divResultados.style.display = "none";
  }
}
