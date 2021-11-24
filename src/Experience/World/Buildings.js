import * as THREE from "three";
import Experience from "../Experience.js";

export default class Buildings {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.BoxBufferGeometry(1, 6, 1);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({ color: "yellow" });
  }

  setMesh() {
    for (let i = 0; i < 20; i++) {
      this.mesh = new THREE.Mesh(this.geometry, this.material);

      this.mesh.position.x = (Math.random() - 0.5) * i * 2;
      this.mesh.position.z = (Math.random() - 0.5) * i * 2;

      this.scene.add(this.mesh);
    }
  }
}
