# Sliding Window

## Summary

1. The "sliding window" algorithm is suitable for problems where you need to find a contiguous subarray or substring with certain properties, such as the maximum or minimum sum, longest or shortest length, or any other property that can be evaluated within a consecutive range of elements. Common usage scenarios include analyzing time series data, string manipulation and pattern matching problems, and certain optimizations in array problems.

2. In the context of the "sliding window", consider these three questions to ask yourself:

3. When should the window be expanded?
4. When should the window be reduced?
5. When should the answer be updated?

## Reference

1. https://www.geeksforgeeks.org/window-sliding-technique/
2. https://www.cnblogs.com/huansky/p/13488234.html

## 76. Minimum Window Substring

```
function minWindow(s: string, t: string): string {
    const charCountOfT = countChars(t);
    const charCountOfWindow: Record<string, number> = {};
    Object.entries(charCountOfT).forEach(([char]) => {
        charCountOfWindow[char] = 0;
    })
    const countOfNonDuplicatedCharOfT = Object.keys(charCountOfT).length;
    let validCharsCount = 0;
    let l = 0;
    let r = 0;
    let minLen = Infinity;
    let start = -1;

    while (r < s.length) {
        while (validCharsCount < countOfNonDuplicatedCharOfT && r < s.length) {
            const rc = s[r];
            r++;
            if (charCountOfT[rc]) {
                charCountOfWindow[rc] += 1
                if (charCountOfWindow[rc] === charCountOfT[rc]) {
                    validCharsCount++;
                }
            }
        }

        while (validCharsCount === countOfNonDuplicatedCharOfT) {
            const currLen = r - l;
            if (currLen < minLen) {
                minLen = currLen
                start = l;
            }

            const lc = s[l];
            l++;
            if (charCountOfT[lc]) {
                charCountOfWindow[lc] -= 1;
                if (charCountOfWindow[lc] < charCountOfT[lc]) {
                    validCharsCount--;
                }
            }
        }
    }
    return start !== -1 ? s.substring(start, start + minLen) : ''
}

function countChars(s: string): Record<string, number> {
    const charCount: Record<string, number> = {};
    for (let c of s) {
        if (!charCount[c]) {
            charCount[c] = 0;
        }
        charCount[c] += 1;
    }
    return charCount;
}
```

## 567

```
function checkInclusion(s1: string, s2: string): boolean {
    const charCountOfS1 = countChars(s1);
    const charCountOfWindow: Record<string, number> = {};
    Object.entries(charCountOfS1).forEach(([char]) => {
        charCountOfWindow[char] = 0;
    });
    const countOfNonDuplicatedCharOfS1 = Object.keys(charCountOfS1).length;
    let validCharsCount = 0;
    let l = 0;
    let r = 0;

    while (r < s2.length) {
        const rc = s2[r];
        r++;
        if (charCountOfS1[rc]) {
            charCountOfWindow[rc] += 1;
            if (charCountOfWindow[rc] === charCountOfS1[rc]) {
                validCharsCount++;
            }
        }

        if (r - l >= s1.length) {
            if (validCharsCount === countOfNonDuplicatedCharOfS1) {
                return true;
            }
            const lc = s2[l];
            l++;
            if (charCountOfS1[lc]) {
                if (charCountOfWindow[lc] === charCountOfS1[lc]) {
                    validCharsCount--;
                }
                charCountOfWindow[lc] -= 1;
            }
        }
    }
    return false;
}

function countChars(s: string): Record<string, number> {
    const charCount: Record<string, number> = {};
    for (let c of s) {
        if (!charCount[c]) {
            charCount[c] = 0;
        }
        charCount[c] += 1;
    }
    return charCount;
}
```

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
}
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
}
```

### Similar Questions

#### [1493. Longest Subarray of 1's After Deleting One Element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/description/)

3. Longest Substring Without Repeating Characters
