## [23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/description/)

```typescript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

import { ListNode } from './typical-data-structures/list-node';

export enum HeapTypes {
    MAX,
    MIN,
}

export class Heap<T> {
    public heapType: HeapTypes;
    private arr: T[];
    private compare: (item1: T, item2: T) => boolean;

    constructor(params: {
        arr: T[];
        heapType: HeapTypes;
        // return true if item1 big than item2
        compare: (item1: T, item2: T) => boolean;
    }) {
        this.arr = params.arr;
        this.heapType = params.heapType;
        this.compare = params.compare;
        this.initHeap();
    }

    get length() {
        return this.arr.length;
    }

    get top() {
        return this.arr[0];
    }

    public pop() {
        this.swap(0, this.arr.length - 1);
        const res = this.arr.pop();
        this.sinkOrSwim(0);

        return res;
    }

    public add(item: T) {
        this.arr.push(item);
        let i = this.arr.length - 1;
        while (i > 0) {
            const p = this.parent(i);
            const isChildBiggerThanParent = this.compare(this.arr[i], this.arr[p]);
            if (
                (this.heapType === HeapTypes.MAX && isChildBiggerThanParent) ||
                (this.heapType === HeapTypes.MIN && !isChildBiggerThanParent)
            ) {
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
        if (this.heapType === HeapTypes.MAX) {
            return this.biggestGoesUp(index);
        }
        return this.smallestGoesUp(index);
    }

    /**
     * smallest goes up
     * bigger ones smallestGoesUp down
     * @param index
     * @returns
     */
    private smallestGoesUp(index: number) {
        if (index >= this.arr.length) {
            return;
        }
        const leftChildIndex = this.leftChild(index);
        const rightChildIndex = this.rightChild(index);
        const currItem = this.arr[index];
        const leftChild = this.arr[leftChildIndex];
        const rightChild = this.arr[rightChildIndex];
        const isLeftChildExist = leftChild !== undefined;
        const isRightChildExist = rightChild !== undefined;
        const isParentBiggerThanLeftChild = isLeftChildExist ? this.compare(currItem, leftChild) : false;
        const isParentBiggerThanRightChild = isRightChildExist ? this.compare(currItem, rightChild) : false;
        const isLeftChildBiggerThanRightChild =
            isLeftChildExist && isRightChildExist ? this.compare(leftChild, rightChild) : false;
        if (!(isParentBiggerThanLeftChild || isParentBiggerThanRightChild)) {
            return;
        }
        if (isLeftChildBiggerThanRightChild && rightChildIndex < this.arr.length) {
            this.swap(index, rightChildIndex);
            this.smallestGoesUp(rightChildIndex);
            return;
        }
        if (!isLeftChildBiggerThanRightChild && leftChildIndex < this.arr.length) {
            this.swap(index, leftChildIndex);
            this.smallestGoesUp(leftChildIndex);
        }
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

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    lists = lists.filter((node) => !!node);
    const dummyNode = new ListNode(-1);
    const heap = new Heap<ListNode>({
        arr: lists as Array<ListNode>,
        heapType: HeapTypes.MIN,
        compare: (node1, node2) => node1.val > node2.val,
    });

    let tail = dummyNode;

    while (heap.length) {
        const p = heap.pop();
        if (!p) {
            continue;
        }
        const next = p.next;
        p.next = null;
        tail.next = p;
        tail = tail.next;
        if (next) {
            heap.add(next);
        }
    }
    return dummyNode.next;
}
```
