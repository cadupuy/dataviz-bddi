import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { TextureLoader } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { CubeTextureLoader } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter {
	constructor(sources) {
		super()

		this.sources = sources

		this.items = {}
		this.toLoad = this.sources.length
		this.loaded = 0

		this.setLoaders()
		this.startLoading()
	}

	setLoaders() {
		this.loaders = {}
		this.dracoLoader = new DRACOLoader()
		this.dracoLoader.setDecoderPath('draco/')
		this.dracoLoader.setDecoderConfig({ type: 'js' })
		this.loaders.gltfLoader = new GLTFLoader()
		this.loaders.fbxLoader = new FBXLoader()
		this.loaders.gltfLoader.setDRACOLoader(this.dracoLoader)
		this.loaders.textureLoader = new TextureLoader()
		this.loaders.rgbeLoader = new RGBELoader()
		this.loaders.cubeTextureLoader = new CubeTextureLoader()

		this.loaders.objLoader = new OBJLoader()
	}

	startLoading() {
		// Load each source
		for (const source of this.sources) {
			if (source.type === 'gltfModel') {
				this.loaders.gltfLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'objModel') {
				this.loaders.objLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'fbxModel') {
				this.loaders.fbxLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'texture') {
				this.loaders.textureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'cubeTexture') {
				this.loaders.cubeTextureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			}
		}
	}

	sourceLoaded(source, file) {
		this.items[source.name] = file

		this.loaded++
		this.trigger('progress', [this.loaded / this.toLoad, source.path])

		if (this.loaded === this.toLoad) {
			this.trigger('ready')
		}
	}
}
