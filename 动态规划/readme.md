编辑器 typora

## 动态规划小技巧

1. 将dp数组多初始化几位，如dp = [0] * (n + 1)，以处理 i=0 时dp[i-1]的情况
2. 二维的dp数组有时候能优化为一维的， 如[矩阵最小路径和](#1.矩阵的最小路径和)
3. 



## 斐波那契数列

### 1.爬楼梯(easy)

[力扣](https://leetcode-cn.com/problems/climbing-stairs/description/)

题目描述：有 N 阶楼梯，每次可以上一阶或者两阶，求有多少种上楼梯的方法。

##### O(n)解法：

状态方程：
$$
dp[i] = \begin{cases}
1 & i == 1 \\
2 & i == 2 \\
dp[i-1] + dp[i-2] & i > 2 
\end{cases}
$$
**注：** 由于dp[i] 只与 dp[i-1], dp[i-2] 有关，可以用两个变量来存储dp[i-1], dp[i-2]，使得空间复杂度为O(1)

##### O(logn)解法：

用矩阵乘法求解斐波那契数列：
$$
\begin{aligned}
f[n] &= f[n-1] + f[n-2] \\
f[n-1] &= f[n-1] + 0*f[n-2] \\
[f[n], f[n-1]] &= [f[n-1], f[n-2]] * 
\left[
\matrix{
1 & 1 \\
1 & 0
}
\right] \\
&=[1, 1] *
{
\left[
\matrix{
1 & 1 \\
1 & 0
}
\right]
}^{n-2} \qquad when \quad n>2
\end{aligned}
$$
快速幂算法：
 假设一个整数是10， 如何最快地求解10的75次方
       1. 75的二进制形式为1001011
       2. 10的75次方=10^64 * 10^8 * 10^2 * 10^1
           在这个过程中，我们先求出10^1, 然后根据10^1求出10^2， 再根据10^2求出10^4, ......,最后根据
           10^32 求出10^64, 即75的二进制数形式总共有多少位，我们就使用了几次乘法
       3. 在步骤2进行的过程中，把应该累乘的值相乘即可，比如10^64, 10^8, 10^2, 10^1应该累乘，因为
           64，8，2，1对应到75的二进制数中，相应的位上是1；而32，16，4不应该累乘，因为它们的对位是0 

~~~
def matrixPower(A, p):
    """
    快速幂求方阵p次方
    :param A:
    :param p:
    :return:
    """
    assert len(A) == len(A[0])
    res = [[0] * len(A) for _ in range(len(A))]

    for i in range(len(A)):
        res[i][i] = 1

    tmp = A
    while p != 0:
        if p & 1 != 0:
            res = muli_matrix(res, tmp)
        tmp = muli_matrix(tmp, tmp)
        p = p >> 1
    return res

~~~

##### 两种算法效率比较

祥见 斐波那契数列.py 

当n=10000时，快速幂比O(n)的动态规划快4倍，当n=1000000时快29倍



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



### 4.错排问题

#### 4.1 信件错排

[牛客](https://www.nowcoder.com/questionTerminal/95e35e7f6ad34821bc2958e37c08918b?orderByHotValue=2&commentTags=Python)

题目描述：

NowCoder每天要给很多人发邮件。有一天他发现发错了邮件，把发给A的邮件发给了B，把发给B的邮件发给了A。于是他就思考，要给n个人发邮件，在每个人仅收到1封邮件的情况下，有多少种情况是所有人都收到了错误的邮件？
 即没有人收到属于自己的邮件。



思路：

记 i_l for ith letter, i_p for ith person, dp[n] is answer. 若有n封信，首先任取k_l 任意放到非k_p的位置，有n-1种放法。假设k_l 放到了 j_p的位置。那么对于j_l 来说，有两种方法：

1. j_l 放到 k_p 则剩下的n-2封信，有 dp[n-2]种方法

2. j_l 不放到 k_p, 则可视 j_l 取代了 k_l 的位置， 它不能被放到k_p, 则剩下的n-1封信， 有dp[n-1]种方法



得状态方程：
$$
dp[n] = \begin{cases}
0, & n == 1 \\
1, & n == 2 \\ 
(n-1) * (dp[n-1] + dp[n-2]) & n > 2
\end{cases}
$$


#### 4.2 年会抽奖

[牛客](https://www.nowcoder.com/questionTerminal/610e6c0387a0401fb96675f58cda8559)

题目描述：

今年公司年会的奖品特别给力，但获奖的规矩却很奇葩：
 \1. 首先，所有人员都将一张写有自己名字的字条放入抽奖箱中；
 \2. 待所有字条加入完毕，每人从箱中取一个字条；
 \3. 如果抽到的字条上写的就是自己的名字，那么“恭喜你，中奖了！”
 现在告诉你参加晚会的人数，请你计算有多少概率会出现无人获奖？



思路：

4.1的dp[n] / n!



#### 4.3 考新郎

[牛客](https://www.nowcoder.com/questionTerminal/74fb7e25ba4f41cba901d7025faeaff1?toCommentId=74539)

题目描述：

过年期间，老家举行了一场盛大的集体婚礼，为了使婚礼进行的丰富一些，司仪临时想出了有一个有意思的节目，叫做“考新郎”，具体的操作是这样的：
 \1. 首先，给每位新娘打扮得几乎一模一样，并盖上大大的红盖头随机坐成一排；
 \2. 然后，让各位新郎寻找自己的新娘。每人只准找一个，并且不允许多人找一个；
 \3. 最后，揭开盖头，如果找错了对象就要当众跪搓衣板...
 假设一共有n对新婚夫妇，其中有m个新郎找错了新娘，求发生这种情况一共有多少种可能。

思路：

首先是个组合问题：C_n^m = n! / (m! * (n - m)!) 

m个错排：4.1的dp[m]

答案：C_n^m * dp[m]



### 5.母牛生产

[牛客](https://www.nowcoder.com/questionTerminal/e2696bb900ce41cda8b060768e61f796?toCommentId=3696004)

题目描述：

假设农场中成熟的母牛每年只会生 1 头小母牛，并且永远不会死。第一年农场中有一只成熟的母牛，从第二年开始，母牛开始生小母牛。每只小母牛 3 年之后成熟又可以生小母牛。给定整数 n，求出 n 年后成熟牛的数量。

题目解释：

若小母牛第2年出生，则第2+3=5年成熟，同时产下一只小母牛。即每年新出生的小母牛数量==成熟母牛的数量。

易得状态方程
$$
dp[n] = dp[n-1] + dp[n-3]
$$


| 年   | 成熟 | 小母牛（出生年_数量） |
| ---- | ---- | :-------------------- |
| 1    | 1    | 0                     |
| 2    | 1    | 2                     |
| 3    | 1    | 2， 3                 |
| 4    | 1    | 2， 3， 4             |
| 5    | 2    | 3，4，5_2             |
| 6    | 3    | 4，5_2, 6_3           |
| 7    | 4    | 5_2, 6_3, 7_4         |
| 8    | 6    | 6_3, 7_4, 8_6         |
| 9    | 9    | 7_4, 8_6, 9_9         |
| 10   | 13   | 8_6, 9_9, 10_13       |
| 11   | 19   | 9_9, 10_13, 11_19     |
| 12   | 28   | 10_13, 11_19, 12_28   |



O(n) 答案：

~~~python
def solution(n):
    if n < 5:
        return 1
    dp, dp_nm1, dp_nm2 = 1, 1, 1
    for _ in range(5, n+1):
        dp, dp_nm1, dp_nm2 = dp + dp_nm2, dp, dp_nm1
    return dp
~~~



## 矩阵路径 

### 1.矩阵的最小路径和

[力扣](https://leetcode-cn.com/problems/minimum-path-sum/description/)

题目描述：求从矩阵的左上角到右下角的最小路径和，每次只能向右和向下移动。

状态方程：
$$
dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
$$
此题可运用小技巧2，优化空间负责度：

~~~
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        if not grid or not grid[0]:
            return 0
        m, n = len(grid), len(grid[0])
        dp = [0]*n
        for i in range(0, m):
            for j in range(0, n):
                if i == 0:	#当i=0,j=0时， dp[j-1] == 0
                    dp[j] = dp[j-1] + grid[i][j]
                elif j == 0:
                    dp[j] = dp[j] + grid[i][j]
                else:
                    dp[j] = min(dp[j], dp[j-1]) + grid[i][j]
        return dp[-1]
~~~



### 2.矩阵的总路径数

[力扣](https://leetcode-cn.com/problems/unique-paths/description/)

题目描述：统计从矩阵左上角到右下角的路径总数，每次只能向右或者向下移动。

状态方程：
$$
dp[i][j] = \begin{cases}
1, &i==0 \quad or \quad j==0\\
dp[i-1][j] + dp[i][j-1] &
\end{cases}
$$
同样可以优化空间复杂度：

~~~
var uniquePaths = function(m, n) {
    var dp = Array(n).fill(1);
    for(let i = 1; i < m; i++){
        for(let j = 1;j < n; j++){ // 注意这里的j=1
            dp[j] = dp[j] + dp[j-1];
        }
    }
    return dp[n-1]
};
~~~



解法2：可以看成组合问题，在总步数m+n-2中选择n-1步向右走，其他向下走

~~~javascript
var uniquePaths = function(m, n) {
    if(m < 1 || n < 1){
        return 0;
    }else if (m-1===0 || n-1===0){
        return 1;
    }else{
        return zuhe(m+n-2, n-1);
    }
};

var zuhe = function (m, n){
    if(m === 0){
        return 1
    }
    const diff = m - n;
    const tmp = [];
    if(diff === 0){
        tmp.push(1)
    }
    if(n === 0){
        tmp.push(1)
    }
    jc = 1
    for(let i = 1; i <=m; i++){
        jc *= i;
        if(i===diff){
            tmp.push(jc)
        }
        if(i===n){
            tmp.push(jc)
        }
    }
    return jc/(tmp[0] * tmp[1])
}
~~~



## 数组区间

### 数组区间和

[力扣](https://leetcode-cn.com/problems/range-sum-query-immutable/description/)

题目描述：

给定一个整数数组  *nums*，求出数组从索引 *i* 到 *j* (*i* ≤ *j*) 范围内元素的总和，包含 *i, j* 两点。1，数组不可变。2，会多次调用sumRange方法

状态方程：
$$
dp[n] = nums[n] + dp[n-1]\\
sumRange(i, j) = dp[j]-dp[i] + nums[i]
$$


### 2.数组中等差递增子区间个数

[力扣](https://leetcode-cn.com/problems/arithmetic-slices/description/)

题目描述：

见leetcode，较为复杂

状态方程：

dp[i]表示以 i 结尾的等差数列个数
$$
dp[i] = 1+d[i-1]\\
res = sum(dp)
$$
由于合格的等差数列需要连续，所以对一个连续的等差数列，在遍历过程中，都是1，2，3，4这样加起来所以有：

~~~javascript
for(let i = 2; i<A.length; i++){
	if(A[i]-A[i-1] === A[i-1] - A[i-2]){
        cnt += 1;
        res += cnt;
    }else{
        cnt = 0;
    }
}
~~~



## 分割整数 

### 1. 分割整数的最大乘积（未完全理解动态规划解法）

[力扣](https://leetcode-cn.com/problems/integer-break/description/)

题目描述：

给定一个正整数 *n*，将其拆分为**至少**两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

#### 动态规划解法：

状态方程：

dp[n] 是最大乘积
$$
dp[n] = max(i*dp[n-i], i*(n-i)) \quad 1\le i \le n-1
$$
更为容易理解的状态方程是：
$$
dp[n] = max(i*dp[n-i], i*(n-i), dp[i]*dp[n-i], dp[i]*(n-i))
$$
其中i * dp[n-i], dp[i]*(n-i), 对称，因为i 是从1 ~ n-1。

至于为何去掉dp[i] * dp[n-i], ==暂时无法理解==



#### 数学解法：

##### 解法1：

[数学证明](https://leetcode-cn.com/problems/integer-break/solution/343-zheng-shu-chai-fen-tan-xin-by-jyd/)

直觉理解，因为3是最后一个拆开的乘积小于自身的数，大于3的数都可以继续拆以获得更大的收益，所以尽量拆成3，n/3余1可以取一个3凑成2 * 2， 余2就直接乘2

~~~javascript
const numOf3 = Math.floor(n/3);
const yu = n % 3;
if(yu === 0){return Math.pow(3, numOf3);}
if(yu === 1){return Math.pow(3, numOf3-1) * 4;}
if(yu === 2){return Math.pow(3, numOf3)*2;}
~~~



### 2.按平方数分割整数

[力扣](https://leetcode-cn.com/problems/perfect-squares/description/)

给定正整数 *n*，找到若干个完全平方数（比如 `1, 4, 9, 16, ...`）使得它们的和等于 *n*。你需要让组成和的完全平方数的个数最少。

#### 动态规划解法：

时间复杂度：O(n* sqrt(n))
$$
dp[n] = min(dp[n-k] + 1) \quad for \ k \ in \ squarenums
$$

~~~javascript
var numSquares = function(n) {
    const squareNums = [];
    for(let i = 1; i < Math.floor(Math.sqrt(n)+1); i++){
        squareNums.push(i * i);
    }
    const dp = Array(n+1).fill(Infinity);
    dp[0] = 0;
    for(let i = 1; i <= n; i++){
        for(let j of squareNums){
            if(j > i){
                break;
            }
            dp[i] = Math.min(dp[i], 1 + dp[i-j]);
        }
    }
    return dp[n]
};
~~~



#### 贪心+BFS

时间复杂度：O(n ^(h/2)), h为搜索深度

[详解](https://leetcode-cn.com/problems/perfect-squares/solution/wan-quan-ping-fang-shu-by-leetcode/)

~~~javascript
var numSquares = function(n) {
    let squareNums = [];
    for(let i = 1; i < Math.floor(Math.sqrt(n)+1); i++){
        squareNums.push(i * i);
    }
    squareNums = new Set(squareNums)
    let q = new Set([n]);
    let level = 0;
    while(q){
        let new_q = new Set();
        level += 1;
        for(let target of q){
            if(squareNums.has(target)){
                return level;
            }else{
                for(let sn of squareNums){
                    if(sn > target){
                        break;
                    }else{
                        new_q.add(target-sn);
                    }
                }
            }
        }
        q = new_q
    }
    return -1
};
~~~



### 3.分割整数构成字母字符串

[力扣](https://leetcode-cn.com/problems/decode-ways/description/)

一条包含字母 A-Z 的消息通过以下方式进行了编码：

'A' -> 1
'B' -> 2
...
'Z' -> 26
给定一个只包含数字的非空字符串，请计算解码方法的总数。

~~~javascript
var numDecodings = function(s) {
    const legalNum = new Set();
    for(let i = 1; i<=26; i++){
        legalNum.add(i + '');
    }
    var isLegalNum = function(n){
        return legalNum.has(n)
    }
    const dp = Array(s.length + 2).fill(0);		//因为依赖 dp[i-2]
    
    //初始化
    dp[0] = 1;
    dp[1] = 1;
    
    for(let i = 2; i < s.length+2; i++){
        let s_i = i - 2;	//对 i 做偏移
        let isLegalOne = isLegalNum(s[s_i]);
        let isLegalTwo = s_i > 0 ? isLegalNum(s.substr(s_i-1, 2)) : false;
        if(isLegalOne){
            dp[i] += dp[i-1];
        }
        if(isLegalTwo){
            dp[i] += dp[i-2];
        }
    }
    return dp.pop()
};
~~~



转态方程：

dp[i] 表示以位置为结尾的字符串所能解码的个数，在代码中，需要对 i 做偏移
$$
dp[i] = (isLegalOne * dp[i-1]) + (isLegalTwo*dp[i-2])
$$


## 最长子序列

### 1.最长递增子序列

[力扣](https://leetcode-cn.com/problems/longest-increasing-subsequence/description/)

给定一个无序的整数数组，找到其中最长上升子序列的长度。注：子序列不要求连续，要求严格上升

#### 动态规划解法

状态方程：
$$
dp[n] = max(dp[n], dp[n-j] + 1) \ \ \ for \ j\ in\ range\ (1, n) \ and \ nums[n] > nums[n-j]
$$
dp[n] 表示以n位置为结尾的最长递增子序列, 所以最终结果为 max(dp)

~~~javascript
var lengthOfLIS = function(nums) {
    if(nums.length === 0){
        return 0;
    }
    const dp = Array(nums.length).fill(1);		// 初始化为1
    for(let i = 1; i < nums.length; i++){
        for(let j = 0; j < i; j++){
            if(nums[i] > nums[j]){
                dp[i] = Math.max(dp[i], dp[j]+1);
            }
        }
    }
    return Math.max(...dp)
};
~~~



#### 贪心 + 二分

[详解](https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/dong-tai-gui-hua-er-fen-cha-zhao-tan-xin-suan-fa-p/)

定义tail数组，tail[i] 表示所有长度为i+1的上升子序列的结尾值中最小的值， 利用反证法可以证明tail为单调递增，故可以用上二分查找。

~~~
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if(nums.length === 0){
        return 0;
    }
    const tail = [];
    tail.push(nums[0]);
    for(let i = 1; i < nums.length; i++){
        let lastNum = tail[tail.length - 1]
        if(nums[i] > lastNum){
            tail.push(nums[i])
        } else if (nums[i] < lastNum){
            let j = binarySearch(tail, nums[i]);
            tail[j] = nums[i];
        }
    }
    return tail.length;
};

function binarySearch(arr, n){
    // 目标找到 arr[mid-1] < n <= arr[mid] 的mid，
    var l = 0;
    var r = arr.length-1;
    while(l<r){
        let mid = l + Math.floor((r-l)/2);
        if(arr[mid] >= n){
            r = mid;      // arr[mid] >=n , mid可能是解，不减一
        } else {
            l = mid + 1;    // arr[mid] < n， mid肯定不是解，可以放心加1
        }
    }
    return l;
}
~~~



### 2. 一组整数对能够构成的最长链

[力扣](https://leetcode-cn.com/problems/maximum-length-of-pair-chain/description/)

#### 动态规划

将pairs按pairs[0] 排序，以 dp[i] 表示以 pairs[i] 结尾的链长度, 得状态方程
$$
dp[n] =max(dp[n], dp[j] + 1) \qquad 0<=j<n \ \ and \quad pairs[j][1] < pairs[n][0]
$$

~~~
/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function(pairs) {
    if(pairs === undefined || pairs === null || pairs.length === 0){
        return 0;
    }
    const dp = [];
    pairs.sort((a, b) => a[0]-b[0]);	// array.sort 默认将元素字符串化后再排序,所以得传一个 compare 函数
    dp.push(1);
    for(let i = 1; i < pairs.length; i++){
        dp.push(1);
        for(let j = 0; j < i; j++){
            if(pairs[j][1] < pairs[i][0]){
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    return dp.pop()
};
~~~



#### 贪心

把 pair[1] 比较小的 pair 放到最前面可以使得留给后面的空间更大,能放进更多 pair

~~~
var findLongestChain = function(pairs) {
    const dp = [];
    pairs.sort((a, b) => a[1]-b[1]);
    let cnt = 0;
    let prevEnd = -Infinity;
    for(let pair of pairs){
        if(pair[0] > prevEnd){
            cnt += 1;
            prevEnd = pair[1];
        }
    }
    return cnt 
};
~~~

注 这一题与[leetcode435](https://leetcode-cn.com/problems/non-overlapping-intervals/) 是相同问题的不同表现形式

### 3. 最长摆动子序列

[力扣](https://leetcode-cn.com/problems/wiggle-subsequence/description/)

#### 动态规划:

以 $dp[i][0]$ 表示以 ith num 结尾且尾状态是上升的最长摆动子序列

~~~
var wiggleMaxLength = function(nums) {
    if(!nums || nums.length === 0){
        return 0;
    }
    let max = 1;
    let dp = [];
    dp.push([1, 1]);
    for(let i = 1; i < nums.length; i++){
        dp.push([1,1]);
        for(let j = 0; j < i; j++){
            if(nums[i] > nums[j]){
                dp[i][0] = Math.max(dp[i][0], dp[j][1] + 1);
            } else if (nums[i] < nums[j]){
                dp[i][1] = Math.max(dp[i][1], dp[j][0] + 1);
            }
        }
        max = Math.max(max, ...dp[dp.length-1]);
    }
    return max 
};
~~~

