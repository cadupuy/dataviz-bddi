import * as THREE from 'three'
import Experience from '../Experience.js'

import vertexShader from '../shaders/background.vert'
import fragmentShader from '../shaders/background.frag'

export default class Background {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.setBackground()
	}

	setBackground() {
		// Background

		const myGradient = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(2, 2, 1, 1),
			new THREE.ShaderMaterial({
				uniforms: {
					uColorA: { value: new THREE.Color('#000000') },
					uColorB: { value: new THREE.Color('#7ed6df') }
				},
				vertexShader: vertexShader,
				fragmentShader: fragmentShader
			})
		)

		myGradient.material.depthWrite = false
		myGradient.renderOrder = -999
		this.scene.add(myGradient)
	}
}
