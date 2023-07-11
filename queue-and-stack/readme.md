# Stack

## Parentheses

1541. Minimum Insertions to Balance a Parentheses String 1541. 平衡括号字符串的最少插⼊次 数 🟠
1542. Valid Parentheses 20. 有效的括号 🟢
1543. Minimum Add to Make Parentheses Valid 921. 使括号有效的最少添加

## Monotonic Stack

A monotone stack is really just a stack, with some clever logic that keeps the elements in order (monotonically increasing or monotonically decreasing) every time a new element is added to the stack. Sounds like a heap, right? No, monotone stacks are less useful and only deal with a typical class of problems, such as "next larger element", "last smaller element", etc.

496. Next Greater Element I 496. 下⼀个更⼤元素 I 🟢 503. Next Greater Element II 503. 下⼀个更⼤元素 II 🟠 739. Daily Temperatures 739. 每⽇温度 🟠 - 剑指 Offer II 038. 每⽇温度

```typescript
function nextGreaterElements(nums: number[]): number[] {
    if (!nums?.length) {
        return [];
    }
    const res = new Array(nums.length).fill(-1);
    const stack = [];
    const n = nums.length;
    let i = nums.length * 2 - 1;
    while (i >= 0) {
        while (stack.length && stack[stack.length - 1] <= nums[i % n]) {
            stack.pop();
        }
        res[i % n] = stack.length ? stack[stack.length - 1] : -1;
        stack.push(nums[i % n]);
        i--;
    }
    return res;
}
```

## Monotonic Queue

给你⼀个数组 window，已知其最值为 A，如果给 window 中添加⼀个数 B，那么⽐较⼀下 A 和 B 就可以⽴即 算出新的最值；但如果要从 window 数组中减少⼀个数，就不能直接得到最值了，因为如果减少的这个数恰 好是 A，就需要遍历 window 中的所有元素重新寻找新的最值

239. Sliding Window Maximum

```typescript
class MonotonicQueue {
    private arr: number[];
    constructor() {
        this.arr = [];
    }
    public pop(n: number) {
        if (!this.arr.length || this.arr[0] !== n) {
            return;
        }
        return this.arr.shift();
    }

    public push(n: number) {
        while (this.arr.length && this.arr[this.arr.length - 1] < n) {
            this.arr.pop();
        }
        this.arr.push(n);
    }
    public max() {
        return this.arr[0];
    }
}

function maxSlidingWindow(nums: number[], k: number): number[] {
    if (!nums.length || k <= 0) {
        return [];
    }
    const queue = new MonotonicQueue();
    const res: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        if (i < k - 1) {
            queue.push(nums[i]);
        } else {
            queue.push(nums[i]);
            res.push(queue.max());
            queue.pop(nums[i - k + 1]);
        }
    }
    return res;
}
```
