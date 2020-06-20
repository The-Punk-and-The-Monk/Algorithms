var findMaxForm = function(strs, m, n) {
  if(!strs || strs.length == 0){
      return 0
  }
  let dp =[]
  for(let i = 0; i < m + 1; i++){
      dp.push(new Array(n+1).fill(0));
  }
  
  for(let i = 1; i < strs.length+1; i++){
      let [zeros, ones] = cnt(strs[i-1])
      for(let j = m; j >= zeros; j--){
          for(let k = n; k >= ones; k--){
              dp[j][k] = Math.max(dp[j][k], dp[j-zeros][k-ones] + 1)
          }
      }
  }
  return dp[m][n]
};

function cnt(str){
  let ones = 0;
  let zeros = 0;
  for(let c of str){
      switch(c){
          case '1':{
              ones += 1
              break
          }
          case '0':{
              zeros += 1
              break
          }
          default:{
              throw new Error('invalid char in str: ' + c)
          }
      }
  }
  return [zeros, ones]
}