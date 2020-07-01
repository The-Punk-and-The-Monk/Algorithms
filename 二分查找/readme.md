==编辑器: Typora ==



## 小总结

### 可以应用的地方:

* 有序数组的二分查找
* 在半有序数组里查找元素
* 确定一个有范围的整数
* 需要查找的目标元素满足某个特定的性质



### 难点

* 循环条件

  当确定要找的目标就在数组里面, 用 left <= right, 在循环体里面处理好边界问题

  当目标不一定在数组里面, 比如寻找插入位置, 用 left < right, 跳出循环后对边界做判断, 可见题: 在排序数组中查找元素的第一个和最后一个位置

  

* mid 的求法 

  ~~~
  // 当 left + 1 = right 时
  
  // mid 取值为 left, 如果 left 的下一个取值是 mid 可能会陷入死循环
  let mid = left + Math.floor((right - left) / 2)
  
  // mid 取值为 right
  let mid = left + Math.floor((right - left + 1) / 2)
  ~~~

  

  

* left, right 的下一个取值

  总是根据当前mid 可不可能是最终结果, 来判断要不要跳过 mid. 如 left = mid, 或 left = mid + 1˙. 见题:寻找比目标字母大的最小字母

* 边界值处理

* 最终返回值



### [69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)

确定一个有范围的整数

~~~javascript
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if(x==0){
        return 0
    }
    if(x <= 3){
        return 1
    }
    let l = 2
    let r = Math.floor(x/2) + 1
    while(l <= r){	// 非常确定要找的数就在范围里面
        let mid = l + Math.floor((r-l)/2)
        let midSquare = mid*mid 
        let midPlusOneSquare = (mid+1)*(mid+1)
        if(midSquare <= x && midPlusOneSquare > x){
            return mid
        }else if(midSquare > x){
            r = mid -1		// 现在的 mid 肯定不是结果. 直接跳过
        }else{
            l = mid + 1		// 现在的 mid 肯定不是结果, 直接跳过
        }
    }
};
~~~



### [744. 寻找比目标字母大的最小字母](https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/)

有序数组的二分查找

~~~javascript
/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function(letters, target) {
    if(letters.length == 1){
        return letters[0]
    }

    let left = 0
    let right = letters.length - 1
    while(left <= right){	// 确定要找的在数组里
        let mid = left + Math.floor((right-left)/2)
        let curChar = letters[mid]
        if((mid == 0) || (letters[mid-1] <= target && curChar > target)){	// 由于有序, 如果一直循环到 mid=0, 则 mid 便是结果.
            return letters[mid]
        }else if(mid == letters.length -1){	// 如果mid 为 len-1还不满足上面的条件, 则根据题意, 结果是 0
            return letters[0]
        }else if(curChar <= target){ 
            left = mid + 1
        }else{
            right = mid
        }
    }
};
~~~

这里 left, right 的取值说明一下

分成三种情况分析:

1. curChar < target: mid 不可能是答案, 而且是小于, 所以选择 left = mid + 1. 跳过这个 mid
2. curChar = target: mid 也不可能是答案, 由于有序递增, 答案在左侧, 所以选择 left = mid+1, 跳过这个 mid
3. curChar > target: mid 可能是答案, 答案<=curChar, 所以 right = mid



### [540. 有序数组中的单一元素](https://leetcode-cn.com/problems/single-element-in-a-sorted-array/)

有序数组的二分查找

~~~
var singleNonDuplicate = function(nums) {
  if(nums.length === 1){
    return nums[0];
  }

  let left = 0;
  let right = nums.length - 1;

  while(left <= right){
    let mid = left + Math.floor((right - left) / 2)
    
    if(mid % 2 == 1){	// 因为单一元素的 index 肯定是偶数
      mid = mid - 1
    }
    
    if((mid == 0 || nums[mid-1] < nums[mid]) && 
        (mid == nums.length - 1 || nums[mid] < nums[mid+1])){
      return nums[mid]
    }else if(mid < nums.length - 1 && nums[mid+1] == nums[mid]){	// 单一元素在当前元素的左侧, 建议在纸上写个数组看看就懂了
      left = mid + 2
    }else{
      right = mid - 2
    }
  }
};
~~~



### [278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)

有序数组的二分查找

~~~
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let left = 1
        let right = n
        while(left <= right){
            let mid = left + Math.floor((right - left) / 2)
            if((mid == 0 || !isBadVersion(mid-1)) && isBadVersion(mid)){
                return mid
            }else if(!isBadVersion(mid)){
                left = mid + 1
            }else{
                right = mid
            }
        }
    };
};
~~~



### [153. 寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)



~~~javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  if(nums.length == 1){
      return nums[0]
  }
  let left = 0
  let right = nums.length - 1
  
  // 应对 没有翻转的有序数组
  if(nums[right] > nums[0]){
  	return nums[0]
  }
  
  while(left <= right){
      let mid = left + Math.floor((right - left)/ 2)
      if((mid == 0 || nums[mid - 1] > nums[mid]) && (mid == nums.length-1 || nums[mid] < nums[mid+1])){
          return nums[mid]
      }else if(mid == 0 || nums[mid] > nums[0]){
          left = mid + 1
      }else{
          right = mid - 1
      }
  }
};
~~~



### [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)



~~~javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let leftEdge = findLeftEdge(nums, target)
    if(leftEdge == -1){
        return [-1, -1]
    }
    let rightEdge = findRightEdge(nums, target)
    return [leftEdge, rightEdge]
};

function findLeftEdge(nums, target){
    let left = 0
    let right = nums.length - 1
    while(left < right){	// target 不一定在 nums 里
        let mid = left + Math.floor((right - left) / 2)
        if(nums[mid] == target && (mid == 0 || nums[mid - 1] < target)){
            return mid
        }else if(nums[mid] < target){		
            left = mid + 1
        }else{	// num[mid] == target 时, mid可能是结果, 因为要寻找左边界, 所以选择 right 向左走
            right = mid
        }
    }
    return nums[left] == target ? left : -1		// 必有 left == right, 见下面的分析
}

function findRightEdge(nums, target){
    let left = 0
    let right = nums.length - 1
    while(left < right){
        let mid = left + Math.floor((right - left)/2)
        if(nums[mid] == target && (mid == nums.length - 1 || nums[mid + 1] > target)){ 
            return mid
        }else if(nums[mid] <= target){	// num[mid] == target 时, mid可能是结果, 因为要寻找右边界, 所以选择 left 向右走
            left = mid + 1
        }else{
            right = mid
        }
    }
    return nums[right] == target ? right : -1
}
~~~



由于当 left + 1 = right 时, 

* mid 取 left
* left = mid + 1 // 原 right
* right = mid // 原 left 

下一个循环必有 left == right, 而且不会陷入死循环



### ==[4. 寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)==

设数组为 A, B, len 分别为m, n

A:[0, … , m-1]

B:[0, … , n-1]

在A 取 i, B 取 j

A:[0,…,i-1, i,…,m-1]

B:[0,…,j-1, j,…,n-1]

假设 i 跟 j 的取值满足:
$$
A[i] >= B[j-1] \\
B[j] >= A[i-1]
$$
则中位数在这四个数中



接下来要推:

* i, j 的关系
* i 的边界取值对 j 的影响, 即 i >= m 时, i <= 0 时, 可用于节省条件判断

~~~javascript
var findMedianSortedArrays = function(nums1, nums2) {
  if(nums1.length > nums2.length){
      [nums1, nums2] = [nums2, nums1]
  }
  let m = nums1.length
  let n = nums2.length
  let left = 0
  let right = m
  let halfnum = Math.floor((m+n+1)/2)
  while(left <= right){		// 确定可以在 [left, right]中找到这样一个 i
      let i = left + Math.floor((right - left)/2)
      let j = halfnum - i 
      if((i >= m || nums1[i] >= nums2[j-1]) 
          && (i <= 0 || nums2[j] >= nums1[i-1])
      ){
          let leftMax = nums1[i-1] != undefined ? nums1[i-1] : -Infinity
          leftMax = nums2[j-1] != undefined ? Math.max(leftMax, nums2[j-1]) : leftMax
          if((m + n) % 2 == 1){		//根据 halfnum 的求法, 当m+n 为奇数是, 中位数处于左半部分
              return leftMax
          }

          let rightMin = nums1[i] != undefined ? nums1[i] : Infinity
          rightMin = nums2[j] != undefined ? Math.min(rightMin, nums2[j]) : rightMin

          return (leftMax + rightMin) / 2
      } else if(i < m && nums1[i] < nums2[j-1]){
          left = i + 1
      }else{
          right = i - 1
      }
  }
};
~~~

