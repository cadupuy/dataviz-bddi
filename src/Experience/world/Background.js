import { Mesh, PlaneBufferGeometry, ShaderMaterial, Color } from 'three'
import Experience from '../Experience.js'
import vertexShader from '@shaders/background/background.vert'
import fragmentShader from '@shaders/background/background.frag'

export default class Background {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.setBackground()
	}

	setBackground() {
		// Background

		const myGradient = new Mesh(
			new PlaneBufferGeometry(2, 2, 1, 1),
			new ShaderMaterial({
				uniforms: {
					uColorA: { value: new Color('#000000') },
					uColorB: { value: new Color('#7ed6df') }
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
