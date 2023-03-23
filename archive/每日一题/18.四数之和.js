/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-10-27 13:07:31
 * @LastEditTime: 2020-10-27 13:07:36
 * @FilePath: /Algorithms/每日一题/18.四数之和.js
 * @Description:
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 * 去重思路，每次移动指针都要确保数字改变了
 */
var fourSum = function (nums, target) {
  if (!nums || nums.length < 4) {
    return [];
  }
  let res = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue;
      }
      let l = j + 1;
      let r = nums.length - 1;
      while (l < r) {
        let sum = nums[i] + nums[j] + nums[l] + nums[r];
        if (sum === target) {
          res.push([nums[i], nums[j], nums[l], nums[r]]);
          while (l < r && nums[l] === nums[l + 1]) {
            l += 1;
          }
          while (l < r && nums[r] === nums[r - 1]) {
            r -= 1;
          }
          l += 1;
          r -= 1;
        } else if (sum < target) {
          l += 1;
        } else {
          r -= 1;
        }
      }
    }
  }
  return res;
};
