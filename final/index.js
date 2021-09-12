const body = document.querySelector("body");
let nycStatus;
let hkStatus;
let dubaiStatus;
const nycImage = document.querySelector("#nyc");
const hkImage = document.querySelector("#hk");
const dubaiImage = document.querySelector("#dubai");

function onHover(location) {
  let status;

  if (location == "nyc") {
    status = nycStatus;
  } else if (location == "hk") {
    status = hkStatus;
  } else if (location == "dubai") {
    status = dubaiStatus;
  }

  if (status == "day") {
    nycImage.src = "./nyc/media/nyc_logo_static.svg";
    hkImage.src = "./hk/media/hk_logo_static.svg";
    dubaiImage.src = "./dubai/media/dubai_logo_static.svg";
    body.classList.remove("night");
  } else {
    nycImage.src = "./nyc/media/nyc_logo_static_night.svg";
    hkImage.src = "./hk/media/hk_logo_static_night.svg";
    dubaiImage.src = "./dubai/media/dubai_logo_static_night.svg";
    body.classList.add("night");
  }
}

function getStatus(sunriseData, sunsetData) {
  const sunrise = new Date(sunriseData);
  const sunset = new Date(sunsetData);
  const current = new Date();

  if (current.getTime() >= sunset.getTime() ) {
    return "night";
  } else if (current.getTime() >= sunrise.getTime() && current.getTime() < sunset.getTime()) {
    return "day";
  } else if (current.getTime() < sunrise.getTime()) {
    return "night";
  }
}

async function init() {
  const [nycResult, hkResult, dubaiResult]= await Promise.all([
    await fetch(`https://api.sunrise-sunset.org/json?lat=40.712784&lng=-74.005943&formatted=0`),
    await fetch(`https://api.sunrise-sunset.org/json?lat=22.2793278&lng=114.1628131&formatted=0`),
    await fetch(`https://api.sunrise-sunset.org/json?lat=25.2653471&lng=55.2924914&formatted=0`),
  ]);

  const [nycData, hkData, dubaiData]= await Promise.all([
    nycResult.json(),
    hkResult.json(),
    dubaiResult.json(),
  ]);


  nycStatus = getStatus(nycData.results.sunrise, nycData.results.sunset);
  hkStatus = getStatus(hkData.results.sunrise, hkData.results.sunset);
  dubaiStatus = getStatus(dubaiData.results.sunrise, dubaiData.results.sunset);

  body.style.display = "block";
}

window.addEventListener("load", () => {
  init();
})