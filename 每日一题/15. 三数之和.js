/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  if(!nums || nums.length < 3){
    return []
  }
  nums.sort((a, b) => a - b)
  const ans = []
  for(let i = 0; i < nums.length - 2; i++){
    if(i > 0 && nums[i] == nums[i-1]) continue
    const tmp = helper(nums, -nums[i], i+1)
    if(tmp.length != 0){
      for(let [left, right] of tmp){
        ans.push([nums[i], left, right])
      }
    }
  }
  return ans 
};

function helper(nums, target, start){
  let left = start, right = nums.length - 1
  const ans = []
  while(left < right){
    const curSum = nums[left] + nums[right]
    if(curSum == target){
      ans.push([nums[left], nums[right]])
      left += 1
      while(nums[left] == nums[left - 1]){
        left += 1
      }
      right -= 1
      while(nums[right] == nums[right + 1]){
        right -= 1
      }
    }else {
      if(curSum < target){
        left += 1
      }else{
        right -= 1
      }
    }
  }
  return ans
}


const nums = [-1, 0, 1, 2, -1, -4, 9, 10, 9, -2,-1,-1,-1,-5,9,3,15,9, 7,8]  

console.log(threeSum(nums))  // [[-5,-4,9],[-5,-2,7],[-5,2,3],[-4,1,3],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]