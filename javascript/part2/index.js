let atom = document.querySelector(".atom")

const radius = 200
let speed = 2

let x = radius
let y = 0
let r = radius
let flip = false


let animation = requestAnimationFrame(circle)

function circle() {
  animation = requestAnimationFrame(circle)

  if (x < -radius || x > radius) {
    // cancelAnimationFrame(animation)
    flip = !flip
  }

  if (!flip) {
    x -= speed
  } else {
    x += speed
  }

  atom.style.left = `${x}px`
  atom.style.top = `${flip ? "-" : ""}${Math.sqrt(r*r - x*x)}px`
}
