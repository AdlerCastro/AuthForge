import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/**/*.ts', 'prisma/seed.ts'],
	outDir: 'dist',
	splitting: false,
	platform: 'node',
	dts: false,
	format: ['esm'],
	sourcemap: false,
	clean: true,
	target: 'es2022',
	external: ['dotenv'],
	loader: {
		'.html': 'file',
	},
	esbuildOptions: (options, context) => {
		if (context.format === 'esm') {
			options.packages = 'external'
		}
	},
})