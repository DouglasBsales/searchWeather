let divResultados = document.getElementById("resultados");
let divCampoClima = document.getElementById("campoClima");

function getCidades() {
  let campoClima = document.getElementById("campoClima").value;

  fetch(
    `https://www.meteoblue.com/pt/server/search/query3?query=${campoClima}&apikey=73WC9IzLXcoNfuPw.`
  ).then(async (res) => {
    if (!res.ok) {
      throw new Error("Não foi possível encontrar a cidade");
    }

    let data = await res.json();
    console.log(data);
    let results = data.results;
    results.map((info) => {
      let latitude = info.lat;
      let longitude = info.lon;
      let als = info.asl;
      console.log(latitude);
      console.log(longitude);
      console.log(als);
    });

    divResultados.innerHTML = "";

    results.forEach((element) => {
      let divResults = document.createElement("div");

      divResults.innerHTML = `   
     <button class="flex gap-[5px] py-[10px] outline-none">
        <p>${element.name}, </p>
        <p>${element.country} - </p>
        <p>${element.admin1}</p>
     </button>
        <hr>
        `;

      divResultados.appendChild(divResults);
    });
    ClearContent();
    divResultados.style.display = "block";
  });
}

document.getElementById("campoClima").addEventListener("keyup", getCidades);

function ClearContent() {
  let divCampoClima = document.getElementById("campoClima").value;

  if (divCampoClima.length === 0) {
    divResultados.innerHTML = "";
    divResultados.style.display = "none";
  }
}

function getClimas() {
  let campoClima = document.getElementById("campoClima").value;
  fetch(
    "https://my.meteoblue.com/packages/basic-1h_basic-day?apikey=73WC9IzLXcoNfuPw&lat=-8.05389&lon=-34.8811&asl=8"
  ).then(async (res) => {
    if (!res.ok) {
      throw new Error("Não foi possível encontrar a cidade");
    }

    let dataClima = await res.json();
    console.log(dataClima);
  });
}
getClimas();
