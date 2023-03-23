/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  if(!intervals || intervals.length < 2){
    return intervals
  }

  intervals.sort((a, b) => a[0] - b[0])
  const ans = [intervals[0].slice(0)]
  let ansLen = 1
  for(let i = 1; i < intervals.length; i++){
    if(intervals[i][0] <= ans[ansLen-1][1]){
      ans[ansLen-1][1] = Math.max(ans[ansLen-1][1] , intervals[i][1])
    }else{
      ans.push(intervals[i].slice(0))
      ansLen += 1
    }
  }
  return ans 
};