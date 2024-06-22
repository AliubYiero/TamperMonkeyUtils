import { defineConfig } from 'vite';
import { resolve } from 'path';
import terser from '@rollup/plugin-terser';

export default defineConfig( ( { mode } ) => {
	const isProduction = mode === 'production';
	
	return {
		build: {
			lib: {
				entry: resolve( __dirname, 'src/index.ts' ),
				fileName: 'index',
			},
			minify: false,
			rollupOptions: {
				output: [
					{
						dir: 'lib',
						entryFileNames: 'index.js',
						format: 'cjs',
					},
					{
						dir: 'lib',
						entryFileNames: 'index.min.js',
						format: 'cjs',
						name: 'minify',
						plugins: [ terser() ],
					},
				],
			},
			watch: isProduction
				? null
				: {},
		},
	};
} );
