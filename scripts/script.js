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

    document.getElementById(
      "country"
    ).innerText = `${nomeCidade}, ${nomeEstado} - ${pais}`;
    document.getElementById("temperatura").innerText = temperature;
    document.getElementById("graus").classList.remove("hidden");

    if (isDayLight === 0 && pictocode === 1) {
      document.getElementById("pictograma").innerText =
        "Céu limpo e sem nuvens";
      document.getElementById("imgClima").src = "public/claroSemNuvens.png";
    }
    if (isDayLight === 0 && pictocode === 2) {
      document.getElementById("pictograma").innerText = "Claro e poucas nuvens";
      document.getElementById("imgClima").src =
        "public/claro e poucas nuvens.png";
    }
    if (isDayLight === 0 && pictocode === 3) {
      document.getElementById("pictograma").innerText = "Parcialmente nublado";
      document.getElementById("imgClima").src =
        "public/parcialmente nublado.png";
    }
    if (isDayLight === 0 && pictocode === 4) {
      document.getElementById("pictograma").innerText = "Nublado";
      document.getElementById("imgClima").src = "public/nublado.png";
    }
    if (isDayLight === 0 && pictocode === 5) {
      document.getElementById("pictograma").innerText = "Névoa";
      document.getElementById("imgClima").src = "public/nublado.png";
    }
    if (isDayLight === 0 && pictocode === 6) {
      document.getElementById("pictograma").innerText = "Nublado com chuva";
      document.getElementById("imgClima").src = "public/nubladoComChuva.png";
    }
    if (isDayLight === 0 && pictocode === 7) {
      document.getElementById("pictograma").innerText = "Misturado com chuva";
      document.getElementById("imgClima").src = "public/MisturadoComchuvas.png";
    }
    if (isDayLight === 0 && pictocode === 8) {
      document.getElementById("pictograma").innerText =
        "Possíveis pancadas de chuva e trovoadas";
      document.getElementById("imgClima").src =
        "public/possiveisPancadasDeChuvaEtrovoadas.png";
    }
    if (isDayLight === 0 && pictocode === 9) {
      document.getElementById("pictograma").innerText = "Nublado com neve";
      document.getElementById("imgClima").src = "public/nubladoComNeve.png";
    }
    if (isDayLight === 0 && pictocode === 10) {
      document.getElementById("pictograma").innerText =
        "Misturado com pancadas de chuva";
      document.getElementById("imgClima").src =
        "public/misturadoComPancadasDeNeve.png";
    }
    if (isDayLight === 0 && pictocode === 11) {
      document.getElementById("pictograma").innerText =
        "Muito nublado com uma mistura de neve e chuva";
      document.getElementById("imgClima").src =
        "public/muitoNubladoComMisturaDeNeveEchuva.png";
    }
    if (isDayLight === 0 && pictocode === 12) {
      document.getElementById("pictograma").innerText =
        "Nublado com chuva fraca";
      document.getElementById("imgClima").src = "public/nubladoComChuva.png";
    }
    if (isDayLight === 0 && pictocode === 13) {
      document.getElementById("pictograma").innerText =
        "Nublado com neve fraca";
      document.getElementById("imgClima").src = "public/nubladoComNeve.png.";
    }
    if (isDayLight === 0 && pictocode === 14) {
      document.getElementById("pictograma").innerText =
        "Paricalmente nublado com chuva";
      document.getElementById("imgClima").src =
        "public/parcialmenteNubladoComChuva.png";
    }
    if (isDayLight === 0 && pictocode === 15) {
      document.getElementById("pictograma").innerText =
        "Maioritariamente nublado com neve";
      document.getElementById("imgClima").src =
        "public/maioritariamenteNubladoComNeve.png";
    }
    if (isDayLight === 0 && pictocode === 16) {
      document.getElementById("pictograma").innerText =
        "Nublado nublado com chuva fraca";
      document.getElementById("imgClima").src = "public/nubladoComChuva.png";
    }
    if (isDayLight === 0 && pictocode === 17) {
      document.getElementById("pictograma").innerText =
        "Parcialmente nublado com neve fraca";
      document.getElementById("imgClima").src =
        "public/parcialmenteNubladoComNeveFraca.png";
    }

    switch (infoDay) {
      case 0:
        document.getElementById(
          "diaSemana"
        ).innerText = `Domingo, ${hours}:${minutes}`;
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

    divResultados.classList.add("hidden");
    document.getElementById("campoClima").value = "";
  });
}

window.onload = function () {
  getClimas("São Paulo", -23.5505, -46.6333, "São Paulo", "Brasil");
  imgClima.classList.remove('hidden')
};

function closeResults() {
  document.querySelector("body").addEventListener("click", () => {
    divResultados.innerText = "";
    divResultados.classList.add("hidden");
  });
}

closeResults();
