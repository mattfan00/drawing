let canvas = document.querySelector(".background");
let context = canvas.getContext("2d");
let image = document.querySelector("img");

let camera, scene, renderer ;
let pizzaMesh, crustMesh, peppMesh1, peppMesh2, peppMesh3;
let wholeDrawing;

let pxScale = window.devicePixelRatio;

let width, height;

function init() {
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  canvas.width = width * pxScale;
  canvas.height = height * pxScale;

  context.scale(pxScale, pxScale);
  context.scale(pxScale, pxScale);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000); // FOV, aspect ration, near, far
  camera.position.set(0, 50, 700); // x, y (move up), back out on the z-axis
  scene.add(camera); // add camera to scene

  let light = new THREE.DirectionalLight(0x404040, 6); // color, intensity
  light.position.set(0, 1, 1); // location on x, y, and z
  scene.add(light);

  createPizza();
  createCrust();
  createPepperonies();

  wholeDrawing = new THREE.Group();
  wholeDrawing.add(pizzaMesh);
  wholeDrawing.add(crustMesh);
  wholeDrawing.add(peppMesh1);
  wholeDrawing.add(peppMesh2);
  wholeDrawing.add(peppMesh3);

  scene.add(wholeDrawing);

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

function createPizza() {
  const pizzaShape = new THREE.Shape();
  pizzaShape.moveTo(0, 0);
  pizzaShape.lineTo(55, 120);
  pizzaShape.lineTo(-55, 120);

  const pizzaGeometry = new THREE.ExtrudeGeometry(pizzaShape, {
    depth: 4,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1
  });

  const material = new  THREE.MeshStandardMaterial({color: 0xf4d243});
  pizzaMesh = new THREE.Mesh(pizzaGeometry, material);
}

function createCrust() {
  const crustShape = new THREE.Shape();
  crustShape.moveTo(-57, 120);
  crustShape.lineTo(57, 120);
  crustShape.lineTo(57, 130);
  crustShape.lineTo(-57, 130);

  const crustGeometry = new THREE.ExtrudeGeometry(crustShape, {
    depth: 8,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1
  });

  const material = new  THREE.MeshStandardMaterial({color: 0xefccaa});
  crustMesh = new THREE.Mesh(crustGeometry, material);
}

function createPepperonies() {
  const pepperoniShape = new THREE.Shape();
  pepperoniShape.ellipse(
    0,  0,            // x, Y
    7, 7,           // xRadius, yRadius
    0,  2 * Math.PI,  // StartAngle, EndAngle
  );

  const pepperoniGeometry = new THREE.ExtrudeGeometry(pepperoniShape, {
    depth: 2,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1
  });

  material = new  THREE.MeshStandardMaterial({color: 0xff0000});

  peppMesh1 = new THREE.Mesh(pepperoniGeometry, material);
  peppMesh1.position.set(25, 100, 4);

  peppMesh2 = new THREE.Mesh(pepperoniGeometry, material); // combine geometry and material
  peppMesh2.position.set(-20, 90, 4);

  peppMesh3 = new THREE.Mesh(pepperoniGeometry, material); // combine geometry and material
  peppMesh3.position.set(5, 60, 4);
}

function drawBackground() {
  const imgScale = 15;
  context.drawImage(image, 0, 0, width / (imgScale * pxScale), width / (imgScale * pxScale));

  let imageData = context.getImageData(0, 0, width / imgScale, height / imgScale);
  let data = imageData.data;

  context.clearRect(0, 0, width, height);

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      let index = (x + y * imageData.width) * 4;

      let r = data[index + 0];
      let g = data[index + 1];
      let b = data[index + 2];

      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.save();
      context.translate(imgScale / 2, imgScale / 2);

      context.beginPath();
      const xTemp = x * imgScale;
      const yTemp = y * imgScale;
      context.moveTo(xTemp, yTemp + 7);
      context.lineTo(xTemp + 5, yTemp - 7);
      context.lineTo(xTemp - 5, yTemp - 7);
      context.fill();

      context.fill();
      context.restore();
    }
  }
}

function animate() {
  requestAnimationFrame(animate);

  wholeDrawing.rotation.y += 0.02;

  renderer.render(scene, camera);
}

window.addEventListener("load", () => {
  init();
  animate();
  drawBackground();
})

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  canvas.width = width * pxScale;
  canvas.height = height * pxScale;

  context.scale(pxScale, pxScale);
  context.scale(pxScale, pxScale);

  drawBackground();

  camera.aspect = (window.innerWidth / window.innerHeight);
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
})