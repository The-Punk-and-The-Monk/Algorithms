function knapsack(W, N, weights, values) {
  let dp = []
  for (let i = 0; i < N + 1; i++) {
    let tmp = new Array(W + 1).fill(0)
    dp.push(tmp)
  }

  for (let i = 1; i < N + 1; i++) {
    let w = weights[i - 1]
    let v = values[i - 1]
    for (let j = 1; j < W + 1; j++) {
      if (j >= w) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w] + v)
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }
  return dp[N][W]
}

knapsack(10, 5, [2, 4, 5, 3], [3, 4, 2, 5])
console.log()