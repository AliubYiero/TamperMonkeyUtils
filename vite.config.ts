/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import terser from '@rollup/plugin-terser';

export default defineConfig( {
	
	build: {
		lib: {
			entry: resolve( __dirname, 'src/index.ts' ),
			name: 'ElementWaiter',
			fileName: 'index',
		},
		minify: false,
		rollupOptions: {
			output: [
				{
					entryFileNames: 'index.js',
					format: 'cjs',
				},
				{
					entryFileNames: 'index.min.js',
					format: 'iife',
					name: 'minify',
					plugins: [ terser() ],
				},
			],
		},
	},
	test: {
		// test options
		alias: {
			'@': './src',
		},
	},
} );