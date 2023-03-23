/*
 * @lc app=leetcode id=912 lang=typescript
 *
 * [912] Sort an Array
 */
// @lc code=start
const temp = new Array(10 * 10000 + 1).fill(0);
const offset = 5 * 10000;

function sortArray(nums: number[]): number[] {
    return bucketSort(nums.map(num => num + offset), 1000).map(num => num - offset);
}

function swap(nums:number[], i:number, j:number) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

/**
 * 时间复杂度： O(n^2)
 * 空间复杂度： O(1)
 * @param nums 
 * @returns 
 */
function insertSort(nums: number[]) {
    if (nums.length < 2) {
        return
    }
    for(let i = 1; i < nums.length; i++) {
        let j = i;
        while(j - 1 >= 0 && nums[j] < nums[j-1]) {
            swap(nums, j, j-1);
            j--;
        }
    }
}


/**
 * 时空取决于对每个桶用的排序算法。
 * 如果用的是基于比较的 nlgn 的算法。
 * 设 映射函数 f(k) 将 n 个数 分成了 m 个桶。
 * 则时间是 o(n) + o(mlg(n/m))
 * 注： 此处偷懒，内部用的是插入排序。
 * @param nums 
 * @param bucketSize 
 * @returns 
 */
function bucketSort(nums: number[], bucketSize: number) {
    const maxNum = Math.max(...nums);
    // 加 1 是处理边界 比如 50 / 10 ,只有 5 个 桶， 但 50 应该在第 6 个桶。
    const bucketNum = Math.ceil((maxNum + 1)/ bucketSize);
    const buckets = getBuckets(bucketNum);
    // o(n)
    nums.forEach(num => {
        const bucketIdx = Math.floor(num / bucketSize);
        buckets[bucketIdx].push(num);
    })
    const newNums = <number[]>[];
    // 
    buckets.forEach(bucket => {
        // bs * nlgn
        insertSort(bucket)
        bucket.forEach(num => {
            newNums.push(num)
        })
    });
    return newNums;
}

function getBuckets(bucketCnt: number) {
    const buckets = new Array<number[]>(bucketCnt);
    for(let i = 0; i < bucketCnt; i++) {
        buckets[i] = [];
    }
    return buckets
}


// @lc code=end
const nums = [0];

// const nums = [5, 2, 3, 1]
// initHeap(nums, HEAP_TYPE.MAX);
// console.log(nums)
console.log(sortArray(nums));
export {};
