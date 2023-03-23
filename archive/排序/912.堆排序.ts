
/*
 * @lc app=leetcode id=912 lang=typescript
 *
 * [912] Sort an Array
 */

// @lc code=start

enum HEAP_TYPE {
    MAX,
    MIN
}

enum HEAP_SORT_TYPE {
    MAX,
    MIN
}

function sortArray(nums: number[]): number[] {
  heapSort(nums, HEAP_SORT_TYPE.MAX);
  return nums;
}

function swap(nums: number[], i: number, j: number) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

function maintainMinHeapNode(nums: number[], i: number, maxI: number) {
    if (i >= maxI || i > nums.length) {
        return;
    }
    const p = nums[i];
    const padding = Infinity;
    const li = i * 2 + 1;
    const ri = i * 2 + 2;
    const lc = li <= maxI ? nums[i * 2 + 1] : padding;
    const rc = ri <= maxI ? nums[i * 2 + 2] : padding;
    if(lc < rc) {
        if(p > lc) {
            swap(nums, i, li)
            maintainMinHeapNode(nums, li, maxI)
            return
        }
        if(p > rc) {
            swap(nums, i, ri)
            maintainMinHeapNode(nums, ri, maxI)
            return
        }
    }
    if(lc >= rc) {
        if(p > rc) {
            swap(nums, i, ri)
            maintainMinHeapNode(nums, ri, maxI);
            return
        }
        if(p > lc) {
            swap(nums, i, li)
            maintainMinHeapNode(nums, li, maxI)
            return
        }
    }
}

function maintainMaxHeapNode(nums: number[], i: number, maxI: number) {
    if (i >= maxI || i > nums.length) {
        return;
    }
    const p = nums[i];
    const padding = -Infinity;
    const li = i * 2 + 1;
    const ri = i * 2 + 2;
    const lc = li <= maxI ? nums[i * 2 + 1] : padding;
    const rc = ri <= maxI ? nums[i * 2 + 2] : padding;
    if(lc < rc) {
        if(p < rc) {
            swap(nums, i, ri)
            maintainMaxHeapNode(nums, ri, maxI)
            return
        }
        if(p < lc) {
            swap(nums, i, li)
            maintainMaxHeapNode(nums, li, maxI)
            return
        }
    }
    if(lc >= rc) {
        if(p < lc) {
            swap(nums, i, li)
            maintainMaxHeapNode(nums, li, maxI)
            return
        }
        if(p < rc) {
            swap(nums, i, ri)
            maintainMaxHeapNode(nums, ri, maxI);
            return
        }
    }
}

function maintainNode(nums: number[], i:number, maxI: number, mode: HEAP_TYPE) {
    if (i > nums.length) {
        return;
    }
    if (mode === HEAP_TYPE.MAX) {
        maintainMaxHeapNode(nums, i, maxI)
    } else {
        maintainMinHeapNode(nums, i, maxI)
    }
}

/**
 * 时间复杂度：O(nlgn)
 * 空间复杂度：O(1)
 * @param nums 
 * @param mode 
 */
function initHeap(nums: number[], mode: HEAP_TYPE) {
    const len = nums.length;
    const lastNonLeafNodeIdx = Math.floor(len / 2 - 1);
    const maintainHeapNode = mode === HEAP_TYPE.MAX ? maintainMaxHeapNode : maintainMinHeapNode;
    for(let i = lastNonLeafNodeIdx; i >= 0; i--) {
        maintainHeapNode(nums, i, nums.length - 1);
    }
}

/**
 * 时间复杂度 O(nlgn)
 * 空间复杂度：O(1)
 * @param nums 
 * @param mode 
 * @returns 
 */
function heapSort(nums: number[], mode: HEAP_SORT_TYPE) {
    if (!nums || !nums.length) {
        return;
    }
    const heapType = mode === HEAP_SORT_TYPE.MAX ? HEAP_TYPE.MAX : HEAP_TYPE.MIN;
    initHeap(nums, heapType);
    for(let i = 1; i <= nums.length; i++) {
        swap(nums, 0, nums.length - i);
        maintainNode(nums, 0, nums.length - i - 1, heapType);
    }
}


// @lc code=end
const nums = [-1, -1, 0, 0, -1, -2, 5, 8, -2];

// const nums = [5, 2, 3, 1]
// initHeap(nums, HEAP_TYPE.MAX);
// console.log(nums)
console.log(sortArray(nums));
export {};
