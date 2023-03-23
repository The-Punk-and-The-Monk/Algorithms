/*
 * @lc app=leetcode id=912 lang=typescript
 *
 * [912] Sort an Array
 */
// @lc code=start
const temp = new Array(10 * 10000 + 1).fill(0);
const offset = 5 * 10000;

function sortArray(nums: number[]): number[] {

    return radixSort(nums.map(num => num + offset)).map(num => num - offset);
}

/**
 * 基数排序, lsd（Least significant digital）低位优先版本
 * 缺点，未实现负数的情况，本题由于题目给出了 最小值，所以弄了个 offset 就可以了。
 * 时空：设 最大的位数为 k， 位深为 d， 
 * 时： O(k(n + d))
 * 空： O(n + d)
 * @param nums 
 * @returns 
 */
function radixSort(nums: number[]) {
    if (!nums || !nums.length) {
        return nums;
    }
    const maxWeiShu = getMaxWeiShu(nums);
    let tempNums = new Array(nums.length);
    // k
    for(let i = 1; i <= maxWeiShu; i++) {
        // d
        const buckets = getBuckets(10);
        // n
        nums.forEach(num => {
            const curr = getNumInWeiReversely(num, i);
            buckets[curr].push(num);
        })
        let j = 0;
        // n
        buckets.forEach(bucket => {
            for(let k = 0; k < bucket.length; k++) {
                tempNums[j] = bucket[k];
                j += 1;
            }
        })
        const temp = nums;
        nums = tempNums;
        tempNums = temp;
    }
    return nums;
}

function getBuckets(bucketCnt: number) {
    const buckets = new Array<number[]>(bucketCnt);
    for(let i = 0; i < bucketCnt; i++) {
        buckets[i] = [];
    }
    return buckets
}

function getMaxWeiShu(nums: number[]) {
    let max = 1;
    nums.forEach(num => {
        const curr = getWeiShu(num);
        max = max > curr ? max : curr;
    })
    return max;
}

function getWeiShu(num: number) {
    let i = 1
    let j = 10;
    while(true) {
        if (num / j < 1) {
            return i;
        } else {
            j = j * 10;
            i += 1;
        }
    }
}

function getNumInWeiReversely(num: number, i: number) {
    let temp = Math.floor(num / Math.pow(10, i - 1));
    return temp % 10;
}

// describe('radix sort', () => {
//     it.each([
//         [10, 1, 0],
//         [11, 1, 1],
//         [101, 2, 0],
//         [120, 2, 2],
//         [120, 4, 0],
//         [0, 2, 0],
//     ])('getNumInWeiReversely', (num, i, res) => {
//         expect(getNumInWeiReversely(num, i)).toBe(res)
//     })

//     it.each([
//         [0, 1],
//         [10, 2],
//         [102, 3]
//     ])('getWeiShu', (num, res) => {
//         expect(getWeiShu(num)).toBe(res);
//     })
// })


// @lc code=end
const nums = [-1, -1, 0, 0, -1, -2, 5, 8, -2];

// const nums = [5, 2, 3, 1]
// initHeap(nums, HEAP_TYPE.MAX);
// console.log(nums)
console.log(sortArray(nums));
export {};
