import * as THREE from "three";
import Experience from "../Experience.js";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.raycaster = new THREE.Raycaster();
    this.setPoints();
  }

  setPoints() {
    this.points = [];
    for (let i = 0; i < 20; i++) {
      this.points.push({
        position: new THREE.Vector3(i, 0.5, -1.6),
        element: document.querySelector(`.point-${i}`),
      });
    }
  }

  update() {
    for (const point of this.points) {
      const screenPosition = point.position.clone();

      screenPosition.project(this.camera.instance);

      this.raycaster.setFromCamera(screenPosition, this.camera.instance);

      const intersects = this.raycaster.intersectObjects(this.scene.children, true);

      if (intersects.length === 0) {
        point.element.classList.add("visible");
      } else {
        const intersectionDistance = intersects[0].distance;
        const pointDistance = point.position.distanceTo(this.camera.instance.position);

        if (intersectionDistance < pointDistance) {
          point.element.classList.remove("visible");
        } else {
          point.element.classList.add("visible");
        }
      }

      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const translateX = screenPosition.x * sizes.width * 0.5;
      const translateY = -screenPosition.y * sizes.height * 0.5;
      point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    }
  }
}
