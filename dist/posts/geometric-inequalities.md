Some inequalities become more memorable when we can point to the two quantities in a picture. The arithmetic–geometric mean inequality is a particularly good example.

For positive numbers $a$ and $b$, it states that their geometric mean never exceeds their arithmetic mean:

$$\sqrt{ab}\le\frac{a+b}{2}.$$

## Draw the means

Take a segment $AB$ of length $a+b$, and mark a point $D$ between its endpoints so that $AD=a$ and $DB=b$. Draw the semicircle with diameter $AB$.

The perpendicular through $D$ meets the semicircle at $C$. Because the angle in a semicircle is a right angle, $ACB$ is a right triangle, and $CD$ is its altitude to the hypotenuse.

The similar right triangles $ACD$ and $CBD$ give

$$\frac{AD}{CD}=\frac{CD}{DB},\qquad CD^2=AD\cdot DB=ab.$$

So the altitude has length $CD=\sqrt{ab}$.

## Compare with a radius

Let $O$ be the midpoint of $AB$. The semicircle has radius $R=(a+b)/2$. The right triangle $ODC$ gives

$$CD^2=R^2-OD^2\le R^2.$$

Taking nonnegative square roots yields exactly the desired inequality.

<div class="theorem">
<span class="callout-title">Arithmetic–geometric mean · two variables</span>

For $a,b>0$,

$$\sqrt{ab}\le\frac{a+b}{2},$$

with equality if and only if $a=b$.

</div>

Equality means $OD=0$: the dividing point is the centre of the diameter. The geometry shows the equality condition as clearly as the inequality itself.

## The algebra hiding in the picture

Because $OD=|a-b|/2$, the same diagram records the identity

$$\left(\frac{a+b}{2}\right)^2-ab=\left(\frac{a-b}{2}\right)^2.$$

The right-hand side cannot be negative. This is the familiar algebraic proof, now with every term attached to a length.

The nonnegative case follows as well: if either variable is zero, the left side of the original inequality is zero and the right side is nonnegative.

## A rectangle application

Among rectangles with a fixed perimeter $2s$, the side lengths satisfy $a+b=s$. Their area obeys

$$ab\le\frac{(a+b)^2}{4}=\frac{s^2}{4}.$$

Equality holds for the square $a=b=s/2$. With perimeter $20$, the maximum area is $25$, achieved by a $5$ by $5$ square.

## Try the reverse viewpoint

If a rectangle has fixed area $A>0$, then $ab=A$ and

$$2(a+b)\ge4\sqrt A.$$

The square also has the smallest perimeter among rectangles of a given area. The same inequality answers two optimisation questions; only the quantity held fixed has changed.

A good diagram is not just an illustration beside a proof. Sometimes it is the proof, with the algebra waiting to be read off.
