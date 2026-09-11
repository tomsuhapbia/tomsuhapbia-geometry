import {access,readFile,readdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {posts} from '../dist/content.js';
import katex from 'katex';

for(const file of ['index.html','styles.css','app.js','theme.js','icons.js','content.js','pdf-reader.js','assets/logo.png','assets/favicon.png','vendor/katex/katex.min.js','vendor/marked.js','vendor/purify.min.js','vendor/prism.js','vendor/pdf.mjs','vendor/pdf.worker.mjs']) await access('dist/'+file);
for(const file of (await readdir('dist')).filter(x=>x.endsWith('.js'))) execFileSync(process.execPath,['--check','dist/'+file]);
let equations=0;
const ids=new Set();
for(const post of posts){
 if(!post.id||ids.has(post.id)||!post.title||!Array.isArray(post.tags)||post.tags.some(t=>typeof t!=='string'||!t.trim()))throw Error('Invalid post metadata');
 ids.add(post.id);
 if(post.body){
  const source=await readFile('dist/'+post.body.replace(/^\.\//,''),'utf8');
  if(!source.trim())throw Error(`Empty post ${post.id}`);
  for(const match of source.matchAll(/\$\$([\s\S]+?)\$\$|\$([^\n$]+?)\$/g)){
   katex.renderToString(match[1]??match[2],{throwOnError:true,displayMode:match[1]!==undefined});equations++;
  }
 }
 if(post.pdf){
  const data=await readFile('dist/'+post.pdf.replace(/^\.\//,''));
  if(data.subarray(0,5).toString()!=='%PDF-'||post.bytes!==data.length)throw Error(`Invalid PDF or stale size: ${post.id}`);
 }
}
const html=await readFile('dist/index.html','utf8');
for(const match of html.matchAll(/(?:src|href)="\.\/([^"#?]+)"/g))await access('dist/'+match[1]);
const expectedPosts=posts.filter(p=>p.body).map(p=>p.body.split('/').pop()).sort();
const expectedPdfs=posts.filter(p=>p.pdf).map(p=>p.pdf.split('/').pop()).sort();
if(JSON.stringify((await readdir('dist/posts')).sort())!==JSON.stringify(expectedPosts))throw Error('Unreferenced post file');
if(JSON.stringify((await readdir('dist/pdf')).sort())!==JSON.stringify(expectedPdfs))throw Error('Unreferenced PDF file');
console.log(`Verified ${posts.length} post, ${equations} equations, PDF metadata, tags, local assets, and JavaScript. No unreferenced posts or PDFs.`);
