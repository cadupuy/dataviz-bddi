import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glsl from 'vite-plugin-glsl'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: '8080',
		https: false,
		open: true
	},
	assetsInclude: ['**/*.gltf'],
	plugins: [glsl(), vue()],

	resolve: {
		alias: {
			'@classes': path.resolve(__dirname, '/src/Experience'),
			'@scss': path.resolve(__dirname, '/src/scss'),
			'@shaders': path.resolve(__dirname, '/src/Experience/shaders'),
			'@utils': path.resolve(__dirname, '/src/Experience/utils')
		}
	},

	preprocessorOptions: {
		scss: {
			sassOptions: {
				outputStyle: 'compressed'
			}
		}
	}
})
