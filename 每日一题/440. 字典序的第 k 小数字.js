// readme 已记录

var findKthNumber = function(n, k) {
  let cnt = 0;
  let curBase = 1;
  while(true){
    if(cnt + 1 == k){
      return curBase
    }
    let cntCur = countTree(curBase, n)
    if(cnt + cntCur < k){
      curBase += 1;
      cnt += cntCur;
    }else if(cnt + cntCur >= k){
      curBase *= 10;
      cnt += 1;
    }
  }
};

function countTree(base, n){   
  let nextBase = base + 1 // base 的下一个兄弟
  let count = 0
  while(base <= n){
    count += Math.min(n+1, nextBase) - base   // 如果 n 在当前层
    base *= 10
    nextBase *= 10
  }
  return count
}

console.log(findKthNumber(957747794,424238336))