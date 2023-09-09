// delete a directory
import { rm } from 'fs/promises';

await rm('./dist', { recursive: true, force: true });

await new Promise((r) => setTimeout(r, 1000));

await Bun.build({
    entrypoints: ['./src/'],
    outdir: 'dist',
    minify: true,
    target: 'bun',
    root: './src',
});
