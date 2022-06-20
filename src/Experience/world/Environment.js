import { AmbientLight } from 'three'

import Experience from '../Experience.js'
export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.debug = this.experience.debug
		this.scene = this.experience.scene

		this.setDebug()
		this.setEnvironment()
	}

	setDebug() {
		if (this.debug) {
			const f = this.debug.gui.addFolder({
				title: 'Environment',
				expanded: true
			})
		}
	}

	setEnvironment() {
		const ambientLight = new AmbientLight(0xffffff, 0.3)
		this.scene.add(ambientLight)
	}
}
