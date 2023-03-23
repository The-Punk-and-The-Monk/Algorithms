/*
 * @Author: LinFeng
 * @Date: 2021-06-20 11:05:57
 * @LastEditors: LinFeng
 * @LastEditTime: 2021-06-29 08:35:45
 * @Description: 快排 三指针版本
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

const quickSort = (arr, l, r) => {
    if (l >= r) {
        return
    }
    const randomIdx = Math.floor(Math.random() * (r - l + 1) + l);
    swap(arr, l, randomIdx);
    const pivot = arr[l]
    let i = l - 1;
    let j = r + 1;
    let p = l;
    /**
        循环结束条件
        [l ... i] < pivot
        [p ... j-1] === pivot
        [j ... r] > pivot
     */
    while(p < j) {
        if(arr[p] < pivot) {
            i++;
            swap(arr, i, p);
            p++;
        } else if(arr[p] === pivot){
            p++;
        } else {
            j--;
            swap(arr, j, p);
        }
    }
    quickSort(arr, l, i);
    quickSort(arr, j, r);
}