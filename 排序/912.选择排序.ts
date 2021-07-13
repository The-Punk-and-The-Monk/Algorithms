/*
 * @lc app=leetcode id=912 lang=typescript
 *
 * [912] Sort an Array
 */

// @lc code=start
function sortArray(nums: number[]): number[] {
  selectSort(nums);
  return nums;
}


function swap(nums: number[], i: number, j: number) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

function findMinIdx(nums: number[], i: number, j: number) {
  let min = nums[i];
  let minIdx = i;
  for (let k = i + 1; k <= j; k++) {
    if (nums[k] < min) {
      min = nums[k];
      minIdx = k;
    }
  }
  return minIdx;
}

function selectSort(nums: number[]) {
  for (let i = 0; i < nums.length - 1; i++) {
    const minIdx = findMinIdx(nums, i, nums.length - 1);
    swap(nums, i, minIdx);
  }
}
// @lc code=end
const nums = [-1, -1, 0, 0, -1, -2, 5, 8, -2];
// const nums = [5, 2, 3, 1]
console.log(sortArray(nums));
export {};
