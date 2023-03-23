var maxProfit = function(k, prices) {
  if(!prices || prices.length < 2 || k == 0){
      return 0
  }

  if(k > Math.floor(prices.length / 2)){
    let profit = 0
    for(let i = 1; i < prices.length; i++){
      if(prices[i] > prices[i - 1]){
        profit += prices[i] - prices[i - 1]
      }
    }
    return profit
  }

  const dp = []
  let profit = 0

  for(let i = 0; i < prices.length; i++){
      let tmp = []
      for(let j = 0; j < k+1; j++){
          tmp.push([-Infinity,-Infinity])
      }
      tmp[0][0] = 0
      tmp[0][1] = -prices[i]
      dp.push(tmp)
  }
  for(let i = 1; i < prices.length; i++){
      for(let j = 0; j < Math.min(k+1, Math.floor((i+1)/2) + 1); j++){
          let tmp = j != 0 ? dp[i-1][j-1][1] : -Infinity;
          dp[i][j][0] = Math.max(dp[i-1][j][0], tmp + prices[i]);
          dp[i][j][1] = Math.max(dp[i-1][j][1], dp[i-1][j][0] - prices[i])
          profit = Math.max(dp[i][j][0], profit)
      }
  }

  return profit
};
