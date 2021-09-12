const locationLogoImage = document.querySelector(".location-logo-img");
const dubaiImage = document.querySelector(".dubai-img");

function drawLocation() {
  if (status == "day") {
    // forces the image not to cache and redraw every time
    locationLogoImage.src = "./media/dubai_logo.svg?cache=" + Date.now();
    dubaiImage.src = "./media/dubai_skyline.svg?cache=" + Date.now();
  } else {
    // forces the image not to cache and redraw every time
    locationLogoImage.src = "./media/dubai_logo_night.svg?cache=" + Date.now();
    dubaiImage.src = "./media/dubai_skyline_night.svg?cache=" + Date.now();
  }
}

window.addEventListener("load", () => {
  init("dubai")
})