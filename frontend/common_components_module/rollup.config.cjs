const vue = require('rollup-plugin-vue'); // Handle .vue SFC files
const typescript = require('rollup-plugin-typescript2'); // Transpile .ts files
const resolve = require('@rollup/plugin-node-resolve'); // Transpile .ts files
const postcss = require('rollup-plugin-postcss'); // Transpile .ts files

module.exports = {
    input: 'src/index.ts', // Path relative to package.json
    output: {
        format: 'esm',
        file: 'dist/common-components-module.esm.js',
        exports: 'named',
    },
    plugins: [
        resolve(),
        typescript({
            tsconfigOverride: { compilerOptions: { module: "esnext" } }
        }), // Compile TypeScript files
        vue({
            target: 'browser',
            css: false,
        }),
        postcss({
            extract: true,  // extracts to an external .css file
        }),
    ],
    external: ['vue'], // List of dependencies
};