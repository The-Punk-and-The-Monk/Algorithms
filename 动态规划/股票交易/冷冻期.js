var maxProfit = function(prices) {
  if(!prices || prices.length < 2){
      return 0
  }
  const dp = [];
  for(let i = 0; i < prices.length + 1; i++){
      let tmp = [0,0]
      dp.push(tmp)
  }
  dp[1][1] = -prices[0]
  for(let i = 2; i < prices.length+1; i++){
      let cur = prices[i-1]
      dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + cur)
      dp[i][1] = Math.max(dp[i-2][0] - cur, dp[i-1][1])
  }
  return dp[prices.length][0]
};

console.log(maxProfit([1,3,0,-1, 5,6]))