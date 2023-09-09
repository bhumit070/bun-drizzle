await Bun.build({
    entrypoints: ['src/index.ts'],
    outdir: 'dist',
    minify: true,
    splitting: true,
    target: 'bun',
    sourcemap: 'external',
});
