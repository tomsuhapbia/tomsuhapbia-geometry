Draw a triangle $ABC$, and choose points $D$, $E$, and $F$ in the interiors of sides $BC$, $CA$, and $AB$. The segments $AD$, $BE$, and $CF$ are called **cevians**.

What condition makes all three pass through the same point? Ceva's theorem answers with a product of three ratios.

## State the condition carefully

<div class="theorem">
<span class="callout-title">Ceva’s theorem · interior version</span>

For interior side points $D$, $E$, and $F$, the cevians $AD$, $BE$, and $CF$ are concurrent if and only if

$$\frac{BD}{DC}\cdot\frac{CE}{EA}\cdot\frac{AF}{FB}=1.$$

</div>

The order around the triangle matters. Each ratio points consistently along the cycle $B\to C\to A\to B$.

## Use triangles with a common height

Suppose the cevians meet at $P$ inside the triangle. Write $[XYZ]$ for the area of triangle $XYZ$.

The triangles $PBD$ and $PCD$ have bases on the same line $BC$ and a common height from $P$. Consequently,

$$\frac{[PBD]}{[PCD]}=\frac{BD}{DC}.$$

The same ratio holds for $[ABD]/[ACD]$, since those triangles share the height from $A$.

Subtract the smaller areas from the larger ones. Because both pairs have the same ratio, their differences have that ratio too. This gives

$$\frac{[ABP]}{[ACP]}=\frac{BD}{DC}.$$

For clarity, if $x/y=X/Y=k$, then $(X-x)/(Y-y)=k$, provided $Y\ne y$. Here all the relevant triangle areas are positive.

## Watch the product cancel

Cycling the same argument around the triangle produces

$$\frac{BD}{DC}=\frac{[ABP]}{[ACP]},\qquad
\frac{CE}{EA}=\frac{[BCP]}{[ABP]},\qquad
\frac{AF}{FB}=\frac{[ACP]}{[BCP]}.$$

Multiplying cancels every area. The result is $1$. That proves the forward direction.

## Do not forget the converse

Now assume the product of the three side ratios is $1$. Let $P=AD\cap BE$, which lies inside the triangle, and let $CP$ meet $AB$ at $F'$.

Since $AD$, $BE$, and $CF'$ are concurrent, the direction already proved gives

$$\frac{BD}{DC}\cdot\frac{CE}{EA}\cdot\frac{AF'}{F'B}=1.$$

Compare with the assumed identity. The first two factors are positive and cancel, leaving $AF'/F'B=AF/FB$.

There is exactly one interior point of a segment with a given positive ratio to its endpoints. Thus $F'=F$, and the original cevians are concurrent.

## The medians are a first example

If $D$, $E$, and $F$ are midpoints, every ratio equals $1$. Ceva immediately proves that the three medians are concurrent.

For a less symmetric example, suppose $BD/DC=2$ and $CE/EA=3$. Concurrency requires $AF/FB=1/6$. A large ratio on two sides must be balanced by a small one on the third.

This interior version is often enough for a first encounter. Points on extended sides require a directed-length convention, so we have kept those cases outside the present statement.
