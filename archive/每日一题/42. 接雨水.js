/**
 * 自己写的
 * 两次遍历
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  if(height.length == 0){
    return 0
  }
  let maxHeight = findMax(height) // 此题最大的问题就是要找到左右比自己高的山, 所以这里干脆直接找到最高的山

  // left to maxHeight  从左边爬到最高的山, 记下自己左边的最高的山, 则当前位置能容下的雨水就以左边的山为准
  let lastWall = 0
  let cnt = 0
  let left = 0
  while(height[left] != maxHeight){
    if(height[left] < lastWall){
      cnt += lastWall - height[left]
    }else{
      lastWall = height[left]
    }
    left += 1
  }

  //right to maxHeight  从右边爬到最高的山, 
  lastWall = 0
  let right = height.length-1
  while(height[right] != maxHeight){
    if(height[right] < lastWall){
      cnt += lastWall - height[right]
    }else{
      lastWall = height[right]
    }
    right -= 1
  }

  if(left + 1 < right){   // 如果最高的山有好几个等高的山峰, 则它们中间的雨水量都以最高山为基准
    for(let i = left; i < right; i++){
      if(height[i] < maxHeight){
        cnt += maxHeight - height[i]
      }
    }
  }

  return cnt
};

function findMax(height) {
  let max = -Infinity
  for(let i = 0; i < height.length; i++) {
    max = Math.max(max,height[i])
  }
  return max
}


/**
 * @param {number[]} height
 * @return {number}
 * 一次遍历的解法
 * 双指针, 从左到右有 left_max, 从右到左有 right_max, 互为依靠
 */
var trap = function(height) {
  let leftMax = 0
  let rightMax = 0
  let cnt = 0
  let left = 0
  let right = height.length - 1
  while(left <= right) {
    while(left <= right && leftMax <= rightMax) {   // 当 rightMax >= leftMax 时, 往左走, 可以保证当前位置的右侧不会低于 rightMax
      if(height[left] < leftMax) {
        cnt += leftMax - height[left]
      }else{
        leftMax = height[left]
      }
      left += 1
    }

    while(left <= right && leftMax >= rightMax) {
      if(height[right] < rightMax) {
        cnt += rightMax - height[right]
      }else{
        rightMax = height[right]
      }
      right -= 1
    }
  }
  return cnt
};


console.log(trap([2,0,2]))