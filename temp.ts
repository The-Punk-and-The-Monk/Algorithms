class NumMatrix {
    private preSumMatrix: number[][];
    constructor(matrix: number[][]) {
        this.preSumMatrix = [];
        let lastRowOfPreSum: number[] | null = null;
        for (let i = 0; i < matrix.length; i++) {
            const currRowOfPreSum: number[] = [];
            const rowOfMatrix = matrix[i];
            let preSumOfCurrRowOfMatrix = 0;
            for (let j = 0; j < rowOfMatrix.length; j++) {
                preSumOfCurrRowOfMatrix += rowOfMatrix[j];
                currRowOfPreSum.push(preSumOfCurrRowOfMatrix + (lastRowOfPreSum?.[j] || 0))
            }
            lastRowOfPreSum = currRowOfPreSum;
            this.preSumMatrix.push(currRowOfPreSum)
        }
    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        const regionSumOfRow1Minus1AndCol1Minus1 = this.preSumMatrix[row1 - 1]?.[col1 - 1] || 0
        const regionSumOfRow1Minus1AndCol2 = this.preSumMatrix[row1 - 1]?.[col2] || 0
        const regionSumOfRow2AndCol1Minus1 = this.preSumMatrix[row2]?.[col1 - 1] || 0
        const regionSumOfRow2AndCol2 = this.preSumMatrix[row2]?.[col2] || 0
        return regionSumOfRow2AndCol2 - regionSumOfRow1Minus1AndCol2 - regionSumOfRow2AndCol1Minus1 + regionSumOfRow1Minus1AndCol1Minus1
    }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
