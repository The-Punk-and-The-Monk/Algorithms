import { Heap, HeapTypes } from '../typical-data-structures/heap';

function sortArray(nums: number[]): number[] {
    if (!nums?.length) {
        return nums;
    }

    const heap = new Heap<number>({
        arr: nums,
        heapType: HeapTypes.MIN,
        compare: (a, b) => {
            return a > b;
        },
    });
    const newArr: number[] = [];
    let num = heap.pop();
    while (num !== undefined) {
        newArr.push(num);
        num = heap.pop();
    }
    // newArr.reverse();
    return newArr;
}

const arr = [5, 2, 3, 1];
console.log(sortArray(arr));
