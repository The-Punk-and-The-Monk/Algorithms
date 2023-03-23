/*
 * @lc app=leetcode id=912 lang=typescript
 *
 * [912] Sort an Array
 */

// @lc code=start
function sortArray(nums: number[]): number[] {
    bubbleSort(nums);
    return nums;
  }
  
  
  function swap(nums: number[], i: number, j: number) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }5
  
  function bubbleSort(nums: number[]) {
      let swappingHappened = true;
      while(swappingHappened) {
          swappingHappened = false;
          for(let i = 1; i < nums.length; i++) {
              if(nums[i-1] > nums[i]) {
                  swap(nums, i - 1, i);
                  swappingHappened = true;
              }
          }
      }
  }5
  // @lc code=end
  const nums = [-1, -1, 0, 0, -1, -2, 5, 8, -2];
  // const nums = [5, 2, 3, 1]
  console.log(sortArray(nums));
  export {};
  