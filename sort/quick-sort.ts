function sortArray(nums: number[]): number[] {
    if (!nums?.length) {
        return nums;
    }
    const l = 0;
    const r = nums.length - 1;
    quickSort(nums, l, r);
    return nums;
};

function quickSort(nums: number[], left: number, right: number) {
    if (!nums?.length || left >= right || left < 0 || right >= nums.length) {
        return;
    }
    let l = left;
    let r = right;
    // const anchorIdx = Math.floor(l + Math.random() * (r - l + 1))
    const anchorIdx = left;
    const anchor = nums[anchorIdx];
    // swap(nums, l, anchorIdx);
    // exit: l = r
    while (l < r) {
        // exit: nums[l] >= anchor or l = r
        while (nums[l] <= anchor && l < r) {
            l = l + 1;
        }
        // exit: nums[r] < anchor or l = r
        while (nums[r] >= anchor && l < r) {
            r = r - 1
        }
        if (l < r) {
            // enter: nums[l] >= anchor && nums[r] < anchor
            swap(nums, l, r);
            l = l + 1;
        }
    }

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