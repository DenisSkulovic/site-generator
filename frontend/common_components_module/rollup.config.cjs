const vue = require('rollup-plugin-vue'); // Handle .vue SFC files
const typescript = require('rollup-plugin-typescript2'); // Transpile .ts files
const resolve = require('@rollup/plugin-node-resolve'); // Node.js modules resolution
const postcss = require('rollup-plugin-postcss'); // Add support for CSS

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
            tsconfigOverride: {
                compilerOptions: {
                    module: "esnext",
                    declaration: true,
                    declarationDir: "./dist"
                }
            }
        }), // Compile TypeScript files
        vue({
            target: 'browser',
            css: false,
        }),
        postcss({
            // extract: true would extract the css to a separate file
            extract: false,
            // Minify the output
            minimize: true,
            // Enable source maps
            sourceMap: true,
        }),
    ],
    external: ['vue'], // List of dependencies
};
