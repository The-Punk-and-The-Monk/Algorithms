## 参考

https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/solutions/108870/Most-consistent-ways-of-dealing-with-the-series-of-stock-problems/

## (123. Best Time to Buy and Sell Stock III)[https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/]

```typescript
function maxProfit(prices: number[]): number {
    if (!prices?.length || prices.length === 1) {
        return 0;
    }
    let s1 = -prices[0];
    let s2 = -Infinity;
    let s3 = -Infinity;
    let s4 = -Infinity;
    // const dp = []
    // const days = prices.length;
    // for (let i = 0; i <= prices.length; i++) {
    //     // dp[i][0] 代表完成了0次交易， dp[i][1] 代表完成了1次交易, dp[i][2] 代表完成了2次交易
    //     // dp[i][j][0] 代表没有持有，dp[i][j][1] 代表持有
    //     dp.push([
    //         [0, -Infinity],
    //         [-Infinity, -Infinity],
    //         [-Infinity, -Infinity]
    //         ])
    // }
    // for (let i = 1; i <= prices.length; i++) {
    //     const currPrice = prices[i - 1];
    //     dp[i][0][0] = Math.max(dp[i - 1][0][0]) // 这个永远都是0
    //     dp[i][0][1] = Math.max(dp[i - 1][0][1], dp[i - 1][0][0] - currPrice) // s1 指代 dp[i][0][1]
    //     dp[i][1][0] = Math.max(dp[i - 1][0][1] + currPrice, dp[i - 1][1][0]) // s2 指代 dp[i][1][0]
    //     dp[i][1][1] = Math.max(dp[i - 1][1][0] - currPrice, dp[i - 1][1][1])  // s3
    //     dp[i][2][0] = Math.max(dp[i - 1][2][0], dp[i - 1][1][1] + currPrice)  // s4
    //     dp[i][2][1] = -Infinity
    // }
    for (let i = 1; i < prices.length; i++) {
        const currPrice = prices[i];
        s1 = Math.max(s1, -currPrice);
        s2 = Math.max(s1 + currPrice, s2);
        s3 = Math.max(s2 - currPrice, s3);
        s4 = Math.max(s3 + currPrice, s4);
    }
    return Math.max(s4, 0);
}
```
