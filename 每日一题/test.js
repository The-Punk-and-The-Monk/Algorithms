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

let nums = [2, 1]
console.log(findMin(nums))