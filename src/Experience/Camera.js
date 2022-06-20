import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from './Experience'
import config from '@utils/config'

export default class Camera {
	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas
		this.mouse = this.experience.mouse

		this.setInstance()
		this.setControls()
	}

	setInstance() {
		this.instance = new PerspectiveCamera(
			75,
			this.sizes.width / this.sizes.height,
			0.1,
			1000
		)
		this.instance.position.set(70, 125, 170)
		this.scene.add(this.instance)
	}

	setControls() {
		if (config.controls) {
			this.controls = new OrbitControls(this.instance, this.canvas)
			this.controls.enabled = config.controls
			this.controls.enableDamping = true
			this.controls.minDistance = 150
			this.controls.maxDistance = 200
			this.controls.maxPolarAngle = Math.PI / 2.6
		}
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	update() {
		if (this.controls) this.controls.update()
	}
}
