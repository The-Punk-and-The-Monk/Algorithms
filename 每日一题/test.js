/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  let squareNumsSet = new Set();
  for(let i = 1; i*i <= n; i++){
    squareNumsSet.add(i*i);
  }

  let q = new Set([n])
  let level = 0
  while(q.size != 0){
    level += 1
    let newQ = new Set()
    for(let target of q){
      if(squareNumsSet.has(target)){
        return level
      }
      for(let squareNum of squareNumsSet){
        if(squareNum <= target){
          newQ.add(target - squareNum)
        }
      }
    }
    q = newQ
  }
  return -1
};

console.log(numSquares(13))