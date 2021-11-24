import * as THREE from "three";
import Experience from "../Experience.js";

export default class Loader {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.bar = document.querySelector(".loading-bar");
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
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
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  update() {
    window.setTimeout(() => {
      gsap.to(this.material.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 });

      this.bar.style.transform = `scaleX(${progressRatio})`;
      this.bar.classList.add("ended");
      this.bar.style.transform = "";
    }, 500);
  }
}
