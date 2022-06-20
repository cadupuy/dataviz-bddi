import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

import * as THREE from 'three'
import gsap from 'gsap'
import data from '../../data.json'
import config from '@utils/config'
import Debug from '@utils/Debug'
import Experience from '../Experience.js'
import Bars from './Bars.js'
import Building from './Building.js'
import Overlay from './Overlay.js'
import Background from './Background.js'
import Environment from './Environment.js'

export default class World {
	constructor() {
		this.experience = new Experience()
		this.raycaster = this.experience.raycaster
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera
		this.raycaster = this.experience.raycaster
		this.matcapMetal = this.resources.items.metal
		this.matcapHover = this.resources.items.hover
		this.fill = document.querySelector('.bar .fill')
		this.loadingBarElement = document.querySelector('.loading-bar')
		this.author = document.querySelector('.author')
		this.range = document.querySelector('.range')
		this.pourcent = document.querySelector('.pourcent')
		this.titleLoader = document.querySelector('.titleLoader')
		this.title = document.querySelector('.title')
		this.contentText = document.querySelector('.content')
		this.percent
		this.rangeInput = document.querySelector('.range-input')
		this.content = document.querySelector('.content')
		this.arrondissement = document.querySelector('.arrondissement')
		this.population = document.querySelector('.population')
		this.m2 = document.querySelector('.m2')
		this.setPostProcessing()
		this.debugComposer()
		this.selected

		this.resources.on('ready', () => {
			this.environment = new Environment()
			this.building = new Building()
			this.bars = new Bars()
			// this.overlay = new Overlay()
			this.background = new Background()
			window.setTimeout(() => {
				// gsap.to(this.overlay.material.uniforms.uAlpha, {
				// 	duration: 3,
				// 	value: 0,
				// 	delay: 1
				// })
				this.loadingBarElement.classList.add('ended')
				this.loadingBarElement.style.transform = ''
				this.pourcent.classList.add('hidden')
				this.titleLoader.classList.add('hidden')
				this.title.classList.add('visible')
				this.range.classList.add('visible')
				this.author.classList.add('visible')
			}, 300)
		})
		document
			.querySelector('.range-input')
			.addEventListener('input', (e) => {
				this.setBar(e)
			})
	}

	setBar(e) {
		let min = parseInt(this.rangeInput.attributes.min)
		let max = parseInt(this.rangeInput.attributes.max)
		let value = parseInt(this.rangeInput.value)
		this.percent = ((value - min) / (max - min)) * 100

		this.fill.style.height = this.percent + '%'

		if (this.bars) this.bars.update(e)
	}

	handleClick() {
		this.contentText.classList.add('visible')

		let prev
		if (this.raycaster.selected) {
			prev = Number(this.raycaster.selected)
		}

		this.raycaster.selected = Number(this.raycaster.currentIntersect.name)

		if (prev) {
			this.building.paris.scene.children[prev].material.matcap =
				this.matcapMetal
		}

		this.building.paris.scene.children[
			this.raycaster.selected
		].material.matcap = this.matcapHover

		if (this.raycaster.selected == 0) {
			this.arrondissement.innerHTML = this.raycaster.selected + 1 + 'er :'
		} else {
			this.arrondissement.innerHTML =
				this.raycaster.selected + 1 + 'ème :'
		}

		let machin = data[this.raycaster.selected]

		this.m2.innerHTML =
			Object.values(machin.prices[this.rangeInput.value])[0]
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '€'
		this.population.innerHTML = machin.population
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}

	setPostProcessing() {
		this.unrealBloomPass = new UnrealBloomPass()
		this.effectComposer = this.experience.renderer.effectComposer
		this.effectComposer.addPass(this.unrealBloomPass)

		this.unrealBloomPass.strength = 0.31
		this.unrealBloomPass.radius = 0.413
		this.unrealBloomPass.threshold = 0.95
	}

	debugComposer() {
		if (config.gui) {
			this.debug = new Debug()

			const f = this.debug.gui.addFolder({
				title: 'Composer',
				expanded: true
			})

			f.addInput(this.unrealBloomPass, 'enabled')
			f.addInput(this.unrealBloomPass, 'strength', {
				min: 0.00001,
				max: 2,
				step: 0.001
			})

			f.addInput(this.unrealBloomPass, 'radius', {
				min: 0.00001,
				max: 2,
				step: 0.001
			})
			f.addInput(this.unrealBloomPass, 'threshold', {
				min: 0.00001,
				max: 1,
				step: 0.001
			})
		}
	}

	update() {}
}
