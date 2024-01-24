export {};

function sortArray(nums: number[]): number[] {
    if (!nums?.length) {
        return nums;
    }
    const l = 0;
    const r = nums.length - 1;
    quickSort(nums, l, r);
    return nums;
}

function quickSort(nums: number[], left: number, right: number) {
    if (!nums?.length || left >= right || left < 0 || right >= nums.length) {
        return;
    }
    let l = left;
    let r = right;
    const anchorIdx = left;
    const anchor = nums[anchorIdx];
    while (l < r) {
        while (l < r && nums[r] > anchor) r--;
        while (l < r && nums[l] <= anchor) l++;
        swap(nums, l, r);
    }
    /**
     * 循环退出时有
     * anchor 依然在 left 位置
     * l === r
     * nums.slice(l + 1) 都 > anchor
     * 但是nums.slice(0, l + 1) 只是 <= anchor
     * 可能会出现 anchor = 4, nums.slice(0, l + 1) 是 [4, 3, 1, 2] 的情况
     * 所以需要交互 left 和 l
     * 其实就是 anchor 需要放到 l + 1 的左边
     */
    swap(nums, left, l);

    quickSort(nums, left, l - 1);
    quickSort(nums, l + 1, right);
}

function swap(nums: number[], indexA: number, indexB: number) {
    const temp = nums[indexA];
    nums[indexA] = nums[indexB];
    nums[indexB] = temp;
}

const arr = [-2, 3, -5];
sortArray(arr);
