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
    `https://my.meteoblue.com/packages/current?&name=${nomeCidade}&lat=${latitude}&lon=${longitude}&apikey=73WC9IzLXcoNfuPw 
    `
  ).then(async (res) => {
    if (!res.ok) {
      throw new Error("Não foi possível encontrar a cidade");
    }

    let infosClima = await res.json();
    console.log(infosClima);
    let isDayLight = infosClima.data_current.isdaylight; // dia 1 noite 0
    let pictocode = infosClima.data_current.pictocode; // condicoes climaticas
    let temperature = infosClima.data_current.temperature.toFixed(); // temperatura
    let time = new Date(infosClima.data_current.time); // data e horário
    let infoDay = time.getDay(); // dia da semana
    let infoHour = time.getHours(); // hora atualizada
    let hours = infoHour < 10 ? `0${infoHour}` : infoHour;
    let infoMinutes = time.getMinutes(); // minutos
    let minutes = infoMinutes < 10 ? `0${infoMinutes}` : infoMinutes; // minutos atualizados

    console.log(isDayLight);
    console.log(pictocode); // condicoes climaticas
    console.log(temperature); // temperatura
    console.log(time); // data e horário
    console.log(infoHour);
    console.log(minutes);
    console.log(infoDay); // dia da semana

    document.getElementById("temperatura").innerText = temperature;
    document.getElementById("graus").classList.remove("hidden");

    switch (pictocode) {
      case 1:
        document.getElementById("pictograma").innerText =
          "Céu ensolarado e sem nuvens";
        break;
      case 2:
        document.getElementById("pictograma").innerText =
          "Ensolarado e poucas nuvens";
        break;
      case 3:
        document.getElementById("pictograma").innerText =
          "Parcialmente nublado";
        break;
      case 4:
        document.getElementById("pictograma").innerText = "Nublado";
        break;
      case 5:
        document.getElementById("pictograma").innerText = "Névoa";
        break;
      case 6:
        document.getElementById("pictograma").innerText = "Nublado com chuva";
        break;
      case 7:
        document.getElementById("pictograma").innerText =
          "Misturado com chuvas";
        break;
      case 8:
        document.getElementById("pictograma").innerText =
          "Possíveis pancadas de chuva e trovoadas";
        break;
      case 9:
        document.getElementById("pictograma").innerText = "Nublado com neve";
        break;
      case 10:
        document.getElementById("pictograma").innerText =
          "Misturado com pancadas de neve";
        break;
      case 11:
        document.getElementById("pictograma").innerText =
          "Muito nublado com uma mistura de neve e chuva";
        break;
      case 12:
        document.getElementById("pictograma").innerText =
          "Nublado com chuva fraca";
        break;
      case 13:
        document.getElementById("pictograma").innerText =
          "Nublado com neve fraca";
        break;
      case 14:
        document.getElementById("pictograma").innerText =
          "Parcialmente nublado com chuva";
        break;
      case 15:
        document.getElementById("pictograma").innerText =
          "Maioritariamente nublado com neve";
        break;
      case 16:
        document.getElementById("pictograma").innerText =
          "Muito nublado com chuva fraca";
        break;
      case 17:
        document.getElementById("pictograma").innerText =
          "Parcialmente nublado com neve fraca";
        break;
    }

    switch (infoDay) {
      case 0:
        document.getElementById(
          "diaSemana"
        ).innerText = `Domingohours}:${minutes}`;
        break;
      case 1:
        document.getElementById(
          "diaSemana"
        ).innerText = `Segunda-feira, ${hours}:${minutes}`;
        break;
      case 2:
        document.getElementById(
          "diaSemana"
        ).innerText = `Terça-feira, ${hours}:${minutes}`;
        break;
      case 3:
        document.getElementById(
          "diaSemana"
        ).innerText = `Quarta-feira, ${hours}:${minutes}`;
        break;
      case 4:
        document.getElementById(
          "diaSemana"
        ).innerText = `Quinta-feira, ${hours}:${minutes}`;
        break;
      case 5:
        document.getElementById(
          "diaSemana"
        ).innerText = `Sexta-feira, ${hours}:${minutes}`;
        break;
      case 6:
        document.getElementById(
          "diaSemana"
        ).innerText = `Sábado, ${hours}:${minutes}`;
        break;
    }

    divResultados.innerHTML = "";
    document.getElementById("campoClima").value = "";
    document.getElementById('descobriClima').classList.add('hidden')
  });
}

function ClearContent() {
  let divCampoClima = document.getElementById("campoClima").value;

  if (divCampoClima.length === 0) {
    divResultados.innerHTML = "";
    divResultados.style.display = "none";
  }
}
