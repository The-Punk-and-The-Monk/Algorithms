/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  if(nums1.length > nums2.length){
      [nums1, nums2] = [nums2, nums1]
  }
  let m = nums1.length
  let n = nums2.length
  let left = 0
  let right = m
  let halfnum = Math.floor((m+n+1)/2)
  while(left <= right){
      let i = left + Math.floor((right - left)/2)
      let j = halfnum - i 
      if((i >= m || nums1[i] >= nums2[j-1]) 
          && (i <= 0 || nums2[j] >= nums1[i-1])
      ){
          let leftMax = nums1[i-1] != undefined ? nums1[i-1] : -Infinity
          leftMax = nums2[j-1] != undefined ? Math.max(leftMax, nums2[j-1]) : leftMax
          if((m + n) % 2 == 1){
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

console.log(findMedianSortedArrays([0,0], [0,0]))