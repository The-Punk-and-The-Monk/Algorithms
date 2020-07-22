/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
  if(!matrix || matrix.length === 0 || matrix[0].length === 0){
    return 0
  }

  let maxSide = 0
  const m = matrix.length, n = matrix[0].length
  const dp = []
  for(let i = 0; i < m + 1; i++){
    dp.push(new Array(n + 1).fill(0))
  }
  for(let i = 1; i < m + 1; i++){
    for(let j = 1; j < n + 1; j++){
      if(matrix[i-1][j-1] == 1){
        dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
        maxSide = Math.max(maxSide, dp[i][j])
      }
    }
  }
  return maxSide * maxSide
};
