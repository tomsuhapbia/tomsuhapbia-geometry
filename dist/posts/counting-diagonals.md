Counting is often less about arithmetic than it is about choosing the right object to count. A convex polygon offers a small, satisfying example.

Suppose it has $n\ge3$ vertices. How many diagonals does it have? And how many pairs of diagonals cross in its interior?

## Count from each vertex

From one vertex, a diagonal can go to every vertex except itself and its two neighbours. That gives $n-3$ choices.

Repeating at all $n$ vertices produces $n(n-3)$ choices. But each diagonal has been counted twice, once from each endpoint. Thus

$$D_n=\frac{n(n-3)}2.$$

For a hexagon, this gives $6\cdot3/2=9$ diagonals.

## Count the same set differently

Every pair of vertices determines a segment. There are $\binom n2$ such pairs. Exactly $n$ of these segments are sides; all the rest are diagonals.

$$D_n=\binom n2-n=\frac{n(n-1)}2-n=\frac{n(n-3)}2.$$

The two arguments count the same objects with different bookkeeping. This is the heart of **double counting**: two correct counts of one set must agree.

## Four vertices determine a crossing

Choose any four vertices of a strictly convex polygon. In cyclic order, call them $A,B,C,D$. The diagonals $AC$ and $BD$ cross in the interior.

Conversely, two diagonals that cross in the interior have four distinct endpoints. These endpoints recover the chosen set of four vertices.

<div class="theorem">
<span class="callout-title">Crossing pairs</span>

In a strictly convex $n$-gon, the number of unordered pairs of diagonals that cross in the interior is

$$\binom n4.$$

</div>

The correspondence goes both ways, so there is neither overcounting nor undercounting.

## Pairs are not always points

A subtle distinction matters. The formula counts **pairs of diagonals**, not necessarily distinct intersection points.

In a regular hexagon, the three diagonals joining opposite vertices all pass through the centre. The three pairs they form contribute three to our count but produce only one intersection point.

If no three diagonals meet at a single interior point, then each crossing pair gives a different point. Only with this additional condition does $\binom n4$ also count the distinct interior intersection points.

## A useful habit

For a convex octagon, there are $8(8-3)/2=20$ diagonals and $\binom84=70$ crossing pairs. Those are two different sets being counted.

Before doing a counting problem, finish this sentence: **“One object in my set consists of…”** For diagonals, it is a non-adjacent pair of vertices. For crossing pairs, it is an unordered pair of diagonals with an interior crossing.

Making the object precise often reveals the counting method. It also prevents the small ambiguities that turn an elegant argument into a wrong answer.
