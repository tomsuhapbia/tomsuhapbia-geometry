import { icon } from './icons.js';
const dialog=document.querySelector('#pdf-dialog');
const canvas=document.querySelector('#pdf-canvas');
const stage=document.querySelector('#pdf-stage');
const status=document.querySelector('#pdf-status');
let doc=null,loading=null,renderTask=null,pageNumber=1,zoom=1,loadVersion=0,renderVersion=0,expanded=false,nativeFullscreen=false;

for(const [id,name] of [['pdf-close','close'],['pdf-prev','prev'],['pdf-next','next'],['pdf-zoom-out','minus'],['pdf-zoom-in','plus'],['pdf-fullscreen','expand'],['pdf-download','download']])document.getElementById(id).innerHTML=icon(name);
function controls(){
 document.querySelector('#pdf-pages').textContent=doc?`${pageNumber} / ${doc.numPages}`:'— / —';
 document.querySelector('#pdf-zoom').textContent=`${Math.round(zoom*100)}%`;
 document.querySelector('#pdf-prev').disabled=!doc||pageNumber<=1;
 document.querySelector('#pdf-next').disabled=!doc||pageNumber>=doc.numPages;
 document.querySelector('#pdf-zoom-out').disabled=!doc||zoom<=.5;
 document.querySelector('#pdf-zoom-in').disabled=!doc||zoom>=2;
}
async function renderPage(){
 if(!doc)return;
 const version=++renderVersion,currentDoc=doc,currentPage=pageNumber;
 controls();
 try{
  if(renderTask){renderTask.cancel();try{await renderTask.promise}catch{}}
  const page=await currentDoc.getPage(currentPage);
  if(version!==renderVersion||!dialog.open)return;
  const base=page.getViewport({scale:1});
  const fit=Math.min(1.25,Math.max(180,stage.clientWidth-50)/base.width);
  const viewport=page.getViewport({scale:fit*zoom});
  const dpr=Math.min(window.devicePixelRatio||1,2);
  canvas.width=Math.round(viewport.width*dpr);canvas.height=Math.round(viewport.height*dpr);
  canvas.style.width=viewport.width+'px';canvas.style.height=viewport.height+'px';
  canvas.setAttribute('aria-label',`Page ${currentPage} of ${doc.numPages}. Open the original PDF for accessible text.`);
  canvas.hidden=false;status.hidden=true;
  renderTask=page.render({canvasContext:canvas.getContext('2d'),viewport,transform:dpr!==1?[dpr,0,0,dpr,0,0]:undefined});
  await renderTask.promise;
 }catch(error){
  if(error.name!=='RenderingCancelledException'&&version===renderVersion&&dialog.open){canvas.hidden=true;status.hidden=false;status.textContent='This page could not be rendered. You can still open or download the original PDF.';}
 }
}
export async function openPdf(post){
 if(!post?.pdf)return;
 const version=++loadVersion;renderVersion++;renderTask?.cancel();
 if(loading)loading.destroy().catch(()=>{});
 doc=null;pageNumber=1;zoom=1;
 document.querySelector('#pdf-title').textContent=post.title;
 document.querySelector('#pdf-download').href=post.pdf;
 document.querySelector('#pdf-native').href=post.pdf;
 canvas.hidden=true;status.hidden=false;status.textContent='Opening the paper…';controls();
 if(!dialog.open)dialog.showModal();
 try{
  const pdfjs=await import('./vendor/pdf.mjs');
  if(version!==loadVersion)return;
  pdfjs.GlobalWorkerOptions.workerSrc=new URL('./vendor/pdf.worker.mjs',import.meta.url).href;
  loading=pdfjs.getDocument({url:new URL(post.pdf,import.meta.url).href,cMapUrl:new URL('./vendor/cmaps/',import.meta.url).href,cMapPacked:true,standardFontDataUrl:new URL('./vendor/standard_fonts/',import.meta.url).href,wasmUrl:new URL('./vendor/wasm/',import.meta.url).href});
  const result=await loading.promise;
  if(version!==loadVersion){await result.destroy();return;}
  doc=result;await renderPage();
 }catch{
  if(version!==loadVersion)return;
  status.hidden=false;status.textContent='The preview is unavailable in this browser. Open the original PDF below, or download it to read.';
 }
}
document.querySelector('#pdf-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{
 loadVersion++;renderVersion++;renderTask?.cancel();
 if(loading){loading.destroy().catch(()=>{});loading=null;}doc=null;
 expanded=false;dialog.classList.remove('expanded');document.querySelector('#pdf-fullscreen').setAttribute('aria-label','Enter fullscreen');
 if(nativeFullscreen&&document.fullscreenElement)document.exitFullscreen().catch(()=>{});
 nativeFullscreen=false;
});
document.querySelector('#pdf-prev').addEventListener('click',()=>{if(doc&&pageNumber>1){pageNumber--;renderPage();stage.scrollTo(0,0);}});
document.querySelector('#pdf-next').addEventListener('click',()=>{if(doc&&pageNumber<doc.numPages){pageNumber++;renderPage();stage.scrollTo(0,0);}});
document.querySelector('#pdf-zoom-out').addEventListener('click',()=>{zoom=Math.max(.5,zoom-.25);renderPage();});
document.querySelector('#pdf-zoom-in').addEventListener('click',()=>{zoom=Math.min(2,zoom+.25);renderPage();});
document.querySelector('#pdf-fullscreen').addEventListener('click',async()=>{
 expanded=!expanded;dialog.classList.toggle('expanded',expanded);document.querySelector('#pdf-fullscreen').setAttribute('aria-label',expanded?'Exit fullscreen':'Enter fullscreen');
 try{if(expanded&&document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else if(!expanded&&document.fullscreenElement)await document.exitFullscreen();}catch{/* Keep the full-window reader when native fullscreen is restricted. */}
 renderPage();
});
document.addEventListener('fullscreenchange',()=>{
 if(document.fullscreenElement)nativeFullscreen=true;
 else if(nativeFullscreen){nativeFullscreen=false;expanded=false;dialog.classList.remove('expanded');document.querySelector('#pdf-fullscreen').setAttribute('aria-label','Enter fullscreen');}
 renderPage();
});
let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(dialog.open)renderPage();},150);});
