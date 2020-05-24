编辑器 typora

## 动态规划小技巧

1. 将dp数组多初始化几位，如dp = [0] * (n + 1)，以处理 i=0 时dp[i-1]的情况



## 斐波那契数列

### 1.爬楼梯(easy)

[力扣](https://leetcode-cn.com/problems/climbing-stairs/description/)

题目描述：有 N 阶楼梯，每次可以上一阶或者两阶，求有多少种上楼梯的方法。

状态方程：
$$
dp[i] = \begin{cases}
1 & i == 1 \\
2 & i == 2 \\
dp[i-1] + dp[i-2] & i > 2 
\end{cases}
$$
**注：** 由于dp[i] 只与 dp[i-1], dp[i-2] 有关，可以用两个变量来存储dp[i-1], dp[i-2]，使得空间复杂度为O(1)



### 2.强盗抢劫 (easy)

[力扣](https://leetcode-cn.com/problems/house-robber/description/)

题目描述：抢劫一排住户，但是不能抢邻近的住户，求最大抢劫量。

状态方程:
$$
dp[i] = max(dp[i-2] + nums[i], dp[i-1])
$$
**注：** 由于dp[i] 只与 dp[i-1], dp[i-2] 有关，可以用两个变量来存储dp[i-1], dp[i-2]，使得空间复杂度为O(1)



### 3.强盗在环形街区抢劫(easy)

[力扣](https://leetcode-cn.com/problems/house-robber-ii/description/)

题目描述：抢劫一环住户（第0家跟第n-1家相邻），但是不能抢邻近的住户，求最大抢劫量。

解决方案：设[题目二](#2.强盗抢劫 (easy))的解为 hobberhouses(nums),  则这一题的解为max(hobberhouses(nums[:-1]), hobberhouses(nums[1:]))



