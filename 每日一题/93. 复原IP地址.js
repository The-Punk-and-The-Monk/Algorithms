/**
 * @param {string} s
 * @return {string[]}
 * 
 * 主要是 合法 ip 字段的判断比较麻烦
 * 合法 ip: 除 0 外, 不得以 0 开头
 *
 */
var restoreIpAddresses = function(s) {
  if (s.length > 12) {
    return []
  }

  let ans = []
  backtracking(s, 0, [], 0, ans)
  return ans
};

function backtracking(s, start, prev, part, ans) {  // part 从 0 开始
  if (part == 4) {  
    if (start == s.length) {
      ans.push(prev.join('.'))
    }
    return
  }
  if (checkLen(s, start, part)) {
    for (let i = 1; i < 4; i++) {
      let end = start + i
      if (end > s.length) {
        break
      }
      if (validNum(s, start, end)) {
        prev.push(s.slice(start, end))
        backtracking(s, end, prev, part + 1, ans)
        prev.pop()
      }
    }
  }
}

function checkLen(s, start, part) {   // part 从 0 开始
  if (s.length - start > (4 - part) * 3) {
    return false
  }
  return true
}

function validNum(s, start, end) {
  let num = parseInt(s.slice(start, end))
  if(num == 0 && start + 1 != end){   // 排除 '00', '000'
    return false
  }
  if(num > 0 && s[start] == '0'){   // 排除 '01', '011', '001'
    return false
  }
  if (num >= 0 && num < 256) {
    return true
  }
  return false
}

console.log(restoreIpAddresses("010010"))