import Experience from '../Experience.js'
import * as THREE from 'three'

export default class Building {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.paris = this.resources.items.paris
		this.matcap = this.resources.items.metal
		this.setModel()
	}

	setModel() {
		let newMaterial = new THREE.MeshMatcapMaterial({ matcap: this.matcap })

		this.paris.scene.traverse((o) => {
			if (o.isMesh) {
				o.material = newMaterial
			}
		})

		let sortedArray = this.paris.scene.children.sort(function (a, b) {
			return Number(a.name) - Number(b.name)
		})

		this.paris.scene.children = [...sortedArray]
		this.paris.scene.position.set(10, 20, 0)
		this.experience.items.push(this.paris.scene)
		this.scene.add(this.paris.scene)
	}
}
