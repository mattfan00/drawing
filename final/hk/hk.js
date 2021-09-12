const locationLogoImage = document.querySelector(".location-logo-img");
const hkImage = document.querySelector(".hk-img");

function drawLocation() {
  if (status == "day") {
    // forces the image not to cache and redraw every time
    locationLogoImage.src = "./media/hk_logo.svg?cache=" + Date.now();
    hkImage.src = "./media/hk_skyline.svg?cache=" + Date.now();
  } else {
    // forces the image not to cache and redraw every time
    locationLogoImage.src = "./media/hk_logo_night.svg?cache=" + Date.now();
    hkImage.src = "./media/hk_skyline_night.svg?cache=" + Date.now();
  }
}

window.addEventListener("load", () => {
  init("hk")
})