import * as THREE from "three";
import Experience from "../Experience.js";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(40, 40);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      roughness: 0.7,
      color: "#FAFAFA",
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.position.y = -0.5;

    this.scene.add(this.mesh);
  }
}
