# Sliding Window

## Reference
1. https://www.geeksforgeeks.org/window-sliding-technique/
2. https://www.cnblogs.com/huansky/p/13488234.html

## [1004. Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/description/)
### typical solution
```typescript
function longestOnes(nums: number[], k: number): number {
    let i = 0;
    let j;
    let maximum = 0;
    for (j = 0; j < nums.length; j++) {
        if (nums[j] === 0) k--;
        while (k < 0) {
            if (nums[i] === 0) {
                k++;
            }
            i++;
        }
        maximum = Math.max(maximum, j - i + 1);
    }
    return maximum;
};
```

### ultimate solution
think this as eating beans, and the maximum amount of beans we can eat is k
```typescript
function longestOnes(nums: number[], k: number): number {
    let i = 0;
    let j;
    for (j = 0; j < nums.length; j++) {
        if (nums[j] === 0) k--;
        if (k < 0) {
            if (nums[i] === 0) {
                k++;
            }
            i++;
        }
    }
    return j - i;
};
```

### Similar Questions

#### [1493. Longest Subarray of 1's After Deleting One Element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/description/)
