/*
 * @Author: LinFeng
 * @Date: 2021-06-20 11:05:57
 * @LastEditors: LinFeng
 * @LastEditTime: 2021-07-04 10:02:51
 * @Description: 快排 双指针版本
 */


function sortArray(nums) {
    quickSort(nums, 0, nums.length - 1);
    return nums;
};


const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * 平均情况：
 * 时间复杂度： O(nlgn)
 * 空间复杂度： O(lgn)
 * 最坏情况：
 * 时空： O(n^2), O(n)
 * @param {*} arr 
 * @param {*} l 
 * @param {*} r 
 * @returns 
 */
const quickSort = (arr, l, r) => {
    if (l >= r) {
        return
    }
    const x = partition(arr, l, r)
    quickSort(arr, l, x-1);
    quickSort(arr, x + 1, r);
}

const partition = (arr, l, r) => {
    const randomIdx = Math.floor(Math.random() * (r - l + 1) + l);
    swap(arr, l, randomIdx);
    const pivot = arr[l];
    let i = l + 1;
    let j = r;
    /**
     * 循环终止条件
     * [l, ..., i-1] < pivot
     * [i, ..., r] >= pivot
     */
    while(true) {
        while(arr[j] >= pivot) j--;
        while(arr[i] < pivot) i++;
        if (i >= j) {
            break;
        }
        swap(arr, i, j);
        i++;
        j--;
    }
    swap(arr, l, i - 1);
    return i - 1;
}

