interface HeapItem {
    value: number;
    heapIndex: number;
}

class MonotonicQueue {
    private arr: HeapItem[];
    private queue: HeapItem[];

    constructor() {
        this.arr = [];
        this.queue = [];
        this.initHeap();
    }

    public push(n: number) {
        this.addToHeap(n);
    }

    public pop() {
        const targetItem = this.queue.pop();
        if (!targetItem) {
            return;
        }
        this.removeFromHeap(targetItem?.heapIndex);
    }

    public max() {
        return this.arr[0].value;
    }

    private removeFromHeap(i: number) {
        this.swap(i, this.arr.length - 1);
        this.arr.pop();
        this.sinkOrSwim(0);
    }

    private addToHeap(n: number) {
        const item = { value: n, heapIndex: this.arr.length };
        this.arr.push(item);
        this.queue.push(item);
        let i = this.arr.length - 1;
        while (i > 0) {
            const p = this.parent(i);

            const isChildBiggerThanParent = !!(this.arr[i].value - this.arr[p].value);
            if (isChildBiggerThanParent) {
                this.swap(i, p);
                i = p;
            } else {
                break;
            }
        }
    }

    private initHeap() {
        for (let i = this.parent(this.arr.length - 1); i >= 0; i--) {
            this.sinkOrSwim(i);
        }
    }

    private sinkOrSwim(index: number) {
        return this.biggestGoesUp(index);
    }

    private compare(i: HeapItem, j: HeapItem) {
        return !!(i.value - j.value);
    }

    /**
     * biggest biggestGoesUp up
     * smaller ones go down
     * @param index
     * @returns
     */
    private biggestGoesUp(index: number) {
        if (index >= this.arr.length) {
            return;
        }
        const leftChildIndex = this.leftChild(index);
        const rightChildIndex = this.rightChild(index);
        const parent = this.arr[index];
        const leftChild = this.arr[leftChildIndex];
        const rightChild = this.arr[rightChildIndex];
        const isLeftChildExist = leftChild !== undefined;
        const isRightChildExist = rightChild !== undefined;
        const isParentSmallerThanLeftChild = isLeftChildExist ? this.compare(leftChild, parent) : false;
        const isParentSmallerThanRightChild = isRightChildExist ? this.compare(rightChild, parent) : false;
        const isLeftChildSmallerThanRightChild =
            isLeftChildExist && isRightChildExist ? this.compare(rightChild, leftChild) : false;
        if (!(isParentSmallerThanLeftChild || isParentSmallerThanRightChild)) {
            return;
        }
        if (isLeftChildSmallerThanRightChild && rightChildIndex < this.arr.length) {
            this.swap(index, rightChildIndex);
            this.biggestGoesUp(rightChildIndex);
            return;
        }
        if (!isLeftChildSmallerThanRightChild && leftChildIndex < this.arr.length) {
            this.swap(index, leftChildIndex);
            this.biggestGoesUp(leftChildIndex);
        }
    }

    private swap(index1: number, index2: number) {
        const temp = this.arr[index1];
        this.arr[index1] = this.arr[index2];
        this.arr[index2] = temp;

        this.arr[index1].heapIndex = index1;
        this.arr[index2].heapIndex = index2;
    }

    private parent(index: number) {
        return Math.ceil(index / 2) - 1;
    }

    private leftChild(index: number) {
        return index * 2 + 1;
    }

    private rightChild(index: number) {
        return index * 2 + 2;
    }
}

function maxSlidingWindow(nums: number[], k: number): number[] {
    const res: number[] = [];
    if (!nums?.length || k <= 0) {
        return res;
    }
    const queue = new MonotonicQueue();
    for (let i = 0; i < nums.length; i++) {
        if (i < k - 1) {
            queue.push(nums[i]);
        } else {
            queue.push(nums[i]);
            res.push(queue.max());
            queue.pop();
        }
    }
    return res;
}
