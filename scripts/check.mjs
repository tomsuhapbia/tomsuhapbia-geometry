import {access,readFile,readdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {articles,pdfs} from '../dist/content.js';
import katex from 'katex';
for(const file of ['index.html','styles.css','app.js','theme.js','diagrams.js','content.js','vendor/katex/katex.min.js','vendor/marked.js','vendor/purify.min.js','vendor/prism.js','vendor/pdf.mjs','vendor/pdf.worker.mjs']) await access('dist/'+file);
for(const file of (await readdir('dist')).filter(x=>x.endsWith('.js'))) execFileSync(process.execPath,['--check','dist/'+file]);
let equationCount=0;
for(const article of articles){const source=await readFile(`dist/posts/${article.slug}.md`,'utf8');if(source.length<1200) throw Error(`Article incomplete: ${article.slug}`);for(const match of source.matchAll(/\$\$([\s\S]+?)\$\$|\$([^\n$]+?)\$/g)){katex.renderToString(match[1]??match[2],{throwOnError:true,displayMode:match[1]!==undefined});equationCount++;}}
for(const pdf of pdfs){const buffer=await readFile(`dist/pdf/${pdf.id}.pdf`);if(buffer.subarray(0,5).toString()!=='%PDF-') throw Error(`Invalid PDF ${pdf.id}`);}
const html=await readFile('dist/index.html','utf8');
for(const match of html.matchAll(/(?:src|href)="\.\/([^"#?]+)"/g)) await access('dist/'+match[1]);
const manifest=JSON.parse(await readFile('dist/pdf/manifest.json','utf8'));
for(const pdf of pdfs){const data=await readFile(`dist/pdf/${pdf.id}.pdf`);if(manifest[pdf.id]?.bytes!==data.length||manifest[pdf.id]?.pages!==pdf.pages)throw Error(`Stale PDF metadata: ${pdf.id}`);}
console.log(`Checked JavaScript, HTML assets, ${articles.length} articles, ${equationCount} equations, and ${pdfs.length} PDF documents. Ready to deploy dist/.`);
