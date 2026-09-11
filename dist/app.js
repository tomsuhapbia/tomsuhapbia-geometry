import { posts } from './content.js';
import { icon } from './icons.js';
import { openPdf } from './pdf-reader.js';

const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const formatDate = date => new Date(`${date}T12:00:00`).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
const formatSize = bytes => bytes >= 1048576 ? `${(bytes/1048576).toFixed(1)} MB` : `${Math.ceil(bytes/1024)} KB`;
const params = new URLSearchParams(location.search);
const allTags = [...new Set(posts.flatMap(post => post.tags))];
let selectedTag = allTags.includes(params.get('tag')) ? params.get('tag') : '';
let query = params.get('q') || '';
let renderVersion = 0;
const bodyCache = new Map();
const list = document.querySelector('#post-list');
const search = document.querySelector('#post-search');
const filters = document.querySelector('#tag-filters');
const themeButton = document.querySelector('#theme-toggle');

function updateThemeButton() {
 const dark = document.documentElement.dataset.theme === 'dark';
 themeButton.innerHTML = icon(dark ? 'sun' : 'moon');
 themeButton.setAttribute('aria-label',`Switch to ${dark ? 'light' : 'dark'} theme`);
 document.querySelector('meta[name="theme-color"]').content = dark ? '#050505' : '#ffffff';
}
updateThemeButton();
themeButton.addEventListener('click',()=>{
 const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
 document.documentElement.dataset.theme=theme;
 try { localStorage.setItem('geometry-theme',theme); } catch { /* Optional preference. */ }
 updateThemeButton();
});
document.querySelector('#search-icon').innerHTML=icon('search');
search.value=query;
document.addEventListener('keydown',event=>{
 if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){
  event.preventDefault();document.querySelector('#pdf-dialog').close();search.focus();
 }
});

function renderMarkdown(source) {
 if(!window.marked||!window.DOMPurify)throw new Error('Reading libraries unavailable');
 const equations=[];
 const protectedSource=source.replace(/\$\$([\s\S]+?)\$\$|\$([^\n$]+?)\$/g,(_,display,inline)=>{
  const index=equations.length;equations.push({tex:display??inline,display:display!==undefined});return `GEOMETRYMATH${index}TOKEN`;
 });
 const html=DOMPurify.sanitize(marked.parse(protectedSource));
 return html.replace(/GEOMETRYMATH(\d+)TOKEN/g,(_,index)=>{
  const eq=equations[Number(index)];return window.katex?katex.renderToString(eq.tex,{displayMode:eq.display,throwOnError:false,trust:false,output:'htmlAndMathml'}):escapeHTML(eq.tex);
 });
}

function postTemplate(post) {
 const id=escapeHTML(post.id);
 const tags=post.tags.map(tag=>`<button class="post-tag" data-tag="${escapeHTML(tag)}" aria-label="Filter posts tagged ${escapeHTML(tag)}">${escapeHTML(tag)}</button>`).join('');
 const attachment=post.pdf?`<div class="attachment"><div class="attachment-info"><span class="attachment-icon">${icon('file')}</span><div><strong>Full paper</strong><span>${post.pages} pages <span class="dot">·</span> ${formatSize(post.bytes)} <span class="dot">·</span> ${escapeHTML(post.language||'PDF')}</span></div></div><div class="attachment-actions"><button class="button primary" data-read="${id}">Read paper ${icon('arrow')}</button><a class="download-button" href="${escapeHTML(post.pdf)}" download aria-label="Download ${escapeHTML(post.title)}" title="Download PDF">${icon('download')}</a></div></div>`:'';
 return `<article class="post" id="post-${id}"><div class="post-meta"><time datetime="${post.date}">${formatDate(post.date)}</time><span class="dot">·</span><span>${escapeHTML(post.author)}</span></div><h2><a href="#post-${id}">${escapeHTML(post.title)}</a></h2><div class="post-tags" aria-label="Post tags">${tags}</div><div class="post-body prose" data-body="${id}"><p>${escapeHTML(post.description||'')}</p></div>${attachment}</article>`;
}
function renderFilters() {
 filters.innerHTML=`<button class="filter-tag" data-tag="" aria-pressed="${selectedTag===''}">All posts <span>${posts.length}</span></button>`+allTags.map(tag=>`<button class="filter-tag" data-tag="${escapeHTML(tag)}" aria-pressed="${selectedTag===tag}">${escapeHTML(tag)} <span>${posts.filter(post=>post.tags.includes(tag)).length}</span></button>`).join('');
}
async function loadBody(post,version) {
 if(!post?.body)return;
 const body=[...document.querySelectorAll('[data-body]')].find(el=>el.dataset.body===post.id);
 if(!body)return;
 try {
  if(!bodyCache.has(post.body)){const response=await fetch(post.body);if(!response.ok)throw new Error('Post unavailable');bodyCache.set(post.body,await response.text());}
  if(version!==renderVersion)return;
  body.innerHTML=renderMarkdown(bodyCache.get(post.body));window.Prism?.highlightAllUnder(body);
 } catch {
  if(version!==renderVersion)return;
  body.innerHTML=`<p>${escapeHTML(post.description||'')}</p><p class="load-error">The post text couldn’t be loaded. ${post.pdf?'You can still read the original paper below.':'Please try again.'} <button data-retry="${escapeHTML(post.id)}">Retry</button></p>`;
 }
}
function renderPosts(updateUrl=true) {
 const version=++renderVersion;
 const tokens=query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
 const matching=posts.filter(post=>{
  const text=`${post.title} ${post.description||''} ${post.tags.join(' ')}`.toLocaleLowerCase();
  return(!selectedTag||post.tags.includes(selectedTag))&&tokens.every(token=>text.includes(token));
 }).sort((a,b)=>b.date.localeCompare(a.date));
 document.querySelector('#post-count').textContent=`${matching.length} ${matching.length===1?'post':'posts'}`;
 renderFilters();
 list.innerHTML=matching.length?matching.map(postTemplate).join(''):`<div class="empty-state"><h3>No matching posts.</h3><p>Try another tag or a different search.</p><button class="button outline" id="clear-filters">Clear filters</button></div>`;
 matching.forEach(post=>loadBody(post,version));
 if(updateUrl){const next=new URLSearchParams();if(selectedTag)next.set('tag',selectedTag);if(query)next.set('q',query);history.replaceState(null,'',location.pathname+(next.size?`?${next}`:'')+location.hash);}
}
search.addEventListener('input',()=>{query=search.value;renderPosts();});
document.addEventListener('click',event=>{
 const tag=event.target.closest('[data-tag]');
 if(tag){selectedTag=tag.dataset.tag;const fromPost=tag.classList.contains('post-tag');renderPosts();[...filters.querySelectorAll('button')].find(b=>b.dataset.tag===selectedTag)?.focus({preventScroll:!fromPost});}
 const read=event.target.closest('[data-read]');if(read)openPdf(posts.find(post=>post.id===read.dataset.read));
 const retry=event.target.closest('[data-retry]');if(retry)loadBody(posts.find(post=>post.id===retry.dataset.retry),renderVersion);
 if(event.target.closest('#clear-filters')){selectedTag='';query='';search.value='';renderPosts();search.focus();}
});
// Earlier preview routes now lead to this single blog page.
if(location.hash.startsWith('#/'))history.replaceState(null,'',location.pathname+location.search);
window.addEventListener('popstate',()=>{const state=new URLSearchParams(location.search);selectedTag=allTags.includes(state.get('tag'))?state.get('tag'):'';query=state.get('q')||'';search.value=query;renderPosts(false);});
renderPosts(false);
