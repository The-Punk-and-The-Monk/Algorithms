var singleNonDuplicate = function(nums) {
  if(nums.length === 1){
    return nums[0];
  }

  let left = 0;
  let right = nums.length - 1;

  while(left <= right){
    let mid = left + Math.floor((right - left) / 2)
    if(mid % 2 == 1){
      mid = mid - 1
    }
    if((mid == 0 || nums[mid-1] < nums[mid]) && 
        (mid == nums.length - 1 || nums[mid] < nums[mid+1])){
      return nums[mid]
    }else if(mid < nums.length - 1 && nums[mid+1] == nums[mid]){
      left = mid + 2
    }else{
      right = mid - 2
    }
  }
};

let nums = [1,1,2,3,3,4,4,8,8]
console.log(singleNonDuplicate(nums))