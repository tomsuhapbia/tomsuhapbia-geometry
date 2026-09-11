"""Rebuild the original, three-page reading-room notes with ReportLab."""
from pathlib import Path
import json, math
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.colors import HexColor
from pypdf import PdfReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Embed fonts so mathematical inequality symbols render in every PDF reader.
# Windows ships Times New Roman; on other platforms set GEOMETRY_FONT_DIR to
# a directory containing times.ttf, timesbd.ttf, timesi.ttf, and timesbi.ttf.
import os
font_dir=Path(os.environ.get('GEOMETRY_FONT_DIR', 'C:/Windows/Fonts'))
for name,file in [('Times-Roman','times.ttf'),('Times-Bold','timesbd.ttf'),('Times-Italic','timesi.ttf'),('Times-BoldItalic','timesbi.ttf')]:
 pdfmetrics.registerFont(TTFont(name,str(font_dir/file)))
pdfmetrics.registerFontFamily('Times-Roman',normal='Times-Roman',bold='Times-Bold',italic='Times-Italic',boldItalic='Times-BoldItalic')

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist' / 'pdf'
OUT.mkdir(parents=True, exist_ok=True)
W,H=A4
INK=HexColor('#161616'); MUTED=HexColor('#696969'); LINE=HexColor('#dedede')
styles={
 'body':ParagraphStyle('body',fontName='Times-Roman',fontSize=12,leading=18,textColor=INK,spaceAfter=13),
 'small':ParagraphStyle('small',fontName='Helvetica',fontSize=9,leading=14,textColor=MUTED),
 'h2':ParagraphStyle('h2',fontName='Times-Bold',fontSize=19,leading=24,textColor=INK,spaceAfter=15),
 'formula':ParagraphStyle('formula',fontName='Times-Italic',fontSize=15,leading=24,textColor=INK,alignment=1,spaceAfter=16),
}

class Note:
 def __init__(self,slug,title,topic,date):
  self.slug=slug; self.title=title; self.topic=topic; self.date=date; self.page=0
  self.c=canvas.Canvas(str(OUT/(slug+'.pdf')),pagesize=A4,pageCompression=1)
  self.c.setTitle(title); self.c.setAuthor('tomsuhapbia'); self.c.setSubject(topic+' - proofs, examples, and exercises')
 def new_page(self,kicker,title):
  if self.page: self.c.showPage()
  self.page+=1;c=self.c;c.setFillColor(INK);c.setFont('Helvetica',9);c.drawString(54,H-39,"tomsuhapbia's Geometry")
  c.setFillColor(MUTED);c.setFont('Helvetica',8);c.drawRightString(W-54,H-39,'THE READING ROOM  /  '+self.topic.upper())
  c.setStrokeColor(LINE);c.setLineWidth(.6);c.line(54,H-51,W-54,H-51)
  c.setFillColor(MUTED);c.setFont('Helvetica',8);c.drawString(54,H-83,kicker.upper())
  self.y=H-98;self.p(title,'h2');self.y-=6
  c.setStrokeColor(LINE);c.line(54,47,W-54,47);c.setFillColor(MUTED);c.setFont('Helvetica',8)
  c.drawString(54,32,self.date+'  |  Notes for curious learners');c.drawRightString(W-54,32,f'{self.page} / 3')
 def p(self,text,style='body'):
  p=Paragraph(text,styles[style]);_,height=p.wrap(W-108,1000)
  if self.y-height<68:raise RuntimeError(f'Page overflow: {self.slug}, page {self.page}')
  p.drawOn(self.c,54,self.y-height);self.y-=height+styles[style].spaceAfter
 def heading(self,text):self.y-=10;self.p(text,'h2')
 def diagram(self,kind):
  c=self.c; ox=W/2; oy=self.y-125;c.saveState();c.setStrokeColor(LINE);c.setLineWidth(.8)
  if kind=='euler':
   a=(-66,97);b=(-110,-45);d=(110,-45)
   o=(0,(a[0]**2+a[1]**2-b[0]**2-b[1]**2)/(2*(a[1]-b[1])))
   g=((a[0]+b[0]+d[0])/3,(a[1]+b[1]+d[1])/3);h=(a[0]+b[0]+d[0]-2*o[0],a[1]+b[1]+d[1]-2*o[1])
   c.setDash(3,4);c.circle(ox+o[0],oy+o[1],math.dist(o,a),stroke=1,fill=0)
   for p,q in [(a,((b[0]+d[0])/2,(b[1]+d[1])/2)),(b,((a[0]+d[0])/2,(a[1]+d[1])/2)),(d,((a[0]+b[0])/2,(a[1]+b[1])/2))]:c.line(ox+p[0],oy+p[1],ox+q[0],oy+q[1])
   c.setDash();c.setStrokeColor(INK);c.setLineWidth(1)
   for p,q in [(a,b),(b,d),(d,a),(o,h)]:c.line(ox+p[0],oy+p[1],ox+q[0],oy+q[1])
   for name,p,dx,dy in [('A',a,-3,9),('B',b,-16,-8),('C',d,8,-8),('O',o,6,9),('G',g,2,-16),('H',h,-15,2)]:
    c.setFillColor(INK);c.circle(ox+p[0],oy+p[1],2,fill=1,stroke=0);c.setFont('Times-Italic',11);c.drawString(ox+p[0]+dx,oy+p[1]+dy,name)
  elif kind=='circle':
   c.setStrokeColor(INK);c.circle(ox+20,oy,85);c.setLineWidth(1);c.line(ox-150,oy-40,ox+135,oy-40)
   c.setDash(3,4);c.setStrokeColor(LINE);c.line(ox-150,oy-40,ox+20,oy);c.setDash()
   dx=math.sqrt(85**2-40**2)
   for label,x,y in [('P',-150,-40),('A',20-dx,-40),('B',20+dx,-40),('O',20,0)]:
    c.setFillColor(INK);c.circle(ox+x,oy+y,2,fill=1,stroke=0);c.setFont('Times-Italic',12);c.drawString(ox+x-4,oy+y+10,label)
  elif kind=='coordinate':
   c.line(ox-150,oy-65,ox+150,oy-65);c.line(ox-110,oy-85,ox-110,oy+110);c.setStrokeColor(INK)
   points=[(ox-110,oy-65),(ox+130,oy-65),(ox-30,oy+95)]
   for p,q in zip(points,points[1:]+points[:1]):c.line(*p,*q)
   c.setDash(3,4);c.line(ox-30,oy-65,ox-30,oy+95);c.line(ox-110,oy-65,ox-30,oy+15);c.setDash()
   for label,x,y in [('A (0,0)',-125,-82),('B (6,0)',105,-82),('C (2,4)',-47,103),('H (2,2)',-20,14)]:c.setFillColor(INK);c.setFont('Times-Italic',11);c.drawString(ox+x,oy+y,label)
  else:
   c.setStrokeColor(INK);c.arc(ox-130,oy-110,ox+130,oy+150,startAng=0,extent=180);c.line(ox-130,oy+20,ox+130,oy+20)
   x=-45;y=math.sqrt(130**2-x*x)+20;c.line(ox+x,oy+20,ox+x,oy+y)
   c.setStrokeColor(LINE);c.line(ox-130,oy+20,ox+x,oy+y);c.line(ox+130,oy+20,ox+x,oy+y)
   for label,px,py in [('A',-142,9),('B',136,9),('D',x-4,3),('C',x-3,y+8),('a',-91,2),('b',35,2)]:c.setFillColor(INK);c.setFont('Times-Italic',12);c.drawString(ox+px,oy+py,label)
  c.restoreState();self.y-=270
 def save(self):
  self.c.save();reader=PdfReader(OUT/(self.slug+'.pdf'))
  assert len(reader.pages)==3
  assert all(len(p.extract_text())>400 for p in reader.pages)

n=Note('triangle-centres','A field guide to triangle centres','Euclidean geometry','10 September 2026')
n.new_page('01 / The picture','A field guide to triangle centres')
n.p('Three familiar constructions lead to three special points. Their connection is one of the most satisfying first results in triangle geometry.')
n.diagram('euler')
n.p('<b>Centroid G.</b> The medians join each vertex to the midpoint of the opposite side. Their common point divides each median in the ratio 2:1, measured from the vertex.')
n.p('<b>Circumcentre O.</b> The perpendicular bisectors meet at the centre of the circle through all three vertices.')
n.p('<b>Orthocentre H.</b> The altitudes are the lines through the vertices perpendicular to their opposite sides. Their common point is H.')
n.new_page('02 / The proof','The Euler line, in vectors')
n.p('Assume ABC is non-degenerate. Place the origin at its circumcentre O, and let a, b, c be the position vectors of A, B, C. All have the same length R.')
n.p('|a|<super>2</super> = |b|<super>2</super> = |c|<super>2</super> = R<super>2</super>','formula')
n.p('The centroid has vector g = (a + b + c)/3. Indeed, the point two-thirds of the way from A to the midpoint of BC has exactly this vector; the same holds for the other medians.')
n.heading('A candidate for the orthocentre')
n.p('Set h = a + b + c. The vector from A to this point is b + c. The direction of BC is b - c. Their dot product is')
n.p('(b + c) · (b - c) = |b|<super>2</super> - |c|<super>2</super> = 0.','formula')
n.p('Thus the candidate lies on the altitude from A. Cycling the letters proves that it lies on all three altitudes. It is H.')
n.heading('Read off the conclusion')
n.p('We have h = 3g. Since O is the origin, O, G, H are collinear and G is one-third of the way from O to H. For a non-equilateral triangle:')
n.p('OG : GH = 1 : 2.','formula')
n.p('For an equilateral triangle all three centres coincide. The vector identity is still true, but these points no longer determine a unique line.','small')
n.new_page('03 / Your turn','An example, and two exercises')
n.p('<b>Worked example.</b> Take A = (0,3), B = (-2,0), C = (2,0). Symmetry puts O on the vertical axis. Write O = (0,t) and equate squared distances to A and B:')
n.p('(3 - t)<super>2</super> = 4 + t<super>2</super>, so t = 5/6.','formula')
n.p('Hence O = (0,5/6), G = (0,1), and H = 3G - 2O = (0,4/3). The distances OG = 1/6 and GH = 1/3 give the promised ratio. In arbitrary coordinates, use H = A + B + C - 2O.')
n.heading('Exercises')
n.p('<b>1.</b> In a right triangle, identify H and O without calculation. Describe the Euler line.')
n.p('<b>2.</b> For A = (0,0), B = (6,0), C = (0,8), calculate O, G, and H. Verify the vector identity.')
n.heading('Solutions')
n.p('<b>1.</b> H is the right-angle vertex, because the legs themselves are altitudes. O is the midpoint of the hypotenuse. The Euler line joins those two points.')
n.p('<b>2.</b> O = (3,4), G = (2,8/3), H = (0,0). Then 3G - 2O = (6,8) - (6,8) = (0,0). The lengths are OG = 5/3 and GH = 10/3.')
n.p('Further reading in the journal: "Three centres. One remarkable line." These notes give an original exposition of a classical result.','small');n.save()

n=Note('circle-toolkit','The circle geometry toolkit','Euclidean geometry','8 September 2026')
n.new_page('01 / The invariant','The circle geometry toolkit')
n.p('For a circle with centre O and radius r, the signed power of a point P is PO<super>2</super> - r<super>2</super>. One quantity unifies secants, tangents, and intersecting chords.')
n.diagram('circle')
n.p('<b>Exterior secant.</b> If a ray from an exterior point P meets the circle first at A and then at B, then PA · PB = PO<super>2</super> - r<super>2</super>.')
n.p('<b>Tangent.</b> If PT is tangent at T, then PT<super>2</super> = PO<super>2</super> - r<super>2</super>. The radius OT is perpendicular to PT.')
n.p('<b>Interior chords.</b> If chords AB and CD cross at an interior point P, then PA · PB = PC · PD = r<super>2</super> - PO<super>2</super>, using positive lengths.')
n.new_page('02 / Why it works','A quadratic remembers both intersections')
n.p('Put P at the origin. Let u be a unit vector along the secant, and let o be the position vector of the centre. A point tu lies on the circle exactly when')
n.p('|tu - o|<super>2</super> = r<super>2</super>.','formula')
n.p('Expanding gives a quadratic in the signed line coordinate t:')
n.p('t<super>2</super> - 2(u · o)t + |o|<super>2</super> - r<super>2</super> = 0.','formula')
n.p('By the product-of-roots identity, the two intersection coordinates have product |o|<super>2</super> - r<super>2</super>. For an exterior point and a secant ray, both roots are positive, giving PA · PB.')
n.heading('The radical axis')
n.p('For two circles, write the power of X to each and equate the expressions. The quadratic X · X terms cancel, leaving a linear equation when the centres differ. The resulting line is called the radical axis.')
n.p('Example: compare x<super>2</super> + y<super>2</super> = 25 and (x - 6)<super>2</super> + y<super>2</super> = 9. Equality of powers gives')
n.p('x<super>2</super> + y<super>2</super> - 25 = (x - 6)<super>2</super> + y<super>2</super> - 9,','formula')
n.p('so 12x = 52, or x = 13/3. The radical axis is perpendicular to the horizontal line joining the centres.')
n.p('For concentric circles of different radii there is no equal-power locus; for identical circles every point has equal power.','small')
n.new_page('03 / Practice','Get the lengths in the right order')
n.p('<b>Worked example.</b> From an exterior point, the near intersection is 3 units away and the far intersection is 12 units away. The power is 36, so a tangent from that point has length 6.')
n.p('The product uses the whole distance to the far intersection. The segment inside the circle has length 9, but multiplying 3 by 9 would give the wrong answer.')
n.heading('Exercises')
n.p('<b>1.</b> A tangent from P has length 8. A secant meets the circle first 4 units from P. How far from P is the second intersection?')
n.p('<b>2.</b> Chords cross at P inside a circle. One has segment lengths 2 and 9; the other has one segment of length 3. Find its remaining segment.')
n.p('<b>3.</b> A circle has radius 5, and PO = 3. Find the signed power of P and the positive product of the segments of any chord through P.')
n.heading('Solutions')
n.p('<b>1.</b> The power is 8<super>2</super> = 64. Thus 4 · PB = 64, giving PB = 16. The portion inside the circle is 12.')
n.p('<b>2.</b> Equal products give 2 · 9 = 3x, so x = 6.')
n.p('<b>3.</b> The signed power is 3<super>2</super> - 5<super>2</super> = -16. The positive chord-segment product is 16.')
n.p('Habit to keep: decide whether you are using signed coordinates or positive segment lengths before writing a power equation.','small');n.save()

n=Note('coordinate-methods','Coordinates that do the work','Analytic geometry','5 September 2026')
n.new_page('01 / Set the stage','Coordinates that do the work')
n.p('An effective coordinate proof begins by removing unnecessary variables. Put an important side on an axis and choose an origin that makes the geometry easy to read.')
n.diagram('coordinate')
n.p('For a triangle with base length c > 0, take A = (0,0), B = (c,0), and C = (u,v), with v > 0. The altitude from C is simply the vertical line x = u.')
n.p('We allow u to lie outside [0,c]. That keeps the method valid when the perpendicular from C meets the extension of AB.')
n.p('<b>Key tool.</b> Two nonzero vectors are perpendicular exactly when their dot product is zero. This avoids the vertical-line exceptions of slope formulas.')
n.new_page('02 / The calculation','Concurrency, as part of the proof')
n.p('Write H = (u,h) for the intersection of the altitude from C with the altitude from A. The direction of BC is (u - c,v). Perpendicularity gives')
n.p('(u,h) · (u - c,v) = u(u - c) + hv = 0.','formula')
n.p('Because v is nonzero, we can solve for h:')
n.p('H = (u, u(c - u)/v).','formula')
n.heading('Check the third altitude')
n.p('The vector BH is (u - c, u(c - u)/v), and AC is (u,v). Their dot product is')
n.p('u(u - c) + u(c - u) = 0.','formula')
n.p('So BH is perpendicular to AC. All three altitudes meet at H; the calculation has proved concurrency as well as locating the point.')
n.heading('Read the sign geometrically')
n.p('If 0 < u < c, then the vertical coordinate of H is positive. If u < 0 or u > c, it is negative. If u equals 0 or c, the triangle has a right angle at A or B and H is that vertex.')
n.p('Positive height alone does not mean the triangle is acute. For instance, H can lie above C when the angle at C is obtuse. Always interpret all the coordinates, not just one sign.')
n.new_page('03 / Practice','Choose, compute, check')
n.p('<b>Worked example.</b> For A = (0,0), B = (6,0), and C = (2,4), the formula gives H = (2,2). AH has direction (2,2), and BC has direction (-4,4). Their dot product is zero.')
n.heading('Exercises')
n.p('<b>1.</b> Find H for A = (0,0), B = (4,0), C = (1,3).')
n.p('<b>2.</b> Find H when B = (6,0) and C = (-2,4), keeping A at the origin. Explain the sign of its vertical coordinate.')
n.p('<b>3.</b> For A = (0,0), B = (6,0), C = (3,2), find H. Is the angle at C acute or obtuse?')
n.heading('Solutions')
n.p('<b>1.</b> H = (1, 1(4 - 1)/3) = (1,1).')
n.p('<b>2.</b> H = (-2, (-2)(6 + 2)/4) = (-2,-4). The vertex C lies left of A, making angle A obtuse; H lies below the base.')
n.p('<b>3.</b> H = (3, 3(6 - 3)/2) = (3,9/2). At C, the vectors CA = (-3,-2) and CB = (3,-2) have dot product -5. Thus angle C is obtuse, and H lies above C.')
n.p('Checklist: state non-degeneracy, choose axes, express perpendicularity with dot products, and interpret the answer in the original picture.','small');n.save()

n=Note('geometric-inequalities','Geometric inequalities and proofs','Inequalities','28 August 2026')
n.new_page('01 / A visual proof','Geometric inequalities and proofs')
n.p('A semicircle gives a picture of the arithmetic-geometric mean inequality. Let AD = a > 0 and DB = b > 0. Draw the semicircle on diameter AB, and erect DC perpendicular to AB.')
n.diagram('amgm')
n.p('The angle ACB is right. Similarity of the two smaller right triangles gives CD<super>2</super> = AD · DB = ab. Thus CD is the geometric mean of a and b.')
n.p('The radius is R = (a + b)/2. If O is the midpoint of AB, the right triangle ODC gives CD<super>2</super> = R<super>2</super> - OD<super>2</super>, so CD cannot exceed R.')
n.p('sqrt(ab) ≤ (a + b)/2, with equality exactly when a = b.','formula')
n.new_page('02 / Related results','Three inequalities to keep nearby')
n.p('<b>1. Arithmetic-geometric mean.</b> For a,b ≥ 0,')
n.p('(a + b)<super>2</super> ≥ 4ab.','formula')
n.p('Proof: subtract 4ab from the left to obtain (a - b)<super>2</super> ≥ 0. Equality holds exactly when a = b. For positive variables, taking square roots gives the familiar mean inequality.')
n.p('<b>2. Triangle inequality for lengths.</b> The side lengths a,b,c of a non-degenerate triangle satisfy a + b > c, with analogous inequalities after cycling the sides.')
n.p('Proof: the broken path along two sides is longer than the straight segment joining its endpoints. More algebraically, the cosine law gives c<super>2</super> = a<super>2</super> + b<super>2</super> - 2ab cos C < (a + b)<super>2</super>, since 0 < C < 180 degrees.')
n.p('<b>3. Two-dimensional Cauchy-Schwarz.</b> For real x,y,u,v,')
n.p('(xu + yv)<super>2</super> ≤ (x<super>2</super> + y<super>2</super>)(u<super>2</super> + v<super>2</super>).','formula')
n.p('Proof: the right-hand side minus the left-hand side equals (xv - yu)<super>2</super>, which is nonnegative. Equality holds exactly when xv = yu, meaning the two vectors are linearly dependent.')
n.p('The common theme is to make the difference between two sides visibly nonnegative. A square, a length, or an area is often the right object.','small')
n.new_page('03 / Practice','Optimisation without calculus')
n.p('<b>Worked example.</b> A rectangle has perimeter 20. If its side lengths are a and b, then a + b = 10. AM-GM gives ab ≤ 25, attained exactly at a = b = 5. The square has the largest area.')
n.heading('Exercises')
n.p('<b>1.</b> A rectangle has area 36. What is its smallest possible perimeter?')
n.p('<b>2.</b> If x<super>2</super> + y<super>2</super> = 1, what is the largest possible value of 3x + 4y?')
n.p('<b>3.</b> Two sides of a triangle have lengths 5 and 8. What open interval contains its third side c?')
n.heading('Solutions')
n.p('<b>1.</b> AM-GM gives a + b ≥ 2 sqrt(36) = 12. The perimeter is at least 24, attained by the 6 by 6 square.')
n.p('<b>2.</b> Cauchy-Schwarz gives (3x + 4y)<super>2</super> ≤ 25, so 3x + 4y ≤ 5. Equality is attained at (x,y) = (3/5,4/5).')
n.p('<b>3.</b> The triangle inequalities give c < 13 and c > 8 - 5 = 3. Hence 3 < c < 13. Both endpoints would make a degenerate triangle.')
n.p('When solving an optimisation problem, always state both the bound and a configuration that attains it. Without the second part, you may only have an estimate.','small');n.save()

manifest={}
for path in sorted(OUT.glob('*.pdf')):
 reader=PdfReader(path)
 manifest[path.stem]={'bytes':path.stat().st_size,'pages':len(reader.pages)}
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
print(json.dumps(manifest,indent=2))
