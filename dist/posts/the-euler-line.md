Some constructions feel unrelated until you draw them on the same page. The **centroid** balances a triangle. The **circumcentre** sits equally far from its vertices. The **orthocentre** is where its altitudes meet.

For every non-equilateral triangle, these three points lie on one straight line. Better still, one of the distances is always twice the other.

## Meet the three centres

Let $ABC$ be a non-degenerate triangle. Write $G$ for its centroid, $O$ for its circumcentre, and $H$ for its orthocentre.

- The three **medians** join a vertex to the midpoint of the opposite side. They meet at $G$.
- The **perpendicular bisectors** of the sides meet at $O$. This is the centre of the circle through $A$, $B$, and $C$.
- The **altitudes** pass through each vertex perpendicular to its opposite side. They meet at $H$.

The definitions use different constructions, but vectors reveal a common structure.

## Put the origin in the right place

Choose $O$ as the origin. Let the position vectors of the vertices be $\mathbf a$, $\mathbf b$, and $\mathbf c$. Since they lie on the circumcircle of radius $R$,

$$\|\mathbf a\|^2=\|\mathbf b\|^2=\|\mathbf c\|^2=R^2.$$

The centroid is the average of the three vertex vectors:

$$\mathbf g=\frac{\mathbf a+\mathbf b+\mathbf c}{3}.$$

To see why, let $M$ be the midpoint of $BC$. Its vector is $(\mathbf b+\mathbf c)/2$, so the point two-thirds of the way from $A$ to $M$ has precisely this vector. The same calculation works for all three medians.

## Find the orthocentre

Consider the point with vector $\mathbf h=\mathbf a+\mathbf b+\mathbf c$. We can check that it lies on the altitude from $A$ without constructing anything else.

<div class="proof">
<span class="callout-title">Proof · a dot product does the work</span>

The vector from $A$ to this point is $\mathbf h-\mathbf a=\mathbf b+\mathbf c$. The direction of $BC$ is $\mathbf b-\mathbf c$. Their dot product is

$$ (\mathbf b+\mathbf c)\cdot(\mathbf b-\mathbf c)=\|\mathbf b\|^2-\|\mathbf c\|^2=0. $$

So $AH$ is perpendicular to $BC$. Cycling the letters gives the other two altitudes. The candidate point is therefore the orthocentre.

</div>

## The line appears

We have $\mathbf h=3\mathbf g$. Since $O$ is the origin, this means $O$, $G$, and $H$ are collinear, with $G$ one-third of the way from $O$ to $H$.

<div class="theorem">
<span class="callout-title">The Euler line</span>

In a non-equilateral triangle, the circumcentre $O$, centroid $G$, and orthocentre $H$ lie on one line, and

$$\overrightarrow{OH}=3\overrightarrow{OG},\qquad OG:GH=1:2.$$

</div>

The equilateral case deserves a sentence: all three centres coincide. The vector identity still holds, but a unique Euler line is no longer determined.

## Take it a little further

Try $A=(0,3)$, $B=(-2,0)$, and $C=(2,0)$. Symmetry puts $O$ on the vertical axis. Equating $OA^2$ and $OB^2$ gives $O=(0,5/6)$.

The centroid is $G=(0,1)$. Our identity then gives $H=3G-2O=(0,4/3)$ in these original coordinates. The distances are $OG=1/6$ and $GH=1/3$, exactly as promised.

The useful habit is broader than this theorem: **choose an origin that makes the equal lengths visible in the algebra.** Here, the circumcentre turns three geometric facts into three equal norms, and the rest follows.
