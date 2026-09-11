import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
await mkdir('dist/vendor/katex',{recursive:true});
await mkdir('dist/vendor/fonts',{recursive:true});
await cp('node_modules/katex/dist','dist/vendor/katex',{recursive:true});
for(const [from,to] of [
 ['node_modules/marked/lib/marked.umd.js','dist/vendor/marked.js'],
 ['node_modules/dompurify/dist/purify.min.js','dist/vendor/purify.min.js'],
 ['node_modules/prismjs/prism.js','dist/vendor/prism.js'],
 ['node_modules/pdfjs-dist/build/pdf.mjs','dist/vendor/pdf.mjs'],
 ['node_modules/pdfjs-dist/build/pdf.worker.mjs','dist/vendor/pdf.worker.mjs'],
 ['node_modules/pdfjs-dist/cmaps','dist/vendor/cmaps'],
 ['node_modules/pdfjs-dist/standard_fonts','dist/vendor/standard_fonts'],
 ['node_modules/pdfjs-dist/wasm','dist/vendor/wasm']
]) await cp(from,to,{recursive:true});
await cp('node_modules/katex/dist/contrib/auto-render.min.js','dist/vendor/katex/auto-render.min.js');
for(const weight of [400,500,600,700]) await cp(`node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff2`,`dist/vendor/fonts/inter-latin-${weight}-normal.woff2`);
for(const style of ['normal','italic']) await cp(`node_modules/@fontsource/dm-serif-display/files/dm-serif-display-latin-400-${style}.woff2`,`dist/vendor/fonts/dm-serif-display-latin-400-${style}.woff2`);
let notices='THIRD-PARTY LIBRARIES AND FONTS\n\n';
for(const name of ['katex','marked','dompurify','prismjs','pdfjs-dist','@fontsource/inter','@fontsource/dm-serif-display']){
 const pkg=JSON.parse(await readFile(join('node_modules',name,'package.json'),'utf8'));
 let license='';for(const file of ['LICENSE','LICENSE.txt','LICENSE.md'])try{license=await readFile(join('node_modules',name,file),'utf8');break;}catch{}
 if(!license)throw new Error(`Missing license for ${name}`);
 notices+=`${name} ${pkg.version}\n${'='.repeat(60)}\n${license}\n\n`;
}
await writeFile('dist/vendor/THIRD_PARTY_NOTICES.txt',notices);
console.log('Local libraries, licenses, and fonts prepared.');
await import('./check.mjs');
