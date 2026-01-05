import { defineConfig } from "tsup";
import pkg from "./package.json";
console.log(pkg.version)
export default defineConfig({
	entry: ["src/index.ts"],
	outDir: 'dist',
	format: ["cjs"], // Node-friendly
	target: "node18",
	bundle: true, // 👈 single file
	splitting: false, // 👈 force ONE file
	sourcemap: true,
	clean: true,
	dts: true, // generates index.d.ts
	define: {
		__VERSION__: JSON.stringify(pkg.version),
	},
});
