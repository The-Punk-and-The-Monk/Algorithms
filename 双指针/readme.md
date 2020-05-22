编辑器typora

## 双指针的几种形式

1. 左右指针
2. 快慢指针
3. 两个list各一个指针

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



## 两个有序数组的中位数