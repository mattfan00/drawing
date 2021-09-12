const canvas1 = document.querySelector("#c1");
const context1 = canvas1.getContext("2d");

const canvas2 = document.querySelector("#c2");
const context2 = canvas2.getContext("2d");

const video = document.querySelector("video");

let width;
let height;

let lines;

let pxScale = window.devicePixelRatio;

function setup() {
  width = canvas1.width;
  height = canvas1.height;

  video.play()

  canvas1.style.width = width + 'px';
  canvas1.style.height = height + 'px';
  canvas2.style.width = width + 'px';
  canvas2.style.height = height + 'px';

  canvas1.width = width * pxScale;
  canvas1.height = height * pxScale;
  canvas2.width = width * pxScale;
  canvas2.height = height * pxScale;

  context1.scale(pxScale, pxScale);
  context2.scale(pxScale, pxScale);

  lines = [
    { color: "white", start: -500, pos: -200, ypos: 20, length: 400, speed: 13, end: width + 400 },
    { color: "red", start: -300, pos: -300, ypos: 90, length: 200, speed: 12, end: width + 200 },
    { color: "red", start: -300, pos: -300, ypos: 170, length: 250, speed: 10, end: width + 200 },
    { color: "white", start: -500, pos: -200, ypos: 220, length: 300, speed: 15, end: width + 100 },
    { color: "red", start: -200, pos: -300, ypos: 300, length: 150, speed: 14, end: width + 200 },
    { color: "white", start: -700, pos: -200, ypos: 350, length: 350, speed: 11, end: width + 100 },
  ];
  draw();
}

function draw() {
  drawSpeedLines();
  drawRacing();

  requestAnimationFrame(draw);
}

function drawSpeedLines() {
  context1.clearRect(0, 0, width, height)

  for (let i = 0; i < lines.length; i++) {
    context1.beginPath();
    context1.strokeStyle = lines[i].color;
    context1.lineWidth= 5;
    context1.moveTo(lines[i].pos, lines[i].ypos);
    context1.lineTo(lines[i].length + lines[i].pos, lines[i].ypos);
    context1.closePath();
    context1.stroke();

    lines[i].pos += lines[i].speed;

    if (lines[i].pos > lines[i].end) {
      lines[i].pos = lines[i].start;
    }
  }
}

let imgScale = 10;

function drawRacing() {
  context2.drawImage(video, 0, 0, 600 / (imgScale * pxScale), 400 / (imgScale * pxScale));

  let imageData = context2.getImageData(0, 0, width / imgScale, height / imgScale);
  let data = imageData.data;

  context2.clearRect(0, 0, width, height);

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      let index = (x + y * imageData.width) * 4;

      let r = data[index + 0];
      let g = data[index + 1];
      let b = data[index + 2];

      context2.fillStyle = `hsl(0, 0%, ${r * .2 + g * .25 + b * .07}%)`;
      context2.save();
      context2.translate(imgScale / 2, imgScale / 2);

      context2.beginPath();
      context2.fillRect(x * imgScale, y * imgScale, imgScale, imgScale / 2);

      context2.fill();
      context2.restore();
    }
  }
}

window.addEventListener("load", () => {
  setup();
});