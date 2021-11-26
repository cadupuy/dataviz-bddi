import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { gsap } from "gsap";
import data from "../data.json";

// Canvas
const canvas = document.querySelector("canvas.webgl");

const rangeInput = document.querySelector(".range-input");
const fill = document.querySelector(".bar .fill");

let percent;

const setBar = () => {
  let min = parseInt(rangeInput.attributes.min);
  let max = parseInt(rangeInput.attributes.max);
  let value = parseInt(rangeInput.value);
  percent = ((value - min) / (max - min)) * 100;

  fill.style.height = percent + "%";
};
rangeInput.addEventListener("input", setBar());

const pointer = new THREE.Vector2();

let content = document.querySelector(".content");
let arrondissement = document.querySelector(".arrondissement");
let population = document.querySelector(".population");
let m2 = document.querySelector(".m2");

// Scene
const scene = new THREE.Scene();

let INTERSECTED;
let selected;

const positions = [
  {
    x: -3,
    z: -2,
  },
  {
    x: 7,
    z: -17,
  },
  {
    x: 34,
    z: -9,
  },
  {
    x: 32,
    z: 10,
  },
  {
    x: 18,
    z: 35,
  },
  {
    x: -8,
    z: 27,
  },
  {
    x: -35,
    z: 9,
  },
  {
    x: -43,
    z: -32,
  },
  {
    x: 5,
    z: -35,
  },
  {
    x: 36,
    z: -37,
  },
  {
    x: 59,
    z: 1,
  },
  {
    x: 88,
    z: 50,
  },
  {
    x: 30,
    z: 62,
  },
  {
    x: -13,
    z: 68,
  },
  {
    x: -49,
    z: 47,
  },
  {
    x: -100,
    z: 25,
  },
  {
    x: -56,
    z: -53,
  },
  {
    x: 12,
    z: -75,
  },
  {
    x: 69,
    z: -64,
  },
  {
    x: 87,
    z: 0,
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
      uColorA: { value: new THREE.Color("#000000") },
      uColorB: { value: new THREE.Color("#7ed6df") },
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

const author = document.querySelector(".author");
const range = document.querySelector(".range");
const pourcent = document.querySelector(".pourcent");
const titleLoader = document.querySelector(".titleLoader");
const title = document.querySelector(".title");
const contentText = document.querySelector(".content");

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
  let pourcentCalcul = (itemsLoaded / itemsTotal) * 100;
  let pourcentCalculRounded = Number(Math.round(pourcentCalcul));
  pourcent.innerHTML = pourcentCalculRounded + "%";
};

loadingManager.onLoad = function () {
  console.log("Loading complete!");

  window.setTimeout(() => {
    gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 });

    loadingBarElement.classList.add("ended");
    loadingBarElement.style.transform = "";
    pourcent.classList.add("hidden");
    titleLoader.classList.add("hidden");

    title.classList.add("visible");

    range.classList.add("visible");
    author.classList.add("visible");
  }, 300);
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  const progressRatio = itemsLoaded / itemsTotal;
  loadingBarElement.style.transform = `scaleX(${progressRatio})`;
  pourcent.innerHTML = Math.round((itemsLoaded / itemsTotal) * 100) + "%";
};

loadingManager.onError = function (url) {
  console.log("There was an error loading " + url);
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const matcapTextureBlue = textureLoader.load("/textures/hover.jpg");
const matcapTextureRed = textureLoader.load("/textures/rouge.jpg");
const matcapTextureYellow = textureLoader.load("/textures/metal.jpg");

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);

let model;
gltfLoader.load("/models/jazz.glb", (gltf) => {
  model = gltf.scene;
  let newMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTextureYellow });
  model.traverse((o) => {
    if (o.isMesh) o.material = newMaterial;
  });

  let sortedArray = model.children.sort(function (a, b) {
    return Number(a.name) - Number(b.name);
  });
  console.log(sortedArray);

  model.children = [...sortedArray];

  gltf.scene.position.set(10, 20, 0);
  scene.add(gltf.scene);
});

// Geometry

const buildingGeometry = new THREE.BoxBufferGeometry(4, 1, 4);
buildingGeometry.translate(0, 0.5, 0);

/**
 * Materials
 */
const FloorMaterial = new THREE.MeshStandardMaterial();
FloorMaterial.roughness = 0.7;

const buildingMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTextureRed });

/**
 * Input Range
 */

const buildings = [];

rangeInput.addEventListener("input", (e) => {
  setBar();
  const newBuildings = [...buildings];

  if (selected)
    m2.innerHTML =
      Object.values(data[selected].prices[e.target.value])[0]
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "€";

  for (let i = 0; i < newBuildings.length; i++) {
    let newValue = Object.values(data[i].prices[e.target.value])[0];
    let newValueRatio = newValue / 130;
    gsap.to(newBuildings[i].scale, { duration: 1.4, y: newValueRatio });
  }
});

for (let i = 0; i < data.length; i++) {
  const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
  building.name = i;

  building.position.x = positions[i].x;

  building.position.y = 25;
  building.scale.y = Object.values(data[i].prices[0])[0] / 130;

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

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

document.addEventListener("mousemove", onPointerMove);

const mouseDown = () => {
  if (INTERSECTED && model.children) {
    contentText.classList.add("visible");

    let prev;
    if (selected) prev = Number(selected);

    selected = Number(INTERSECTED.name);

    if (prev) model.children[prev].material.matcap = matcapTextureYellow;

    model.children[selected].material.matcap = matcapTextureBlue;

    if (selected == 0) {
      arrondissement.innerHTML = selected + 1 + "er :";
    } else {
      arrondissement.innerHTML = selected + 1 + "ème :";
    }

    let machin = data[selected];

    m2.innerHTML =
      Object.values(machin.prices[rangeInput.value])[0]
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "€";
    population.innerHTML = machin.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

document.addEventListener("mousedown", mouseDown);

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.x = 70;
camera.position.y = 125;
camera.position.z = 170;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 150;
controls.maxDistance = 200;
controls.maxPolarAngle = Math.PI / 2.6;

const raycaster = new THREE.Raycaster();

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

  raycaster.setFromCamera(pointer, camera);

  if (model && model.children) {
    var intersects = raycaster.intersectObjects(
        model.children.sort(function (a, b) {
          return a - b;
        })
      ),
      material;

    if (intersects.length > 0) {
      document.querySelector("html,body").style.cursor = "pointer";

      if (INTERSECTED != intersects[0].object) {
        if (INTERSECTED) {
          material = INTERSECTED.material.clone();
          INTERSECTED.material = material;
          if (material.emissive) {
            INTERSECTED.material.matcap = matcapTextureYellow;
          } else {
            INTERSECTED.material.matcap = matcapTextureYellow;
          }
        }
        INTERSECTED = intersects[0].object;
        material = INTERSECTED.material.clone();
        INTERSECTED.material = material;

        if (material.emissive) {
          INTERSECTED.material.matcap = matcapTextureYellow;
          material.matcap = matcapTextureBlue;
        } else {
          INTERSECTED.material.matcap = matcapTextureYellow;
          material.matcap = matcapTextureBlue;
        }
      }
    } else {
      document.querySelector("html,body").style.cursor = "default";

      if (INTERSECTED) {
        material = INTERSECTED.material;

        if (material.emissive) {
          INTERSECTED.material.matcap = matcapTextureYellow;
        } else {
          INTERSECTED.material.matcap = matcapTextureYellow;
        }
      }

      INTERSECTED = null;
    }

    if (selected) {
      model.children[selected].material.matcap = matcapTextureBlue;
    }
  }

  // Render
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
