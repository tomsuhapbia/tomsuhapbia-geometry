Coordinates are not a surrender to computation. Used well, they are a way of recording only the information a proof actually needs.

The real work often happens before the first equation: deciding which point should be the origin and which line should be an axis.

## Give the picture a simple frame

Suppose we have a triangle with base length $c>0$. Place the base on the horizontal axis:

$$A=(0,0),\qquad B=(c,0),\qquad C=(u,v),\quad v>0.$$

The parameter $u$ allows the top vertex to move horizontally. We do not assume that its perpendicular projection falls inside the base; $u$ may be negative or larger than $c$.

In these coordinates, the altitude from $C$ is simply $x=u$. This is already a useful simplification.

## Find an altitude without a slope

Let $H=(u,h)$ be the orthocentre. The altitude from $A$ is perpendicular to $BC$, whose direction vector is $(u-c,v)$. Therefore

$$ (u,h)\cdot(u-c,v)=0.$$

Solving gives

$$h=\frac{u(c-u)}{v},\qquad H=\left(u,\frac{u(c-u)}{v}\right).$$

<div class="note">
<span class="callout-title">Why dot products?</span>

The slope rule $m_1m_2=-1$ needs separate handling for vertical lines. A zero dot product expresses perpendicularity without that exception.

</div>

## Check the third altitude

The direction from $B$ to $H$ is $(u-c,u(c-u)/v)$. The direction of $AC$ is $(u,v)$. Their dot product is

$$u(u-c)+\frac{u(c-u)}{v}\,v=0.$$

So the third altitude passes through the same point. We have proved concurrency as part of the calculation.

Notice what the formula says geometrically. When $0<u<c$, the orthocentre lies above the base. If $u<0$ or $u>c$, its vertical coordinate is negative. The algebra records the change in the triangle's shape.

## A numerical example

Take $A=(0,0)$, $B=(6,0)$, and $C=(2,4)$. Substitution gives

$$H=\left(2,\frac{2(6-2)}4\right)=(2,2).$$

The altitude from $A$ points in the direction $(2,2)$, while $BC$ has direction $(-4,4)$. Their dot product is zero, as expected.

Here is a small JavaScript version of the calculation:

```javascript
function orthocentre(c, u, v) {
  if (c <= 0 || v === 0) {
    throw new Error('The triangle must be non-degenerate.');
  }
  return { x: u, y: u * (c - u) / v };
}

orthocentre(6, 2, 4); // { x: 2, y: 2 }
```

## A coordinate checklist

Before introducing variables, look for a structure that can remove them:

1. Put a distinguished point at the origin.
2. Align an important side or symmetry axis with an axis.
3. Use unit lengths only when the statement is invariant under scaling.
4. Prefer dot products for perpendicularity and determinants for area.
5. State the non-degeneracy assumptions before dividing.

The best coordinates do not just make an answer easier to calculate. They make the reason behind it easier to see.
