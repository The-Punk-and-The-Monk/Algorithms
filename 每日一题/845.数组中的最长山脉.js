/**
 * @param {number[]} A
 * @return {number}
 * 解法：模拟上山下山，用up表示正在上坡
 */
var longestMountain = function (A) {
  if (A.length < 3) {
    return 0;
  }
  let max = 0;
  let up = true;
  let upSteps = 0;
  let downSteps = 0;
  for (let i = 1; i < A.length; i++) {
    if (A[i] > A[i - 1]) {
      if (up) {
        upSteps += 1;
      } else {
        upSteps = 1;
        up = true;
        downSteps = 0;
      }
    } else if (A[i] < A[i - 1]) {
      if (up) {
        up = false;
      }
      downSteps += 1;
      if (upSteps !== 0) {
        max = Math.max(max, upSteps + downSteps + 1);
      }
    } else {
      up = true;
      upSteps = 0;
      downSteps = 0;
    }
  }
  return max;
};

let A = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
console.log(longestMountain(A));
