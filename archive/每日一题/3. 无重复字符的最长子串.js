var lengthOfLongestSubstring = function(s) {
  if(s.length == 0){
    return 0
  }
  let left = 0
  let lookup = new Set()
  let n = s.length
  let maxLen = 0
  let curLen = 0
  for(let i = 0; i < n; i++){
    curLen += 1
    while(lookup.has(s[i])){
      lookup.delete(s[left])
      left += 1
      curLen -= 1
    }
    maxLen = Math.max(maxLen, curLen)
    lookup.add(s[i])
  }
  return maxLen
};