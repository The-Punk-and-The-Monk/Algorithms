/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if(!s || s.length == 0){
    return ''
  }
  if(s.length == 1){
    return s
  }

  let sR = ''
  for(let i = s.length - 1; i >= 0; i--){
    sR += s[i]
  }

  let max = helper(s, sR)
  if(max[0] == 0){
    return ''
  }else{
    return s.slice(max[1] - max[0] + 1, max[1]+1)
  }
};

function helper(s1, s2){
  const dp = []
  for(let i = 0; i < s1.length + 1; i++){
    dp.push(new Array(s2.length + 1).fill(0))
  }

  let max = [0, -1, -1]
  for(let i = 1; i < s1.length + 1; i++){
    for(let j = 1; j < s2.length + 1; j++){
      const c1 = s1[i-1], c2 = s2[j - 1]
      if(c1 == c2){
        dp[i][j] = dp[i-1][j-1] + 1
        if(dp[i][j] > max[0]){
          max = [dp[i][j], i-1, j-1]
        }
      }
    }
  }
  return max
}

console.log(longestPalindrome("babaddaegeaddsssssddfggssff"))