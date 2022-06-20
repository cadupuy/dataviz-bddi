import { PlaneGeometry, ShaderMaterial, Mesh } from 'three'

import Experience from '../Experience.js'
import vertexShader from '@shaders/overlay/overlay.vert'
import fragmentShader from '@shaders/overlay/overlay.frag'

export default class Overlay {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.setOverlay()
	}

	setOverlay() {
		const overlayGeometry = new PlaneGeometry(2, 2, 1, 1)
		const overlayMaterial = new ShaderMaterial({
			transparent: true,
			uniforms: {
				uAlpha: { value: 1 }
			},

			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		})

		const overlay = new Mesh(overlayGeometry, overlayMaterial)
		this.scene.add(overlay)
	}

	update() {}
}
