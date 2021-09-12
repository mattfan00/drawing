const sunMoonImage = document.querySelector(".sun-moon-img");
const starsContainer = document.querySelector(".stars");
const cloudsContainer = document.querySelector(".clouds");
let starImages = document.querySelectorAll(".stars img");
let cloudImages = document.querySelectorAll(".clouds img");
const body = document.querySelector("body");

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let sunrise, sunset, current, status;
let currSunMoon = 1;
let currStars = [];
let currClouds = [];

async function init(location) {
  let lat, lng;
  if (location == "nyc") {
    lat = 40.712784;
    lng = -74.005943;
  } else if (location == "hk") {
    lat = 22.2793278;
    lng = 114.1628131;
  } else if (location == "dubai") {
    lat = 25.2653471;
    lng = 55.2924914;
  }

  const result = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`);
  const data = await result.json();
  sunrise = new Date(data.results.sunrise);
  sunset = new Date(data.results.sunset);
  current = new Date();

  if (current.getTime() >= sunset.getTime() ) {
    status = "night";
  } else if (current.getTime() >= sunrise.getTime() && current.getTime() < sunset.getTime()) {
    status = "day";
  } else if (current.getTime() < sunrise.getTime()) {
    status = "night";
  }

  drawLocation();

  if (status == "day") {
    sunMoonImage.src = "../shared_media/sun_1.svg";
    cloudsContainer.style.display = "block";

    sunMoonAnimation("sun");
    cloudsAnimation();
  } else {
    body.classList.add("night");
    sunMoonImage.src = "../shared_media/moon_1.svg";
    starsContainer.style.display = "block";

    sunMoonAnimation("moon");
    starsAnimation();
  }

  body.style.display = "block";
}

let sunMoonLastTime = (new Date()).getTime();

function sunMoonAnimation(status) {
  const currTime = (new Date()).getTime();

  if (currTime - sunMoonLastTime >= 250) {
    sunMoonImage.src = `../shared_media/${status}_${currSunMoon}.svg`;
    currSunMoon = currSunMoon == 1 ? 2 : 1;

    sunMoonLastTime = currTime;
  }

  requestAnimationFrame(() => sunMoonAnimation(status));
}

let starsLastTime = (new Date()).getTime();

function starsAnimation() {
  const currTime = (new Date()).getTime();

  if (currTime - starsLastTime >= 250) {
    for (let i = 0; i < currStars.length; i++) {
      starImages[i].src = `../shared_media/star_1_${currStars[i]}.svg`;
      currStars[i] = currStars[i] == 1 ? 2 : 1;
    }

    starsLastTime = currTime;
  }

  requestAnimationFrame(starsAnimation);
}

function cloudsAnimation() {
  for (let i = 0; i < cloudImages.length; i++) {
    currClouds[i].x = currClouds[i].x + (currClouds[i].pace * currClouds[i].direction);
    cloudImages[i].style.left = `${currClouds[i].x}px`;

    if (currClouds[i].direction == 1 && currClouds[i].x > windowWidth) {
      currClouds[i].x = 0 - 200;
    } else if (currClouds[i].direction == -1 && currClouds[i].x < 0 - 200) {
      currClouds[i].x = windowWidth;
    }
  }

  requestAnimationFrame(cloudsAnimation);
}

window.addEventListener("click", (e) => {
  if (status == "night") {
    let starImg = document.createElement("img");
    starImg.src = "../shared_media/star_1_1.svg";

    starImg.style.top = `${e.clientY - 40}px`;
    starImg.style.left = `${e.clientX - 40}px`;

    starsContainer.appendChild(starImg);

    starImages = document.querySelectorAll(".stars img");
    currStars.push(1);
  } else if (status == "day") {
    let cloudImg = document.createElement("img");
    cloudImg.src = `../shared_media/cloud_${Math.floor(Math.random() * 2 + 1)}.svg`;

    cloudImg.style.top = `${e.clientY - 50}px`;
    cloudImg.style.left = `${0 - 200}px`;

    cloudsContainer.appendChild(cloudImg);

    cloudImages = document.querySelectorAll(".clouds img");

    const direction = Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    currClouds.push({
      x: direction == 1 ? 0 - 200 : windowWidth,
      y: e.clientY - 50,
      pace: Math.floor(Math.random() * 3 + 1),
      direction
    });
  }
})

window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
})