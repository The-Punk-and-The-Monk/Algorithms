/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-09-09 10:33:54
 * @LastEditTime: 2020-09-09 10:34:45
 * @FilePath: /Algorithms/每日一题/lintcode.235.分解质因数.js
 * @Description:
 */
/**
 * @param num: An integer
 * @return: an integer array
 */
const primeFactorization = function (num) {
  let n = num;
  if (n < 2) {
    return [n];
  }
  let ans = [];
  let factor = 2;
  let up = Math.sqrt(num);
  while (n !== 1 && factor <= up) {
    if (n % factor === 0) {
      ans.push(factor);
      n /= factor;
    } else {
      factor += 1;
    }
  }
  if (n !== 1) {
    ans.push(n);
  }
  return ans;
};
