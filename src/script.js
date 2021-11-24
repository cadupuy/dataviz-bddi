// import "./style.css";

// import Experience from "./Experience/Experience.js";

// const experience = new Experience(document.querySelector("canvas.webgl"));

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as dat from "lil-gui";
import { gsap } from "gsap";
import data from "../data.json";

// Debug
const gui = new dat.GUI();
const debugObject = {};
debugObject.clearColor = "#FEBCBC";
gui.addColor(debugObject, "clearColor").onChange(() => {
  renderer.setClearColor(debugObject.clearColor);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const positions = [
  {
    x: 10,
    z: -25,
  },
  {
    x: 30,
    z: -35,
  },
  {
    x: 50,
    z: -25,
  },
  {
    x: 50,
    z: -0,
  },
  {
    x: 40,
    z: 20,
  },
  {
    x: 10,
    z: 10,
  },
  {
    x: -20,
    z: -5,
  },
  {
    x: -20,
    z: -40,
  },
  {
    x: 15,
    z: -55,
  },
  {
    x: 50,
    z: -50,
  },
  {
    x: 75,
    z: -20,
  },
  {
    x: 80,
    z: 15,
  },
  {
    x: 50,
    z: 55,
  },
  {
    x: 10,
    z: 50,
  },
  {
    x: -50,
    z: 30,
  },
  {
    x: -90,
    z: 0,
  },
  {
    x: -20,
    z: -75,
  },
  {
    x: 35,
    z: -90,
  },
  {
    x: 80,
    z: -75,
  },
  {
    x: 105,
    z: -25,
  },
];

// Points
const points = [];
for (let i = 0; i < 0; i++) {
  points.push({
    position: new THREE.Vector3(positions[i].x, 50, positions[i].z),
    element: document.querySelector(`.point-${i}`),
  });
}

// Background

var myGradient = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2, 2, 1, 1),
  new THREE.ShaderMaterial({
    uniforms: {
      uColorA: { value: new THREE.Color("#c9d9ff") },
      uColorB: { value: new THREE.Color("#f89b9e") },
    },
    vertexShader: `varying vec2 vUv;
    void main(){
      vUv = uv;
      float depth = -1.; //or maybe 1. you can experiment
      gl_Position = vec4(position.xy, depth, 1.);
    }`,
    fragmentShader: `varying vec2 vUv;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    void main(){
      gl_FragColor = vec4(
        mix( uColorA, uColorB, vec3(vUv.y)),
        1.
      );
    }`,
  })
);

myGradient.material.depthWrite = false;
myGradient.renderOrder = -99999;
scene.add(myGradient);

// Raycaster
const raycaster = new THREE.Raycaster();

// Loading

const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
const overlayMaterial = new THREE.ShaderMaterial({
  transparent: true,
  uniforms: {
    uAlpha: { value: 1 },
  },

  vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
  fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `,
});

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
scene.add(overlay);

const loadingBarElement = document.querySelector(".loading-bar");
let sceneReady = false;

const button = document.querySelector("h1");
const author = document.querySelector(".author");
const output = document.querySelector("output");
const toto = document.querySelector(".toto");

let cameraPosition;

const mouse = new THREE.Vector2();

function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
  toto.innerHTML = (itemsLoaded / itemsTotal) * 100 + "%";
  console.log((itemsLoaded / itemsTotal) * 100 + "%");
};

loadingManager.onLoad = function () {
  console.log("Loading complete!");

  window.setTimeout(() => {
    gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 });

    loadingBarElement.classList.add("ended");

    loadingBarElement.style.transform = "";
    sceneReady = true;
    output.classList.add("visible");
    range.classList.add("visible");
  }, 500);
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  const progressRatio = itemsLoaded / itemsTotal;
  loadingBarElement.style.transform = `scaleX(${progressRatio})`;
  toto.innerHTML = (itemsLoaded / itemsTotal) * 100 + "%";
  console.log((itemsLoaded / itemsTotal) * 100 + "%");
};

loadingManager.onError = function (url) {
  console.log("There was an error loading " + url);
};

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);

// button.addEventListener("click", () => {
//   // button.classList.add("hidden");
//   // author.classList.add("hidden");
// });

gltfLoader.load("/models/final.glb", (gltf) => {
  console.log(gltf.scene.children);

  // camera.position.set(gltf.scene.children[0].position);

  gltf.scene.position.set(0, 100, 0);
  scene.add(gltf.scene);
});

/**
 * Lights
 */

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(20, 90, 10);

const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(helper);
gui.add(directionalLight, "intensity").min(0).max(4).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
scene.add(directionalLight);

// Geometry

const buildingGeometry = new THREE.BoxBufferGeometry(2, 1, 2);
buildingGeometry.translate(0, 0.5, 0);

/**
 * Materials
 */
const FloorMaterial = new THREE.MeshStandardMaterial();
FloorMaterial.roughness = 0.7;

const buildingMaterial = new THREE.MeshStandardMaterial({ color: "red" });

gui.add(FloorMaterial, "metalness").min(0).max(1).step(0.001);
gui.add(FloorMaterial, "roughness").min(0).max(1).step(0.001);

/**
 * Input Range
 */

const range = document.querySelector(".range-input");
const buildings = [];

range.addEventListener("input", (e) => {
  const newBuildings = [...buildings];

  for (let i = 0; i < newBuildings.length; i++) {
    let newValue = Object.values(data[i].prices[e.target.value])[0];
    let newValueRatio = newValue / 100;
    // newBuildings[i].scale.y = newValueRatio;

    gsap.to(newBuildings[i].scale, { duration: 1.4, y: newValueRatio });
  }
});

for (let i = 0; i < data.length; i++) {
  const building = new THREE.Mesh(buildingGeometry, buildingMaterial);

  building.position.x = positions[i].x;

  building.position.y = 9;
  building.scale.y = Object.values(data[i].prices[0])[0] / 100;

  building.position.z = positions[i].z;
  scene.add(building);

  buildings.push(building);
}

const plane = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), FloorMaterial);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

scene.add(plane);

/**
 * Sizes
 */

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  // renderer.setClearColor(debugObject.clearColor);

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.x = 1;
camera.position.y = 30;
camera.position.z = 200;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 50;
controls.maxDistance = 250;
controls.maxPolarAngle = Math.PI / 2.3;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setClearColor("#FEBCBC");

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  // renderer.setClearColor(debugObject.clearColor);

  controls.update();

  // if (sceneReady) {
  //   for (const point of points) {
  //     const screenPosition = point.position.clone();
  //     screenPosition.project(camera);

  //     raycaster.setFromCamera(screenPosition, camera);
  //     const intersects = raycaster.intersectObjects(scene.children, true);

  //     if (intersects.length === 0) {
  //       point.element.classList.add("visible");
  //     } else {
  //       const intersectionDistance = intersects[0].distance;
  //       const pointDistance = point.position.distanceTo(camera.position);

  //       if (intersectionDistance < pointDistance) {
  //         point.element.classList.remove("visible");
  //       } else {
  //         point.element.classList.add("visible");
  //       }
  //     }

  //     const translateX = screenPosition.x * sizes.width * 0.5;
  //     const translateY = -screenPosition.y * sizes.height * 0.5;
  //     point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
  //   }
  // }

  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    console.log(intersects[i]);
  }

  // Render
  renderer.render(scene, camera);

  window.addEventListener("mousemove", onMouseMove, false);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
