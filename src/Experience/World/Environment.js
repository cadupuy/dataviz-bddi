import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
    }

    this.setSunLight();
    this.setAmbientLight();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 0.5);

    // Debug
    if (this.debug.active) {
      this.debugFolder.add(this.sunLight, "intensity").name("sunLightIntensity").min(0).max(10).step(0.001);

      this.debugFolder.add(this.sunLight.position, "x").name("sunLightX").min(-5).max(5).step(0.001);

      this.debugFolder.add(this.sunLight.position, "y").name("sunLightY").min(-5).max(5).step(0.001);

      this.debugFolder.add(this.sunLight.position, "z").name("sunLightZ").min(-5).max(5).step(0.001);
    }

    this.sunLight.position.set(3, 3, -1);
    this.scene.add(this.sunLight);
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);
  }
}
