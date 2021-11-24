import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Buildings from "./Buildings.js";
import Loader from "./Loader.js";
import Points from "./Points.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.loader = new Loader();

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.floor = new Floor();
      this.buildings = new Buildings();
      this.points = new Points();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.points) {
      this.points.update();
    }
  }
}
