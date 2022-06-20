import { sRGBEncoding } from 'three'
import { WebGLRenderer } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

import Experience from './Experience'

export default class Renderer {
	constructor() {
		this.experience = new Experience()
		this.canvas = this.experience.canvas
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera

		this.setInstance()
		this.setComposer()
	}

	setInstance() {
		this.instance = new WebGLRenderer({
			canvas: this.canvas,
			antialias: true
		})
		this.instance.outputEncoding = sRGBEncoding
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
	}

	setComposer() {
		this.effectComposer = new EffectComposer(this.instance)
		this.effectComposer.setSize(this.sizes.width, this.sizes.height)
		this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		const renderPass = new RenderPass(this.scene, this.camera.instance)
		this.effectComposer.addPass(renderPass)
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
		this.effectComposer.setSize(this.sizes.width, this.sizes.height)
	}

	update() {
		this.effectComposer.render()
	}
}
