/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 自己敲的, 差一点, 最后的排序可以直接换成倒序
 */
var nextPermutationMy = function(nums) {

  function swap(left, right){
    const tmp = nums[left]
    nums[left] = nums[right]
    nums[right] = tmp
  }

  function reverse(){
    let left = 0, right = nums.length - 1
    while(left < right){
      swap(left, right)
      left += 1
      right -= 1
    }
  }

  function quickSort(left, right){
    if(left < right){
      const anchor = nums[left]
      const leftTmp = left, rightTmp = right
      while(left < right){
        while(left < right && nums[right] > anchor){
          right -= 1
        }
        swap(left, right)
        while(left < right && nums[left] <= anchor){
          left += 1
        }
        swap(left, right)
      }
      quickSort(leftTmp, left - 1)
      quickSort(left + 1, rightTmp)
    }
  }

  // 找到这样一个数: 设其 idx 为 left, 则 nums[left] 是nums 从右向左 第一个在其右边有比它大的数
  let left = -1
  let rightMax = nums[nums.length - 1]  
  for(let i = nums.length - 2; i >= 0; i--){
    if(nums[i] >= rightMax){
      rightMax = nums[i]
    }else{
      left = i
      break
    }
  }


  if(left != -1){
    let maxmin = Infinity
    let maxminIdx = left
    for(let i = left + 1; i < nums.length; i++){  // 在 left 右边 找到大于 nums[left] 的最小的一个数, 
      if(nums[i] > nums[left] && nums[i] < maxmin){
        maxmin = nums[i]
        maxminIdx = i
      }
    }
    swap(left ,maxminIdx)    // 现在 nums[left] 位置的数对了, 
    quickSort(left+1, nums.length - 1)    // 对 left 右侧排序
  } else {
    reverse()
  }
};


/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 官解思路
 */
var nextPermutation = function(nums) {

  function swap(left, right){
    const tmp = nums[left]
    nums[left] = nums[right]
    nums[right] = tmp
  }

  function reverse(left = 0, right = nums.length - 1){
    while(left < right){
      swap(left, right)
      left += 1
      right -= 1
    }
  }

  // 目标是从右到左, 找到第一对连续的正序数,  nums[left] < nums[left + 1]
  let left = -1
  for(let i = nums.length - 1; i > 0; i--){
    if(nums[i] > nums[i-1]){
      left = i - 1
      break
    }
  }


  // 对nums.slice(left) 的重排列可以获得字典序的下一个数
  if(left != -1){
    let maxmin = Infinity
    let maxminIdx = left
    for(let i = left + 1; i < nums.length; i++){  // 在 left 右边 找到大于 nums[left] 的最小的一个数, 
      if(nums[i] < nums[left]){
        break
      }
      if(nums[i] > nums[left] && nums[i] < maxmin){
        maxmin = nums[i]
        maxminIdx = i
      }
    }
    swap(left ,maxminIdx)    // 现在 nums[left] 位置的数对了, 
    reverse(left + 1, nums.length - 1)    // 对 left 右侧的数进行倒序, 因为在找 left 这个坐标过程中, left 右侧的数是降序排序的, 交换 nums[left] 和 nums[maxminIdx] 也不会改变降序排序, 所以只需要倒序
  } else {
    reverse()
  }
};

const nums = [1,3,2]
// const nums = [1, 4, 6, 2, 4,2,1]
nextPermutation(nums)
console.log(nums)