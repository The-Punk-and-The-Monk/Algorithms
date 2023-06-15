
enum HeapTypes {
    MAX,
    MIN
}

class Heap<T> {
    public heapType: HeapTypes;
    private arr: T[];
    private compare: (item1: T, item2: T) => boolean

    
    constructor(params: {
        arr: T[], 
        heapType: HeapTypes,
        // return true if item1 big than item2
        compare: (item1: T, item2: T) => boolean
    }) {
        this.arr = params.arr;
        this.heapType = params.heapType;
        this.compare = params.compare;
        this.initHeap();
    }

    public pop() {
        this.swap(0, this.arr.length - 1)
        const res = this.arr.pop()
        this.sinkOrSwim(0);

        return res
    }

    private initHeap() {
        for (let i = this.parent(this.arr.length - 1); i >= 0; i--) {
            this.sinkOrSwim(i)
        }
    }

    private sinkOrSwim(index: number) {
        if (this.heapType === HeapTypes.MAX) {
            this.swim(index)
        }
        this.sink(index)
    }

    /**
     * smallest goes up
     * bigger ones sink down
     * @param index 
     * @returns 
     */
    private sink(index: number) {
        const leftChildIndex = this.leftChild(index);
        const rightChildIndex = this.rightChild(index)
        const currItem = this.arr[index]
        const leftChild = this.arr[leftChildIndex]
        const rightChild = this.arr[rightChildIndex]
        const isParentBiggerThanLeftChild = leftChild ? this.compare(currItem, leftChild) : false;
        const isParentBiggerThanRightChild = rightChild ? this.compare(currItem, rightChild) : false;
        const isLeftChildBiggerThanRightChild = leftChild && rightChild ? this.compare(leftChild, rightChild) : false;
        if (!(isParentBiggerThanLeftChild || isParentBiggerThanRightChild)) {
            return;
        }
        if (isLeftChildBiggerThanRightChild) {
            this.swap(index, rightChildIndex)
            return
        }
        this.swap(index, leftChildIndex)
    }

    /**
     * biggest swim up
     * smaller ones go down
     * @param index 
     * @returns 
     */
    private swim(index: number) {
        const leftChildIndex = this.leftChild(index);
        const rightChildIndex = this.rightChild(index)
        const parent = this.arr[index]
        const leftChild = this.arr[leftChildIndex]
        const rightChild = this.arr[rightChildIndex]
        const isParentSmallerThanLeftChild = leftChild ? this.compare(leftChild, parent) : false;
        const isParentSmallerThanRightChild = rightChild ? this.compare(rightChild, parent) : false;
        const isLeftChildSmallerThanRightChild = leftChild && rightChild ? this.compare(rightChild, leftChild) : false;
        if (!(isParentSmallerThanLeftChild || isParentSmallerThanRightChild)) {
            return;
        }
        if (isLeftChildSmallerThanRightChild) {
            this.swap(index, rightChildIndex)
            return
        }
        this.swap(index, leftChildIndex)
    }

    private swap(index1: number, index2: number) {
        const temp = this.arr[index1]
        this.arr[index1] = this.arr[index2]
        this.arr[index2] = temp;
    }
    
    private parent(index: number) {
        return Math.ceil(index / 2) - 1
    }

    private leftChild(index: number) {
        return index * 2 + 1
    }

    private rightChild(index: number) {
        return index * 2 + 2
    }
}


function sortArray(nums: number[]): number[] {
    if (!nums?.length) {
        return nums;
    }

    const heap = new Heap<number>({
        arr: nums,
        heapType: HeapTypes.MIN,
        compare: (a, b) => !!(a - b)
    })
    const newArr: number[] = [];
    let num = heap.pop();
    while (num !== undefined) {
        newArr.push(num)
        num = heap.pop();
    }
    return newArr;
};

const arr = [0, -1, 4, -9, 20, 0, -1, 6]
console.log(sortArray(arr))