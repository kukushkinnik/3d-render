// @ts-nocheck
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.6,
  1200
);
camera.position.z = 10;

const render = new THREE.WebGL1Renderer({ antialias: true });
render.setClearColor("#233143");
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const loader = new THREE.TextureLoader();

const boxGeometry = new THREE.BoxGeometry(2, 2, 3);
const boxMaterial = new THREE.MeshLambertMaterial({
  map: loader.load("../assets/pepe.png")
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.rotation.set(40, 0, 40);
scene.add(boxMesh);

const sphereMeshes = [];
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshLambertMaterial({
  map: loader.load("../assets/moon.jpeg")
});
for (let i = 0; i < 4; i++) {
  sphereMeshes[i] = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMeshes[i].position.set(0, 0, 0);
  scene.add(sphereMeshes[i]);
}

let theta = 0;
const dTheta = (2 * Math.PI) / 250;

const lights = [];
// const lightHelpers = [];

const lightValues = [
  { colour: 0xfffff, intensity: 5, dist: 2, x: 1, y: 0, z: 8 },
  { colour: 0xfffff, intensity: 5, dist: 12, x: -2, y: 1, z: -10 },
  { colour: 0xfffff, intensity: 5, dist: 10, x: 0, y: 10, z: 1 },
  { colour: 0xfffff, intensity: 5, dist: 12, x: 0, y: -10, z: -1 },
  { colour: 0xfffff, intensity: 5, dist: 12, x: 10, y: 3, z: 0 },
  { colour: 0xfffff, intensity: 5, dist: 12, x: -10, y: -1, z: 0 }
];
for (let i = 0; i < 6; i++) {
  lights[i] = new THREE.PointLight(
    lightValues[i]["colour"],
    lightValues[i]["intensity"],
    lightValues[i]["dist"]
  );
  lights[i].position.set(
    lightValues[i]["x"],
    lightValues[i]["y"],
    lightValues[i]["z"]
  );
  scene.add(lights[i]);

  // lightHelpers[i] = new THREE.PointLightHelper(lights[i], 0.7);
  // scene.add(lightHelpers[i]);
}

const controls = new TrackballControls(camera, render.domElement);
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;

const rendering = function () {
  requestAnimationFrame(rendering);
  scene.rotation.z -= 0.005;
  scene.rotation.x -= 0.01;
  controls.update();
  theta += dTheta;
  const trigs = [
    {
      x: Math.cos(theta * 1.05),
      y: Math.sin(theta * 1.05),
      z: Math.cos(theta * 1.05),
      r: 5
    },
    {
      x: Math.cos(theta * 0.8),
      y: Math.sin(theta * 0.8),
      z: Math.sin(theta * 0.8),
      r: 6
    },
    {
      x: Math.cos(theta * 1.25),
      y: Math.cos(theta * 1.25),
      z: Math.sin(theta * 1.25),
      r: 6.5
    },
    {
      x: Math.sin(theta * 0.6),
      y: Math.cos(theta * 0.6),
      z: Math.sin(theta * 0),
      r: 6.75
    }
  ];

  for (let i = 0; i < 4; i++) {
    sphereMeshes[i].position.x = trigs[i]["r"] * trigs[i]["x"];
    sphereMeshes[i].position.y = trigs[i]["r"] * trigs[i]["y"];
    sphereMeshes[i].position.z = trigs[i]["r"] * trigs[i]["z"];
  }
  render.render(scene, camera);
};

rendering();

window.addEventListener("resize", () => {
  render.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
