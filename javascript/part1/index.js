let atom = document.querySelector(".atom")
let toggle = document.querySelector(".toggle-follow")

let browserWidth
let browserHeight
let xRatio
let yRatio
let follow = true

function initialize() {
  browserWidth = window.innerWidth
  browserHeight = window.innerHeight

  xRatio = browserWidth / 360
  yRatio = browserHeight / 360
}

function handleMouseMove(e) {
  let xPos = e.clientX
  let yPos = e.clientY

  if (follow) {
    updateRotation(xPos / xRatio, yPos / yRatio)
  }
}

function updateRotation(rotateX, rotateY) {
  atom.style.transform = `rotateX(${rotateY}deg) rotateY(${rotateX}deg)`
}

function toggleFollow() {
  follow = !follow
  toggle.textContent = `${follow ? "Stop" : "Start"} following cursor`
}

window.addEventListener("load", initialize)
window.addEventListener("resize", initialize)
window.addEventListener("mousemove", handleMouseMove)

toggle.addEventListener("click", toggleFollow)
