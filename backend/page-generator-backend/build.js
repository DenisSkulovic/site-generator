const path = require('path');
const { build } = require('esbuild');
const alias = require('esbuild-plugin-alias');

build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'es2020',
    outfile: 'dist/index.js',
    external: ['./node_modules/pg/lib/native/*'],
    plugins: [
        alias({
            "@/": path.resolve(__dirname, './src'),
            "@page_cls_module": path.resolve(__dirname, '../../page_cls_module/src/index.ts'),
            "@repository_module": path.resolve(__dirname, '../repository_module/src/index.ts'),
        }),
    ],
}).catch(() => process.exit(1));
