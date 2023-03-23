/**
 * @param {string} s
 * @return {number}
 * 动态规划
 */
var longestValidParentheses = function(s) {
  if(!s || s.length <= 1){
    return 0
  }

  const dp = new Array(s.length + 1).fill(0)
  let max = 0
  for(let i = 2; i < s.length + 1; i++){
    const si = i - 1
    if(s[si] == ')'){
      if(s[si - 1] == '('){
        dp[i] = dp[i-2] + 2
      }else if(s[si - dp[i-1] - 1] == '('){
        dp[i] = dp[i-1] + dp[i - dp[i-1] - 2] + 2
      }
      max = Math.max(max, dp[i])
    }
  }
  return max
};