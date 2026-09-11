export const topics = [
 {id:'euclidean',name:'Euclidean geometry',description:'Circles, triangles, and the surprising lines that connect them.',symbol:'△'},
 {id:'analytic',name:'Analytic geometry',description:'Where a geometric picture meets the language of coordinates.',symbol:'↗'},
 {id:'combinatorics',name:'Combinatorics',description:'Counting carefully. Finding patterns. Making the finite interesting.',symbol:'⋮'},
 {id:'advanced',name:'Advanced mathematics',description:'A little further into inequalities, analysis, and elegant arguments.',symbol:'∞'}
];
export const articles = [
 {slug:'the-euler-line',title:'Three centres. One remarkable line.',subtitle:'Finding the Euler line',topic:'euclidean',date:'2026-09-10',readTime:7,kind:'euler',tags:['Triangle centres','Vectors','Proof'],description:'The centroid, circumcentre, and orthocentre seem to have little in common. A single vector identity brings them together.',pdf:'triangle-centres'},
 {slug:'power-of-a-point',title:'One point, many circles.',subtitle:'The power of a point',topic:'euclidean',date:'2026-09-08',readTime:6,kind:'circle',tags:['Circles','Olympiad','Proof'],description:'A product of distances that stays the same, whichever secant you choose. A useful idea hiding in a simple diagram.',pdf:'circle-toolkit'},
 {slug:'coordinates-that-help',title:'Choose your coordinates wisely.',subtitle:'A shorter route to a geometric proof',topic:'analytic',date:'2026-09-05',readTime:5,kind:'analytic',tags:['Coordinates','Triangles','Technique'],description:'A well-placed origin can turn a difficult construction into a few lines of algebra.',pdf:'coordinate-methods'},
 {slug:'counting-diagonals',title:'The art of counting twice.',subtitle:'Diagonals, intersections, and double counting',topic:'combinatorics',date:'2026-09-02',readTime:5,kind:'combinatorics',tags:['Counting','Polygons','Combinations'],description:'Start with a polygon. Count its diagonals two different ways. Discover why the viewpoint matters.'},
 {slug:'geometric-inequalities',title:'An inequality with a picture.',subtitle:'The arithmetic–geometric mean inequality',topic:'advanced',date:'2026-08-28',readTime:5,kind:'amgm',tags:['Inequalities','AM–GM','Proof'],description:'A semicircle, a perpendicular, and one of the most useful inequalities in mathematics.',pdf:'geometric-inequalities'},
 {slug:'ceva-area-proof',title:'When three cevians agree.',subtitle:'An area proof of Ceva’s theorem',topic:'euclidean',date:'2026-08-24',readTime:6,kind:'triangle',tags:['Ceva','Areas','Olympiad'],description:'Three lines through a triangle meet at a point. Ratios of areas explain exactly when this happens.'}
];
export const pdfs = [
 {id:'triangle-centres',title:'A field guide to triangle centres',topic:'euclidean',date:'2026-09-10',tags:['Euler line','Vectors'],description:'Centroid, circumcentre, orthocentre, and a vector proof of the Euler line.',pages:3},
 {id:'circle-toolkit',title:'The circle geometry toolkit',topic:'euclidean',date:'2026-09-08',tags:['Power of a point','Circles'],description:'Secants, tangents, and the radical axis, with worked examples and exercises.',pages:3},
 {id:'coordinate-methods',title:'Coordinates that do the work',topic:'analytic',date:'2026-09-05',tags:['Coordinates','Proof methods'],description:'Choosing an origin, using dot products, and a complete altitude calculation.',pages:3},
 {id:'geometric-inequalities',title:'Geometric inequalities & proofs',topic:'advanced',date:'2026-08-28',tags:['AM–GM','Inequalities'],description:'Three classical inequalities, visual reasoning, and practice with solutions.',pages:3}
];
export const topicName = id => topics.find(t=>t.id===id)?.name || 'Mathematics';
export const formatDate = date => new Date(date+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
