Draw a circle and choose a point outside it. Send a line from that point through the circle. There are two intersection points, so there are two distances to measure.

Rotate the line. Each distance changes, but their product does not. This is the **power of a point**, one of the most reusable ideas in circle geometry.

## The invariant product

Let a circle have centre $O$ and radius $r$, and let $P$ be outside it. A secant through $P$ meets the circle first at $A$ and then at $B$.

<div class="theorem">
<span class="callout-title">Secant theorem</span>

For every such secant,

$$PA\cdot PB=PO^2-r^2.$$

The right-hand side depends only on the point and circle. It does not depend on the direction of the secant.

</div>

## A coordinate proof

Put $P$ at the origin and choose a unit vector $\mathbf u$ along the secant ray. Points on the line have the form $t\mathbf u$. If $\mathbf o$ is the position vector of $O$, the circle equation is

$$\|t\mathbf u-\mathbf o\|^2=r^2.$$

Expanding and using $\|\mathbf u\|=1$ gives

$$t^2-2(\mathbf u\cdot\mathbf o)t+\|\mathbf o\|^2-r^2=0.$$

The two roots are the distances $PA$ and $PB$. By the product-of-roots formula, their product is $\|\mathbf o\|^2-r^2=PO^2-r^2$.

This proof is short because it translates “two intersections with a circle” into “two roots of a quadratic.”

## Tangents are the limiting case

If $PT$ is tangent to the circle at $T$, then $OT$ is perpendicular to $PT$. Pythagoras immediately gives

$$PT^2=PO^2-r^2=PA\cdot PB.$$

For example, if the near intersection is $3$ units from $P$ and the far intersection is $12$ units away, the tangent length is $\sqrt{3\cdot12}=6$.

Be careful: $PB$ is the **whole distance from $P$ to the far intersection**, not just the part of the secant inside the circle.

## What if the point is inside?

The signed power is still $PO^2-r^2$, now negative. If two chords $AB$ and $CD$ meet at an interior point $P$, their unsigned segment lengths satisfy

$$PA\cdot PB=PC\cdot PD=r^2-PO^2.$$

<div class="note">
<span class="callout-title">A sign worth remembering</span>

Outside: signed power is positive. On the circle: zero. Inside: negative. The familiar intersecting-chords formula uses positive lengths, so it equals the negative of the signed power.

</div>

## Two circles, one straight line

For circles with centres $O_1,O_2$ and radii $r_1,r_2$, the points of equal power satisfy

$$\|\mathbf x-\mathbf o_1\|^2-r_1^2=\|\mathbf x-\mathbf o_2\|^2-r_2^2.$$

The $\|\mathbf x\|^2$ terms cancel. When the centres differ, what remains is a linear equation: the **radical axis**, perpendicular to the line of centres. If the circles meet in two points, their common chord lies on this line.

Try it with circles $x^2+y^2=25$ and $(x-6)^2+y^2=9$. Equating powers yields $x=13/3$. A circle problem has quietly become a line problem.
