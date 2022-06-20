import { Scene } from 'three'

import config from '@utils/config'
import Debug from '@utils/Debug.js'
import Sizes from '@utils/Sizes.js'
import Time from '@utils/Time.js'
import Resources from '@utils/Resources.js'
import Mouse from '@utils/Mouse.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Raycaster from './Raycaster'
import World from '@classes/world/Index.js'
import { world } from './sources.js'

export default class Experience {
	constructor(_canvas) {
		if (Experience._instance) {
			return Experience._instance
		}

		Experience._instance = this
		this.canvas = _canvas
		this.sizes = new Sizes()
		this.time = new Time()
		this.mouse = new Mouse()
		this.items = []
		this.scene = new Scene()
		this.camera = new Camera()
		this.resources = new Resources(world)
		this.raycaster = new Raycaster()
		this.renderer = new Renderer()
		this.world = new World()
		this.setDebug()

		// Resize event
		this.sizes.on('resize', () => {
			this.resize()
		})

		this.update()
	}

	setDebug() {
		if (config.gui) {
			this.debug = new Debug()

			const f = this.debug.gui.addFolder({
				title: 'config',
				expanded: true
			})

			f.addInput(config, 'controls').on('change', () => {
				this.camera.controls.enabled = !this.camera.controls.enabled
			})
		}
	}

	update() {
		this.mouse.update()
		this.camera.update()
		if (this.raycaster) this.raycaster.update()
		if (this.world) this.world.update()
		if (this.renderer) this.renderer.update()
		if (this.debug) this.debug.stats.update()

		window.requestAnimationFrame(() => {
			this.update()
		})
	}

	resize() {
		this.camera.resize()
		this.renderer.resize()
	}
}
