/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  if(!nums || nums.length < 1){
    return -1
  }

  let left = 0, right = nums.length - 1
  while(left <= right){
    let mid = left + Math.floor((right - left) / 2)

    if(nums[mid] == target){
      return mid 
    }else if(nums[mid] >= nums[left]){  // mid 的位置有两种情况
      if(target < nums[mid] && target >= nums[left]){   // 若target 在range(nums[left], nums[mid]) 中, 
        right = mid - 1
      }else{    // 其他情况
        left = mid + 1
      }
    }else {
      if(target > nums[mid] && target <= nums[right]){  // 确定范围
        left = mid + 1
      }else{
        right = mid -1 
      }
    }
  }
  return -1
};