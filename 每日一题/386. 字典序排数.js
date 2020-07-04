/**
 * https://leetcode-cn.com/problems/lexicographical-numbers/
 * 十叉数的前序遍历
 */

 /**
 * @param {number} n
 * @return {number[]}
 */
var lexicalOrder = function(n) {
  let arr = []
  for(let i = 1; i < 10; i++){
    if(i > n){
      break
    }
    arr.push(i)
    preOrder(i, arr, n)
  }
  return arr
};

function preOrder(root, arr, n){
  root = root * 10
  for(let i = 0; i < 10; i++){
    let cur = root + i 
    if(cur > n){
      break
    }
    arr.push(cur)
    preOrder(cur, arr, n)
  }
}