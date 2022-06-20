import { Raycaster as ThreeRaycaster, TextureLoader } from 'three'
import Experience from './Experience'

export default class Raycaster {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		this.mouse = this.experience.mouse
		this.resources = this.experience.resources

		// this.matcapM = this.resources.items.hover
		// this.matcapH = this.resources.items.hover
		this.textureLoader = new TextureLoader()
		this.matcapM = this.textureLoader.load('/textures/metal.jpg')
		this.matcapH = this.textureLoader.load('/textures/hover.jpg')
		this.currentIntersect = null
		this.selected = null
		this.raycaster = new ThreeRaycaster()
		window.addEventListener('mousedown', () => {
			this.mouseDown()
		})
	}

	mouseDown() {
		if (this.experience.world && this.currentIntersect)
			this.experience.world.handleClick()
	}

	update() {
		this.raycaster.setFromCamera(this.mouse.mousePos, this.camera.instance)

		const intersects = this.raycaster.intersectObjects(
			this.experience.items
		)
		let material

		if (intersects.length > 0) {
			document.querySelector('html,body').style.cursor = 'pointer'

			if (this.currentIntersect != intersects[0].object) {
				if (this.currentIntersect) {
					material = this.currentIntersect.material.clone()
					this.currentIntersect.material = material

					if (material.emissive) {
						this.currentIntersect.material.matcap = this.matcapM
					} else {
						this.currentIntersect.material.matcap = this.matcapM
					}
				}
				this.currentIntersect = intersects[0].object
				material = this.currentIntersect.material.clone()
				this.currentIntersect.material = material

				if (material.emissive) {
					this.currentIntersect.material.matcap = this.matcapM
					material.matcap = this.matcapH
				} else {
					this.currentIntersect.material.matcap = this.matcapM
					material.matcap = this.matcapH
				}
			}
		} else {
			document.querySelector('html,body').style.cursor = 'default'

			if (this.currentIntersect) {
				material = this.currentIntersect.material

				if (material.emissive) {
					this.currentIntersect.material.matcap = this.matcapM
				} else {
					this.currentIntersect.material.matcap = this.matcapM
				}
			}

			this.currentIntersect = null
		}

		if (this.selected) {
			this.experience.items[0].children[this.selected].material.matcap =
				this.matcapH
		}
	}
}
