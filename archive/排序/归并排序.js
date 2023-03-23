/*
 * @lc app=leetcode id=912 lang=javascript
 *
 * [912] Sort an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    const len = nums.length;
    const tarr = new Array(len);
    mergeSort(nums, tarr, 0, len-1);
    return nums
};

/**
 * 将两个有序数组 nums[l1, r1] nums[l2, r2] 合并成一个有序数组 nums[l1, r2]
 * @param {*} nums 
 * @param {*} tarr 临时数组
 * @param {*} l1 
 * @param {*} r1 
 * @param {*} l2 
 * @param {*} r2 
 */
function mergeTwoSortedArr(nums, tarr, l1, r1, l2, r2) {
    if (l1 > r1 || l2 > r2 || r1 > l2) {
        throw new Error('mergeTwoSortedArr went wrong')
    }
    const l = l1;
    const r = r2;
    let k = l1;
    while(k <= r2) {
        if(l1 > r1) {
            tarr[k] = nums[l2];
            l2++;
        } else if (l2 > r2) {
            tarr[k] = nums[l1];
            l1++;
        } else if (nums[l1] <= nums[l2]) {
            tarr[k] = nums[l1];
            l1++;
        } else {
            tarr[k] = nums[l2];
            l2++;
        }
        k++;
    }
    for(let i = l; i <= r; i++) {
        nums[i] = tarr[i];
    }
}

/**
 * 时空： O(nlgn) O(n)
 * @param {*} nums 
 * @param {*} tarr 
 * @param {*} l 
 * @param {*} r 
 * @returns 
 */
function mergeSort(nums, tarr, l, r) {
    if (l >= r) {
        return;
    }
    const m = Math.floor((r - l + 1) / 2 + l);
    mergeSort(nums, tarr, l, m - 1);
    mergeSort(nums, tarr, m, r);
    if (nums[m-1] <= nums[m]) {
        return 
    }
    mergeTwoSortedArr(nums, tarr, l, m-1, m, r);
}
// @lc code=end

const nums = [-1, -1, 0, 0, 1, 0, 3, 4, 7, -2];
console.log(sortArray(nums));