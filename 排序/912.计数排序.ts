/*
 * @lc app=leetcode id=912 lang=typescript
 *
 * [912] Sort an Array
 */

// @lc code=start
const temp = new Array(10 * 10000 + 1).fill(0);
const shift = 5 * 10000;

function sortArray(nums: number[]): number[] {
  countSort(nums);
  return nums;
}

function swap(nums: number[], i: number, j: number) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

function countSort(nums: number[]) {
    nums.forEach(num => {
        temp[num + shift] += 1;
    })
    let i = 0;
    temp.forEach((count, idx) => {
        if (count !== 0) {
            nums.fill(idx - shift, i, i + count )
            i += count;
            temp[idx] = 0;
        }
    })
}


// @lc code=end
const nums = [-1, -1, 0, 0, -1, -2, 5, 8, -2];

// const nums = [5, 2, 3, 1]
// initHeap(nums, HEAP_TYPE.MAX);
// console.log(nums)
console.log(sortArray(nums));
export {};
