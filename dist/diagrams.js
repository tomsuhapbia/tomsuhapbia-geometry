export function diagram(kind = 'euler', label) {
 const point=(x,y,name,dx=8,dy=-10)=>`<circle class="point" cx="${x}" cy="${y}" r="3"/><text x="${x+dx}" y="${y+dy}">${name}</text>`;
 let drawing='';
 if(kind==='circle'){
  const ox=250,oy=180,r=120,px=40,py=265,dx=px-ox,dy=py-oy,d2=dx*dx+dy*dy;
  const t1=r*r/d2,t2=r*Math.sqrt(d2-r*r)/d2;
  const tx=ox+t1*dx+t2*dy,ty=oy+t1*dy-t2*dx;
  const chord=Math.sqrt(r*r-(py-oy)**2);
  drawing=`<circle class="primary" cx="${ox}" cy="${oy}" r="${r}"/><path class="primary" d="M${px} ${py}H415 M${px} ${py} ${tx} ${ty}"/><path class="construction" d="M${px} ${py} ${ox} ${oy} ${tx} ${ty}"/>${point(px,py,'P',-5,25)}${point(ox-chord,py,'A',-6,25)}${point(ox+chord,py,'B',4,25)}${point(ox,oy,'O')}${point(tx,ty,'T',-3,-12)}`;
  label ||= 'An exterior point P, secant PAB, tangent PT, and circle with centre O';
 }else if(kind==='analytic'){
  drawing=`<path class="fine" d="M55 310H440 M100 350V35"/><path class="primary" d="M100 310H400L200 110Z"/><path class="construction" d="M200 110V310 M100 310 200 210 400 310"/><path class="primary" d="M200 297H213V310"/>${point(100,310,'A',-20,25)}${point(400,310,'B',5,25)}${point(200,110,'C',-5,-15)}${point(200,210,'H')}<text x="440" y="304">x</text><text x="112" y="44">y</text>`;
  label ||= 'Coordinate triangle A at (0,0), B at (6,0), C at (2,4), with orthocentre H at (2,2)';
 }else if(kind==='combinatorics'){
  const vertices=Array.from({length:6},(_,i)=>[240+145*Math.cos(i*Math.PI/3-Math.PI/2),200+145*Math.sin(i*Math.PI/3-Math.PI/2)]);
  drawing=`<circle class="construction" cx="240" cy="200" r="145"/><path class="primary" d="M${vertices.map(v=>v.join(' ')).join('L')}Z"/>`;
  vertices.forEach((v,i)=>{vertices.forEach((w,j)=>{if(j>i&&j-i!==1&&j-i!==5)drawing+=`<path class="${j-i===3?'primary':'construction'}" d="M${v.join(' ')} ${w.join(' ')}"/>`;});drawing+=point(...v,String.fromCharCode(65+i));});
  label ||= 'A regular hexagon and all nine diagonals, with three diagonals meeting at the centre';
 }else if(kind==='amgm'){
  const cx=190,cy=275-Math.sqrt(160**2-50**2);
  drawing=`<path class="primary" d="M80 275A160 160 0 0 1 400 275H80 M190 275V${cy}"/><path class="construction" d="M80 275 ${cx} ${cy} 400 275 M240 275 ${cx} ${cy}"/><path class="primary" d="M190 261H204V275"/>${point(80,275,'A',-15,22)}${point(400,275,'B',8,22)}${point(190,275,'D',-6,25)}${point(cx,cy,'C',-5,-15)}${point(240,275,'O',-5,25)}<text x="130" y="299">a</text><text x="320" y="299">b</text>`;
  label ||= 'A semicircle on diameter AB, with AD equal to a, DB equal to b, and perpendicular DC equal to the square root of ab';
 }else{
  const cy=201.6,r=Math.hypot(136,255-cy);
  drawing=`<circle class="construction" cx="240" cy="${cy}" r="${r}"/><path class="fine" d="M40 ${cy}H440 M240 25V380"/><path class="primary" d="M159 80 104 255 376 255Z"/><path class="construction" d="M159 80 240 255 M104 255 267.5 167.5 M376 255 131.5 167.5"/>`;
  if(kind==='euler')drawing+=`<path class="accent-line" d="M105 176.933 325 217.13"/>${point(240,201.6,'O',8,-12)}${point(213,196.667,'G',-4,24)}${point(159,186.8,'H',-20,-5)}`;
  else drawing+=point(213,196.667,'P',-4,23);
  drawing+=point(159,80,'A',-6,-15)+point(104,255,'B',-22,16)+point(376,255,'C',9,16);
  label ||= kind==='euler'?'Triangle ABC with collinear circumcentre O, centroid G, and orthocentre H':'Triangle ABC with three concurrent medians';
 }
 return `<svg class="geometry-diagram" viewBox="0 0 480 400" role="img" aria-label="${label}">${drawing}</svg>`;
}
export const icons = {
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
 moon:'<path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
 arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
 upRight:'<path d="M6 18 18 6M6 6h12v12"/>',
 close:'<path d="m6 6 12 12M6 18 18 6"/>',
 menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
 file:'<path d="M14 3H5v18h14V8Z M14 3v5h5M8 12h8M8 16h6"/>',
 download:'<path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5"/>',
 expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
 prev:'<path d="m14 6-6 6 6 6"/>', next:'<path d="m10 6 6 6-6 6"/>', plus:'<path d="M5 12h14M12 5v14"/>', minus:'<path d="M5 12h14"/>',
 grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
 list:'<path d="M8 5h13M8 12h13M8 19h13M3 5h1M3 12h1M3 19h1"/>', book:'<path d="M12 5v16M12 5C8 2 3 3 3 3v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2Z"/>'
};
export const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.arrow}</svg>`;
