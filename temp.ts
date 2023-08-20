function solveNQueens(n: number): string[][] {
    const res: string[][] = [];
    const chessboard: string[][] = [];
    // y - x
    const attackRangeNorthwestToSoutheast = new Set<number>();
    // y + x
    const attackRangeSouthwestToNortheast = new Set<number>();
    const attackRangeVertical = new Set<number>();
    for (let i = 0; i < n; i++) {
        chessboard.push(new Array(n).fill('.'));
    }
    const backtrack = (row: number) => {
        if (row > n) {
            return;
        }
        if (row === n) {
            res.push(chessboard.map((row) => row.join('')));
            return;
        }
        for (let i = 0; i < n; i++) {
            const yMinusX = row - i;
            const yPlusX = row + i;
            if (
                attackRangeNorthwestToSoutheast.has(yMinusX) ||
                attackRangeSouthwestToNortheast.has(yPlusX) ||
                attackRangeVertical.has(i)
            ) {
                continue;
            }
            chessboard[row][i] = 'Q';
            attackRangeNorthwestToSoutheast.add(yMinusX);
            attackRangeSouthwestToNortheast.add(yPlusX);
            attackRangeVertical.add(i);
            backtrack(row + 1);
            chessboard[row][i] = '.';
            attackRangeNorthwestToSoutheast.delete(yMinusX);
            attackRangeSouthwestToNortheast.delete(yPlusX);
            attackRangeVertical.delete(i);
        }
    };
    backtrack(0);
    return res;
}
