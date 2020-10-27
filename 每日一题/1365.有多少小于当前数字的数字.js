/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-10-26 19:45:53
 * @LastEditTime: 2020-10-27 09:47:10
 * @FilePath: /Algorithms/每日一题/1365.有多少小于当前数字的数字.js
 * @Description:
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function (nums) {
  if (!nums || nums.length === 0) {
    return [];
  }
  newNums = [...nums];
  newNums.sort((a, b) => a - b);
  let obj = {};
  let cnt = 0;
  let i = 0;
  while (i < newNums.length) {
    if (obj[newNums[i]] === undefined) {
      obj[newNums[i]] = cnt;
    }
    cnt++;
    i++;
  }
  return nums.map((v) => obj[v]);
};
