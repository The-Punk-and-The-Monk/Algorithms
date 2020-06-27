==编辑器: Typora ==



## 小总结

### 可以应用的地方:

* 有序数组的二分查找
* 在半有序数组里查找元素
* 确定一个有范围的整数
* 需要查找的目标元素满足某个特定的性质



### 难点

* 循环条件

* mid 的求法 

  ~~~
  // 当 left + 1 = right 时
  
  // mid 取值为 left
  let mid = left + Math.floor((right - left) / 2)
  
  // mid 取值为 right
  let mid = left + Math.floor((right - left + 1) / 2)
  ~~~

  

  

* left, right 的下一个取值

  总是根据当前mid 可不可能是最终结果, 来判断要不要跳过 mid. 如 left = mid, 或 left = mid + 1˙

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

