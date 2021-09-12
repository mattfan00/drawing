const locationLogoImage = document.querySelector(".location-logo-img");
const nycImage = document.querySelector(".nyc-img");

function drawLocation() {
  if (status == "day") {
    // forces the image not to cache and redraw every time
    locationLogoImage.src = "./media/nyc_logo.svg?cache=" + Date.now();
    nycImage.src = "./media/nyc_skyline.svg?cache=" + Date.now();
  } else {
    // forces the image not to cache and redraw every time
    locationLogoImage.src = "./media/nyc_logo_night.svg?cache=" + Date.now();
    nycImage.src = "./media/nyc_skyline_night.svg?cache=" + Date.now();
  }
}

window.addEventListener("load", () => {
  init("nyc")
})