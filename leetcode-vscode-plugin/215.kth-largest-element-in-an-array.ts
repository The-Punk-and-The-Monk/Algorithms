/*
 * @lc app=leetcode id=215 lang=typescript
 *
 * [215] Kth Largest Element in an Array
 */

// @lc code=start
function findKthLargest(nums: number[], k: number): number {
    if (k <= 0 || k > nums.length) {
        throw Error('illegal k')
    }
    let l = 0;
    let r = nums.length - 1;
    const kIdx = nums.length - k;
    while(l <= r) {
        const p = partition(nums, l, r);
        if (p === kIdx) {
            return nums[p]
        } else if (p > kIdx) {
            r = p - 1
        } else {
            l = p + 1
        }
    }
    throw Error('something went wrong')
};

function swap(nums: number[], i: number, j: number) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

function partition(nums: number[], l: number, r: number): number {
    if (l > r) {
        throw Error('l can not be bigger than r')
    }
    const randomIdx = Math.floor(Math.random() * (r - l + 1)) + l;
    swap(nums, l, randomIdx)
    const pivot = nums[l];
    let p = l + 1;
    let q = r;
    /**
     * 循环退出时有
     * nums[l+1...p-1] < pivot
     * nums[p ... r] >= pivot
     */
    while(p <= q) {
        while(p < nums.length && nums[p] < pivot) p++;
        while(q >= 0 && nums[q] >= pivot) q--;
        if(p < q) swap(nums, p, q)
    }
    swap(nums, l, p-1);
    return p - 1;
}
// @lc code=end

const nums = [3,2,9,3,1,2,4,-1, 0, 3,5,5,6,];
const kthNum = findKthLargest(nums, 4);
console.log(kthNum)

const nums2 = [3,2,1,5,6,4];
console.log(findKthLargest(nums2, 2))

export {}