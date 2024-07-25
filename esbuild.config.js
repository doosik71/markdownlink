const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/extension.ts'],
  bundle: true,
  outdir: 'out',
  platform: 'node',
  external: ['vscode'],
  watch: process.argv.includes('--watch'),
}).catch(() => process.exit(1));
