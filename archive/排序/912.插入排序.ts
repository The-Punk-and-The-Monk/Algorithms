/*
 * @lc app=leetcode id=912 lang=typescript
 *
 * [912] Sort an Array
 */

// @lc code=start
function sortArray(nums: number[]): number[] {
    insertSort(nums);
    return nums;
};

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
// @lc code=end
const nums = [-1, -1, 0, 0, -1, -2, 5, 8,-2]
console.log(sortArray(nums))
export {};
