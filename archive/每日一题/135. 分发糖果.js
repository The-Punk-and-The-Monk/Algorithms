/**
 * @param {number[]} ratings
 * @return {number}
 * 易解的解释
 * https://leetcode-cn.com/problems/candy/solution/candy-cong-zuo-zhi-you-cong-you-zhi-zuo-qu-zui-da-/
 */
var candy = function(ratings) {
  if(ratings.length == 0){
    return 0
  }

  let allCandy = 0
  let left = new Array(ratings.length).fill(1)
  let right = new Array(ratings.length).fill(1)
  for(let i = 1; i < ratings.length; i++){
    if(ratings[i] > ratings[i-1]){
      left[i] = left[i-1] + 1
    }
  }

  for(let i = ratings.length-2; i>=0; i--){
    if(ratings[i] > ratings[i+1]){
      right[i] = right[i+1] + 1
    }
  }

  for(let i = 0; i < ratings.length; i++){
    allCandy += Math.max(left[i], right[i])
  }
  return allCandy
};


// 自己想的 172ms
// /**
//  * @param {number[]} ratings
//  * @return {number}
//  */
// var candy = function(ratings) {
//   if(ratings.length == 0){
//       return 0
//   }

//   let candyArr = new Array(ratings.length).fill(0)
//   let sortedRatingsAndIdx = collectAndSort(ratings)
//   for(let i = 0; i < sortedRatingsAndIdx.length; i++){
//     for(let idx of sortedRatingsAndIdx[i][1]){
//       if(candyArr[idx] == 0){
//         candyArr[idx] = 1
//         kuosan(ratings, idx, candyArr)
//       }
//     }
//   }
//   return candyArr.reduce((acc, curr) => acc + curr, 0)
// };

// function collectAndSort(ratings){
//   let map = new Map()
//   for(let i = 0; i < ratings.length; i++){
//     if(!map.has(ratings[i])){
//       map.set(ratings[i],[])
//     }
//     map.get(ratings[i]).push(i)
//   }

//   return Array.from(map.entries()).sort((a, b) => a[0] - b[0])
// }

// function kuosan(ratings, idx, candyArr){
//   let carry = 1
//   for(let i = idx + 1; i < ratings.length; i++){
//       if(ratings[i] > ratings[i-1]){
//           carry += 1
//       }else{
//           break
//       }
//       candyArr[i] = Math.max(candyArr[i], carry)
//   }

//   carry = 1
//   for(let i = idx - 1; i >= 0; i--){
//       if(ratings[i] > ratings[i+1]){
//           carry += 1
//       }else{
//           break
//       }
//       candyArr[i] = Math.max(candyArr[i], carry)
//   }
// }

console.log(candy([29,51,87,87,72,12]))