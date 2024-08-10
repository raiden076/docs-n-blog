---
tags:
  - college/foundation/test_prep
  - math/matrix
title: matrices - rank nullity
slug: 20240804123727-matrices---rank-nullity
id: 20240804123727-matrices---rank-nullity
---
The **rank** of a matrix is the maximum number of linearly independent rows or columns in the matrix. In other words, it is the dimension of the row space or column space of the matrix. The **nullity** of a matrix is the dimension of the null space of the matrix, which is the set of all solutions to the homogeneous equation \( Ax = 0 \).

The relationship between rank and nullity is given by the **Rank-Nullity Theorem**, which states:

\[ \text{rank}(A) + \text{nullity}(A) = n \]

where \( n \) is the number of columns in the matrix \( A \).

### Linearly Independent Rows and Rank
- The rank of a matrix is equal to the number of linearly independent rows (or columns) in the matrix.
- If a matrix has \( m \) rows and \( n \) columns, the rank \( r \) is the number of linearly independent rows or columns.
- The maximum possible rank of a matrix is the smaller of the number of rows or columns, i.e., \( r \leq \min(m, n) \).

### Example
Consider a \( 3 \times 3 \) matrix:
\[ A = \begin{pmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{pmatrix} \]

The rank of matrix \( A \) is 2 because there are only two linearly independent rows. The nullity of \( A \) is 1 because the equation \( Ax = 0 \) has one dimension of solutions in the null space.

### Summary
- **Rank**: Number of linearly independent rows or columns.
- **Nullity**: Dimension of the null space (solutions to \( Ax = 0 \)).
- **Rank-Nullity Theorem**: \(\text{rank}(A) + \text{nullity}(A) = \text{number of columns}\).

Understanding these concepts helps in analyzing the solutions to linear systems and properties of matrices in linear algebra.

