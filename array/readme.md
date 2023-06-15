## [151. Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/description/)
```typescript
function reverseWords(s: string): string {
    return s.split(' ').filter(w => !!w.length).reverse().join(' ').trim();
};

```

# Prefix Sum
Prefix Sum is suitable for the scenario when you frequently query a certain kind of sum of a certain range in a fixed array-like data structure.
```typescript
## [303. Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/)

class NumArray {
    private preSums: number[];
    private nums: number[];
    constructor(nums: number[]) {
        this.preSums = [];
        this.nums = nums;
        let sum = 0;
        for (const num of nums) {
            sum += num;
            this.preSums.push(sum)
        }
    }

    sumRange(left: number, right: number): number {
        return this.preSums[right] - this.preSums[left] + this.nums[left]
    }
}
```

## [304. Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/description/)
```typescript
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
```

# Difference
this method suits for the scenario when you need to frequently add to or minus to each elements in a certain span of an array.
## [1094. Car Pooling](https://leetcode.com/problems/car-pooling/description/)
```typescript
function carPooling(trips: number[][], capacity: number): boolean {
    const capacityDiff: number[] = new Array(1000 + 1);
    capacityDiff[0] = capacity;
    for (const trip of trips) {
        const [passengers, from, to] = trip;
        if (from < capacityDiff.length) capacityDiff[from] = (capacityDiff[from] || 0) - passengers;
        if (to < capacityDiff.length) capacityDiff[to] = (capacityDiff[to] || 0) + passengers;
    }
    let capacityOnTheWay = 0;
    for (let i = 0; i < capacityDiff.length; i++) {
        capacityOnTheWay += (capacityDiff[i] || 0);
        if (capacityOnTheWay < 0) {
            return false
        }
    }
    return true
};
```

## [1109. Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/description/)
```typescript
function corpFlightBookings(bookings: number[][], n: number): number[] {
    const answerDiff = new Array(n).fill(0);
    for (const booking of bookings) {
        const [first, last, seats] = booking;
        if (first - 1 >= 0) {
            answerDiff[first - 1] += seats
        }
        if (last < answerDiff.length) {
            answerDiff[last] -= seats
        }
    }
    const answer = new Array(n).fill(0);
    answer[0] = answerDiff[0]
    for (let i = 1; i < n; i++) {
        answer[i] = answer[i - 1] + answerDiff[i]
    }
    return answer
};
```