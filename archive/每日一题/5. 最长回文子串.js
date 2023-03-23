/**
 * @param {string} s
 * @return {string}
 * 动态规划: O(n**2)
 * 中心扩散: O(n**2)
 * Manacher: O(n)
 */
var longestPalindrome = function(s) {
  if(!s){
    return ''
  }

  if(s.length == 1){
    return s
  }

  const dp = []
  for(let i = 0; i < s.length; i++){
    dp.push([1])
  }
  let maxLen = 1
  let tail = 0
  for(let i = 1; i < s.length; i++){
    if(s[i] == s[i-1]){
      dp[i].push(2)
    }
    for(let l of dp[i-1]){
      let idx = i - l - 1
      if (idx >= 0 && s[i] == s[idx]){
        dp[i].push(l + 2)
      }
    }
    const curMax = Math.max(...dp[i])
    if(curMax > maxLen){
      maxLen = curMax
      tail = i
    }
  }
  return s.slice(tail - maxLen + 1, tail + 1)
}

/**
 * @param {string} s
 * @return {string}
 * 慢3倍
 */
var longestPalindrome2 = function(s) {
  if(!s){
    return ''
  }

  if(s.length == 1){
    return s
  }

  const dp = []
  for(let i = 0; i < s.length; i++){
    dp.push(new Array(s.length).fill(false))
  }

  let maxLen = 1
  let ans = s[0]
  for(let l = 0; l < s.length; l++){
    for(let i = 0; i < s.length; i++){
      const j = i + l 
      if(j >= s.length){
        break
      }
      if(l == 0){
        dp[i][j] = true
      }else if(l == 1){
        dp[i][j] = (s[i] == s[j])
      } else {
        dp[i][j] = (dp[i+1][j-1] && s[i] == s[j])
      }
      if(dp[i][j] && (l + 1) > maxLen){
        maxLen = l + 1
        ans = s.slice(i, j+1)
      }
    }
  }
  return ans
}

const s = "aaaaaaaaaaaa"
console.log(longestPalindrome(s))