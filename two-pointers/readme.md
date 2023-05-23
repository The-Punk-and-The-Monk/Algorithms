编辑器typora

## 双指针的几种形式

1. 左右指针
2. 快慢指针
3. 两个list各一个指针

## [189. Rotate Array](https://leetcode.com/problems/rotate-array/description/)
```typescript
/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
    if (!nums?.length) {
        return
    }
    
    const len = nums.length;
    const kModLen = k % len;
    flip(nums, len - kModLen, len - 1);
    flip(nums, 0, len - kModLen - 1);
    flip(nums, 0, len - 1);
};

function flip(nums: number[], l: number, r: number): void {
    if (!nums?.length || l < 0 || r >= nums.length) {
        return
    }
    while (l < r) {
        const tmp = nums[l];
        nums[l] = nums[r];
        nums[r] = tmp;
        l += 1;
        r -= 1;
    }
}
```

## 167. Two Sum II - Input array is sorted (Easy) 

[leetcode](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/description/)

简述：在有序数组中找出两个数，使它们的和为 target。

easy



## 633. Sum of Square Numbers (Easy)

[leetcode](https://leetcode-cn.com/problems/sum-of-square-numbers/description/)

简述：判断一个非负整数是否为两个整数的平方和。

~~~python
square_nums = [i*i for i in range(int(math.sqrt(c)) + 1)]
# 左右双指针
~~~



## 345. Reverse Vowels of a String (Easy)

[leetcode](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/description/)

简述：反转字符串中的元音字符

~~~
def reverseVowels(self, s: str) -> str:
		s = list(s)
		# 左右双指针
~~~



## 680. Valid Palindrome II (Easy)

[leetcode](https://leetcode-cn.com/problems/valid-palindrome-ii/description/)

简述：可以删除一个字符，判断是否能构成回文字符串。

~~~
def validPalindrome(s):
		i, j = 0, len(s) - 1
		while i <= j:
				if s[i] != s[j]:  # 一次机会
						return self.isPalindrome(s, i, j) or self.isPalindrome(s, i+1, j+1)
				i += 1
				j -= 1
		return True 

def is Palindrome(s, i, j):
		# 左右双指针
		
~~~



## 88. Merge Sorted Array (Easy)

[leetcode](https://leetcode-cn.com/problems/merge-sorted-array/description/)

简述：归并两个有序数组

~~~
easy
# 题目中指出 nums1 长度是m + n， 可以从后面开始遍历，以节省空间
~~~



## 141. Linked List Cycle (Easy)

[leetcode](https://leetcode-cn.com/problems/linked-list-cycle/description/)

简述：判断链表是否存在环

~~~
# 快慢指针，一个指针走一步，一个指针走两步
~~~



## 524. Longest Word in Dictionary through Deleting (Medium)

[leetcode](https://leetcode-cn.com/problems/longest-word-in-dictionary-through-deleting/description/)

简述：删除 s 中的一些字符，使得它构成字符串列表 d 中的一个字符串，找出能构成的最长字符串。如果有多个相同长度的结果，返回字典序的最小字符串。

例子：

```
Input:
s = "abpcplea", d = ["ale","apple","monkey","plea"]

Output:
"apple"
```

~~~
class Solution:
    def findLongestWord(self, s: str, d: List[str]) -> str:
        d.sort(key = lambda s: (-len(s), s))	# 多条件排序
        
        def helper(target):
            i = 0
            for c in target:
                k = s.find(c, i)	# 效率比自己敲的高。。72ms
                if k == -1:
                    return False 
                i = k + 1
            return True 
          
        # s_contains = set(list(s))
        # def helper2(target):  # 自己敲的双指针，360ms
        #     i, j = 0, 0
        #     while i < len(s) and j < len(target) and (len(s) - i >= len(target) - j):
        #         if target[j] not in s_contains:
        #             return False
        #         while i < len(s) and s[i] != target[j]:
        #             i += 1
        #         if i < len(s):
        #             i += 1
        #             j += 1
        #     if j == len(target):
        #         return True
        #     return False

        for target in d:
            if helper(target):
                return target
        return ""
~~~



## 4.寻找两个正序数组的中位数

[leetcode](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

假设nums1 and nums2 不同时为空

~~~python
"""
nums1: [0, ..., i-1] [i, m-1]
nums2: [0, ..., j-1] [j, n-1]

nums1[i-1] < nums2[j]
nums2[j-1] < nums1[i]

i + j = (m + n + 1) // 2
i的有效取值范围为[0, m]
when i == 0: nums1_left_part is none
when i == m: nums1_right_part is none

如果总是有 m < n
则有
when i > 0: j < n
when i < m: j > 0
"""


from typing import List

class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        if len(nums1) > len(nums2):     # make nums1 shorter
            nums1, nums2 = nums2, nums1
        m, n = len(nums1), len(nums2)
        i_left, i_right, half_len = 0, m, (m + n + 1)//2

        # 易理解版
        # while i_left <= i_right:
        #     i = i_left + (i_right - i_left) // 2
        #     j = half_len - i
        #
        #     if (i <=0 or j >= n or nums1[i-1] <= nums2[j]) and (j <= 0 or i >= m or nums2[j-1] <= nums1[i]):
        #         if (m + n) % 2 == 1:
        #             if i == 0:
        #                 return nums2[j-1]
        #             if j == 0:
        #                 return nums1[i-1]
        #             return max(nums1[i-1], nums2[j-1])
        #         else:
        #             nums1_i_1 = nums1[i-1] if i > 0 else float('-inf')
        #             nums2_j_1 = nums2[j-1] if j > 0 else float('-inf')
        #             max_left = max(nums1_i_1, nums2_j_1)
        #
        #             nums1_i = nums1[i] if i < m else float('inf')
        #             nums2_j = nums2[j] if j < n else float('inf')
        #             min_right = min(nums1_i, nums2_j)
        #             return max_left + (min_right - max_left) / 2
        #     if i > 0 and j < n and nums1[i-1] > nums2[j]:
        #         i_right = i - 1
        #     if i < m and j > 0 or nums2[j-1] > nums1[i]:
        #         i_left = i + 1

        # 简化版
        while i_left <= i_right:
            i = i_left + (i_right - i_left) // 2
            j = half_len - i
            if i > 0 and nums1[i-1] > nums2[j]:
                i_right = i - 1
            elif i < m and nums2[j-1] > nums1[i]:
                i_left = i + 1
            else:
                nums1_im1 = nums1[i-1] if i > 0 else float('-inf')
                nums2_jm1 = nums2[j-1] if j > 0 else float('-inf')
                left_max = max(nums1_im1, nums2_jm1)
                if (m + n) % 2 == 1:
                    return left_max * 1.0

                nums1_i = nums1[i] if i < m else float('inf')
                nums2_j = nums2[j] if j < n else float('inf')
                right_min = min(nums1_i, nums2_j)
                return (left_max + right_min) / 2.0


if __name__ == '__main__':
    nums1 = [1, 3]
    nums2 = [2]
    solution = Solution()
    print(solution.findMedianSortedArrays(nums1, nums2))

~~~

