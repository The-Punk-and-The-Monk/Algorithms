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

  

* mid 的求法 

  ~~~
  // 当 left + 1 = right 时
  
  // mid 取值为 left
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



