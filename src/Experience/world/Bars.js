import { BoxBufferGeometry, MeshMatcapMaterial, Mesh } from 'three'
import gsap from 'gsap'
import Experience from '../Experience.js'
import data from '../../data.json'

export default class Bars {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.raycaster = this.experience.raycaster
		this.resources = this.experience.resources
		this.matcap = this.resources.items.red
		this.m2 = document.querySelector('.m2')

		this.buildings = []

		this.positions = [
			{
				x: -3,
				z: -2
			},
			{
				x: 7,
				z: -17
			},
			{
				x: 34,
				z: -9
			},
			{
				x: 32,
				z: 10
			},
			{
				x: 18,
				z: 35
			},
			{
				x: -8,
				z: 27
			},
			{
				x: -35,
				z: 9
			},
			{
				x: -43,
				z: -32
			},
			{
				x: 5,
				z: -35
			},
			{
				x: 36,
				z: -37
			},
			{
				x: 59,
				z: 1
			},
			{
				x: 88,
				z: 50
			},
			{
				x: 30,
				z: 62
			},
			{
				x: -13,
				z: 68
			},
			{
				x: -49,
				z: 47
			},
			{
				x: -100,
				z: 25
			},
			{
				x: -56,
				z: -53
			},
			{
				x: 12,
				z: -75
			},
			{
				x: 69,
				z: -64
			},
			{
				x: 87,
				z: 0
			}
		]

		// Points
		this.points = []
		this.setBars()
	}

	setBars() {
		// Geometry

		const buildingGeometry = new BoxBufferGeometry(4, 1, 4)
		buildingGeometry.translate(0, 0.5, 0)

		const buildingMaterial = new MeshMatcapMaterial({
			matcap: this.matcap
		})

		for (let i = 0; i < data.length; i++) {
			const building = new Mesh(buildingGeometry, buildingMaterial)
			building.name = i

			building.position.x = this.positions[i].x

			building.position.y = 25
			building.scale.y = Object.values(data[i].prices[0])[0] / 130

			building.position.z = this.positions[i].z
			this.scene.add(building)

			this.buildings.push(building)
		}
	}

	update(e) {
		const newBuildings = [...this.buildings]

		if (this.raycaster.selected)
			this.m2.innerHTML =
				Object.values(
					data[this.raycaster.selected].prices[e.target.value]
				)[0]
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '€'

		for (let i = 0; i < newBuildings.length; i++) {
			let newValue = Object.values(data[i].prices[e.target.value])[0]
			let newValueRatio = newValue / 130
			gsap.to(newBuildings[i].scale, { duration: 1.4, y: newValueRatio })
		}
	}
}
