/*
 * @lc app=leetcode id=704 lang=typescript
 *
 * [704] Binary Search
 */

// @lc code=start
function search(nums: number[], target: number): number {
    return binarySearchRecursively({
        nums,
        target,
        l: 0,
        r: nums.length - 1
    })
};

function binarySearchRecursively(props: {nums: number[]; l: number; r: number; target: number}): number {
    const { nums, l, r, target } = props;
    if(l > r || target < nums[l] || target > nums[r]) {
        return -1
    }
    const m = Math.floor((r - l + 1) / 2) + l;
    if (nums[m] === target) {
        return m;
    } else if (nums[m] > target) {
        return binarySearchRecursively({
            nums,
            target,
            l,
            r: m - 1
        })
    } else {
        return binarySearchRecursively({
            nums,
            target,
            l: m + 1,
            r
        })
    }
}

function binarySearch(nums: number[], target: number): number {
    const len = nums.length;
    let l = 0;
    let r = len - 1;
    while(l <= r) {
        const m = Math.floor((r - l + 1) / 2) + l;
        const numM = nums[m];
        if (numM === target) {
            return m
        } else if (numM > target) {
            r = m - 1
        } else {
            l = m + 1
        }
    }
    return -1
}
// @lc code=end

const nums = [-1, 0, 2, 3, 5, 9, 9, 12]
let targets = [9, 2, -2, 13, 5, -1, 12]
targets.forEach(target => console.log(search(nums, target)))