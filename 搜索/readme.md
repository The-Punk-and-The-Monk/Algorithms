## BFS
广度优先搜索一层一层地进行遍历，每层遍历都是以上一层遍历的结果作为起点，遍历一个距离能访问到的所有节点。需要注意的是，遍历过的节点不能再次被遍历。
每一层遍历的节点都与根节点距离相同。设 di 表示第 i 个节点与根节点的距离，推导出一个结论：对于先遍历的节点 i 与后遍历的节点 j，有 di <= dj。利用这个结论，可以求解最短路径等 最优解 问题：第一次遍历到目的节点，其所经过的路径为最短路径。应该注意的是，使用 BFS 只能求解无权图的最短路径，无权图是指从一个节点到另一个节点的代价都记为 1。

在程序实现 BFS 时需要考虑以下问题：

队列：用来存储每一轮遍历得到的节点；
标记：对于遍历过的节点，应该将它标记，防止重复遍历。

PS: 在出队还是入队时做操作要想清楚, 入队时做操作可能会比较快, 因为少一轮层序遍历



### [1091. 二进制矩阵中的最短路径](https://leetcode-cn.com/problems/shortest-path-in-binary-matrix/)

~~~javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
    if(grid[0][0] == 1){
        return -1
    }
    let n = grid.length
    let q = []
    q.push([0,0])
    let cnt = 0
    let visited = []
    for(let i = 0; i < n; i++){
        visited.push(new Array(n).fill(0))
    }
    visited[0][0] = 1
    while(q.length > 0){
        cnt += 1
        let curLen = q.length
        for(let i = 0; i < curLen; i++){
            let [curX, curY] = q[i]
            if(curX == n-1 && curY == n-1){
                return cnt
            }
            for(let x = -1; x < 2; x++){
                for(let y = -1; y < 2; y++){
                    let tmpX = curX + x 
                    let tmpY = curY + y 
                    if(validPos(tmpX, tmpY, n)){
                        if(visited[tmpX][tmpY] == 1){
                            continue
                        }else if (grid[tmpX][tmpY] == 0){

                            visited[tmpX][tmpY] = 1
                            q.push([tmpX, tmpY])
                        }
                    }
                }
            }
        }
        q = q.slice(curLen)
    }
    return -1
};

function validPos(x, y, n){
    return x >= 0 && x < n && y >= 0 && y < n
}
~~~



### [279. 完全平方数](https://leetcode-cn.com/problems/perfect-squares/)

注: 这题也可以用动态规划做

#### bfs 的”错解”

见注释

~~~javascript
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  let squareNums = []
  for(let i = 1; i*i <= n; i++){
    squareNums.push(i*i)
  }

  let q = [n]
  let level = 0
  while(q.length != 0){
    level += 1
    let curLen = q.length
    for(let i = curLen - 1; i >= 0; i--){
      for(let j = squareNums.length - 1; j >= 0; j--){
        if(squareNums[j] == q[i]){
          return level
        }
        if(squareNums[j] < q[i]){
          q.push(q[i] - squareNums[j])		// 这里会有大量重复值, 导致数组过大, 内存爆炸, 如果没有上面的逆序遍历, 通不过 leetcode
        }
      }
    }
    q = q.slice(curLen)
  }
  return -1
};
~~~



#### bfs 的正解

~~~javascript
var numSquares = function(n) {
  let squareNumsSet = new Set();
  for(let i = 1; i*i <= n; i++){
    squareNumsSet.add(i*i);
  }

  let q = new Set([n])
  let level = 0
  while(q.size != 0){
    level += 1
    let newQ = new Set()
    for(let target of q){
      if(squareNumsSet.has(target)){
        return level
      }
      for(let squareNum of squareNumsSet){
        if(squareNum <= target){
          newQ.add(target - squareNum)
        }
      }
    }
    q = newQ
  }
  return -1
};
~~~



### [127. 单词接龙](https://leetcode-cn.com/problems/word-ladder/)

~~~javascript
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
  let map = new Map()
  let usedWord = new Set()
  addWordsToMap(map, [beginWord])
  if (!addWordsToMap(map, wordList, findWord = endWord)) {
    return 0
  }

  let q = [beginWord]
  usedWord.add(beginWord)
  let ladder = 0
  while (q.length != 0) {
    let curLen = q.length
    ladder += 1
    for (let i = 0; i < curLen; i++) {
      let curWord = q[i]
      if (curWord == endWord) {
        return ladder
      }

      for (let j = 0; j < curWord.length; j++) {
        let key = replaceCharWithStar(curWord, j)
        let reachableWords = map.has(key) ? map.get(key) : []
        for (let k = 0; k < reachableWords.length; k++) {
          if (!usedWord.has(reachableWords[k])) {
            q.push(reachableWords[k])
            usedWord.add(reachableWords[k])
          }
        }
      }
      
    }
    q = q.slice(curLen)
  }

  return 0
};

function addWordsToMap(map, wordList, findWord = null) {		// 建立可达单词的 map
  let flag = findWord == null ? true : false
  for (let i = 0; i < wordList.length; i++) {
    let curWord = wordList[i]
    if (findWord != null && curWord == findWord) {
      flag = true
    }

    for (let j = 0; j < curWord.length; j++) {
      let key = replaceCharWithStar(curWord, j)		// 若单词为 dot, dog, 则同在 key='do*'下, 表示他们互相可达
      if (!map.has(key)) {
        map.set(key, [])
      }
      map.get(key).push(curWord)
    }
  }
  return flag
}

function replaceCharWithStar(word, i) {
  return word.slice(0, i) + '*' + word.slice(i + 1)
}
~~~





## DFS

广度优先搜索一层一层遍历，每一层得到的所有新节点，要用队列存储起来以备下一层遍历的时候再遍历。

而深度优先搜索在得到一个新节点时立即对新节点进行遍历, 从一个节点出发，使用 DFS 对一个图进行遍历时，能够遍历到的节点都是从初始节点可达的，DFS 常用来求解这种 **可达性** 问题。

在程序实现 DFS 时需要考虑以下问题：

- 栈：用栈来保存当前节点信息，当遍历新节点返回时能够继续遍历当前节点。可以使用递归栈。
- 标记：和 BFS 一样同样需要对已经遍历过的节点进行标记。



### [695. 岛屿的最大面积](https://leetcode-cn.com/problems/max-area-of-island/)

~~~javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
  if(grid.length == 0 || grid[0].length == 0){
    return 0
  }
  let m = grid.length, n = grid[0].length
  let visited = []
  for(let i = 0; i < m; i++){
    visited.push(new Array(n).fill(0))
  }

  let maxCnt = 0
  for(let i = 0; i < m; i++){
    for(let j = 0; j < n; j++){
      if(visited[i][j] == 0 && grid[i][j] == 1){
        let curCnt = dfs(grid, visited, [i, j])
        maxCnt = Math.max(maxCnt, curCnt)
      }
    }
  }
  return maxCnt
};

function dfs(grid, visited,root){
  visited[root[0]][root[1]] = 1
  let stack = [root]
  let cnt = 1
  let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  let m = grid.length, n = grid[0].length
  while(stack.length != 0){
    let [curX, curY] = stack.pop()
    for(let [x, y] of directions){
      let tmpX = curX + x, tmpY = curY + y
      if(tmpX >= 0 && tmpX < m && tmpY >= 0 && tmpY < n && visited[tmpX][tmpY] == 0){
        visited[tmpX][tmpY] = 1
        if(grid[tmpX][tmpY] == 1){
          stack.push([tmpX, tmpY])
          cnt += 1
        }
      }
    }
  }
  return cnt
}
~~~



### [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)



~~~javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  if(grid.length == 0 || grid[0].length == 0){
    return 0
  }
  let m = grid.length, n = grid[0].length
  let visited = []
  for(let i = 0; i < m; i++){
    visited.push(new Array(n).fill(0))
  }

  let cnt = 0
  for(let i = 0; i < m; i++){
    for(let j = 0; j < n; j++){
      if(visited[i][j] == 0 && grid[i][j] == 1){
        cnt += 1
        dfs(grid, visited, [i,j])
      }
    }
  }
  return cnt
};

function dfs(grid, visited,root){
  visited[root[0]][root[1]] = 1
  let stack = [root]
  let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  let m = grid.length, n = grid[0].length
  while(stack.length != 0){
    let [curX, curY] = stack.pop()
    for(let [x, y] of directions){
      let tmpX = curX + x, tmpY = curY + y
      if(tmpX >= 0 && tmpX < m && tmpY >= 0 && tmpY < n && visited[tmpX][tmpY] == 0){
        visited[tmpX][tmpY] = 1
        if(grid[tmpX][tmpY] == 1){
          stack.push([tmpX, tmpY])
        }
      }
    }
  }
}
~~~



### [547. 朋友圈](https://leetcode-cn.com/problems/friend-circles/)



~~~javascript
/**
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum = function(M) {
  if(M.length == 0 || M[0].length == 0){
    return 0
  }
  let n = M.length
  let visited = new Array(n).fill(0)

  let cnt = 0
  for(let i = 0; i < n; i++){
    if(visited[i] == 0){
      cnt += 1
      dfs(M, visited, i)
    }
  }
  return cnt
};

function dfs(M, visited, root){
  visited[root] = 1
  let stack = [root]
  while(stack.length != 0){
    let cur = stack.pop()
    for(let i = 0; i < M.length; i++){
      if(visited[i] == 0 && M[cur][i] == 1){
        visited[i] = 1
        stack.push(i)
      }
    }
  }
}
~~~



### [130. 被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/)

#### DFS



~~~javascript
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  if(board.length == 0 || board[0].length == 0){
    return
  }

  let m = board.length, n = board[0].length
  let visited = []
  for(let i = 0; i < m; i++){
    visited.push(new Array(n).fill(0))
  }

  for(let i = 0; i < m; i++){
    for(let j = 0; j < n; j++){
      if(visited[i][j] == 0 && board[i][j] == 'O'){
        fillX(board, dfs(board, visited, [i, j]))
      }
    }
  }
};

function dfs(board, visited, root){
  visited[root[0]][root[1]] = 1
  let reachBorder = false 
  let stack = [root]
  let all = [root]
  let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  let m = board.length, n = board[0].length
  
  while(stack.length != 0){
    let [curX, curY] = stack.pop()
    if(curX == 0 || curX == m - 1 || curY == 0 || curY == n- 1){
      reachBorder = true
    }
    for(let [x, y] of directions){
      let tmpX = curX + x, tmpY = curY + y
      if(tmpX >= 0 && tmpX < m && tmpY >= 0 && tmpY < n && visited[tmpX][tmpY] == 0){
        visited[tmpX][tmpY] = 1
        if(board[tmpX][tmpY] == 'O'){
          stack.push([tmpX, tmpY])
          all.push([tmpX, tmpY])
        }
      }
    }
  }

  return reachBorder ? [] : all
}

function fillX(board, indexs){
  for(let [x, y] of indexs){
    board[x][y] = 'X'
  }
}
~~~



#### 并查集

主要掌握并查集

~~~javascript
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
class UnionFind {
  constructor(){
    this.f = new Map();
  }

  find = (x) => {   // 查找 x 的所归属的集合
    if(!this.f.has(x)){
      this.f.set(x, x)
    }
    if(this.f.get(x) != x){
      this.f.set(x, this.find(this.f.get(x)))
    }
    return this.f.get(x)
  }

  union = (x, y) => {  // 合并集合
    this.f.set(this.find(x), this.find(y))
  }
}

var solve = function(board) {
  if(!board || board.length == 0 || board[0].length == 0){
    return 
  }

  let m = board.length, n = board[0].length
  let dummy = m * n
  let unionFind = new UnionFind()

  function cntIdx(i, j){
    return i * n + j
  }

  for(let i = 0; i < m; i++){
    for(let j = 0; j < n; j++){
      if(board[i][j] != 'O'){
        continue
      }
      let cur = cntIdx(i, j)
      if(i == 0 || i == m - 1 || j == 0 || j == n - 1){
        unionFind.union(cur, dummy)
      }
      for(let [x, y] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){
        let tmpX = i + x, tmpY = j + y
        if(tmpX >= 0 && tmpX < m && tmpY >= 0 && tmpY < n && board[tmpX][tmpY] == 'O'){
          unionFind.union(cntIdx(tmpX, tmpY), cur)
        }
      }
    }
  }

  for(let i = 0; i < m; i++){
    for(let j = 0; j < n; j++){
      if(unionFind.find(cntIdx(i, j)) == unionFind.find(dummy)){
        board[i][j] = 'O'
      }else{
        board[i][j] = 'X'
      }
    }
  }
};
~~~



### [417. 太平洋大西洋水流问题](https://leetcode-cn.com/problems/pacific-atlantic-water-flow/)

~~~javascript
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var pacificAtlantic = function(matrix) {
  if(!matrix || matrix.length == 0 || matrix[0].length == 0){
    return []
  }

  let [m, n] = [matrix.length, matrix[0].length]
  let ans = []
  let reachableOne = []
  let reachableTwo = []
  for(let i = 0; i < m; i++){
    reachableOne.push(new Array(n).fill(0))
    reachableTwo.push(new Array(n).fill(0))
  }

  for(let i = 0; i < m; i++){
    dfs(matrix, reachableOne, [i, 0])
    dfs(matrix, reachableTwo, [i, n-1])
  }

  for(let j = 0; j < n; j++){
    dfs(matrix, reachableOne, [0, j])
    dfs(matrix, reachableTwo, [m-1, j])
  }

  for(let i = 0; i < m; i++){
    for(let j = 0; j < n; j++){
      if(reachableOne[i][j] == 1 && reachableTwo[i][j] == 1){
        ans.push([i, j])
      }
    }
  }
  return ans
};

function dfs(matrix, reachable, root){
  let i = root[0], j = root[1]
  reachable[i][j] = 1
  let stack = [root]
  let [m, n] = [matrix.length, matrix[0].length]
  let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  while(stack.length != 0){
    let [curX, curY] = stack.pop()
    let curH = matrix[curX][curY]
    for(let [x, y] of directions){
      let [tmpX, tmpY] = [curX + x, curY + y]
      if(tmpX >= 0 && tmpX < m && tmpY >= 0 && tmpY < n && reachable[tmpX][tmpY] == 0 && matrix[tmpX][tmpY] >= curH){
        reachable[tmpX][tmpY] = 1
        stack.push([tmpX, tmpY])
      }
    }
  }
}
~~~





## 回溯

Backtracking（回溯）属于 DFS。

- 普通 DFS 主要用在 **可达性问题** ，这种问题只需要执行到特点的位置然后返回即可。
- 而 Backtracking 主要用于求解 **排列组合** 问题，例如有 { 'a','b','c' } 三个字符，求解所有由这三个字符排列得到的字符串，这种问题在执行到特定的位置返回之后还会继续执行求解过程。

因为 Backtracking 不是立即返回，而要继续求解，因此在程序实现时，需要注意对元素的标记问题：

- 在访问一个新元素进入新的递归调用时，需要将新元素标记为已经访问，这样才能在继续递归调用时不用重复访问该元素；
- 但是在递归返回时，需要将元素标记为未访问，因为==只需要保证在一个递归链中不同时访问一个元素==，可以访问已经访问过但是不在当前递归链中的元素。

### [17. 电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)



~~~javascript
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  if(!digits || digits.length == 0){
    return []
  }
  let digitsToChars = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz"
  }
  let ans = []

  function backtracking(prefix){
    if(prefix.length == digits.length){
      ans.push(prefix)
      return
    }

    let curDigit = digits[prefix.length]
    let curChars = digitsToChars[curDigit]
    for(let char of curChars){
      let tmp = prefix + char 
      backtracking(tmp)
    }
  }
  backtracking('')

  return ans
};
~~~



### [93. 复原IP地址](https://leetcode-cn.com/problems/restore-ip-addresses/)



~~~javascript
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  if (s.length > 12) {
    return []
  }

  let ans = []
  backtracking(s, 0, [], 0, ans)
  return ans
};

function backtracking(s, start, prev, part, ans) {
  if (part == 4) {
    if (start == s.length) {
      ans.push(prev.join('.'))
    }
    return
  }
  if (checkLen(s, start, part)) {
    for (let i = 1; i < 4; i++) {
      if (start + i > s.length) {
        break
      }
      if (validNum(s, start, start + i)) {
        prev.push(s.slice(start, start + i))
        backtracking(s, start + i, prev, part + 1, ans)
        prev.pop()
      }
    }
  }
}

function checkLen(s, start, part) {
  if (s.length - start > (4 - part) * 3) {
    return false
  }
  return true
}

function validNum(s, start, end) {
  let num = parseInt(s.slice(start, end))
  if(num == 0 && start + 1 != end){
    return false
  }
  if(num > 0 && s[start] == '0'){
    return false
  }
  if (num >= 0 && num < 256) {
    return true
  }
  return false
}
~~~



### [79. 单词搜索](https://leetcode-cn.com/problems/word-search/)



~~~javascript
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  if(!board || board.length == 0 || board[0].length == 0 || word.length == 0){
    return false
  }

  let m = board.length, n = board[0].length
  let visited = []
  for(let i = 0; i < m; i++){
    visited.push(new Array(n).fill(0))
  }

  for(let i = 0; i < m; i++){
    for(let j = 0; j < n; j++){
      if(backtracking(board, i, j, visited, 0, word)){
        return true
      }
    }
  }
  return false
};

function backtracking(board, x, y, visited, p, word){
  if(x < 0 || x >= board.length || y < 0 || y >= board[0].length){
    return false
  }
  if(visited[x][y] == 1 || p >= word.length || board[x][y] != word[p]){
    return false
  }
  if(p == word.length - 1){
    return true
  }

  visited[x][y] = 1
  let m = board.length, n = board[0].length
  let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  for(let [dx, dy] of directions){
    let [tmpX, tmpY] = [x + dx, y + dy]
    if(backtracking(board, tmpX, tmpY, visited, p+1, word)){
      return true
    }
  }
  visited[x][y] = 0
  return false
}

console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
,"ABCCED"))
~~~



### [257. 二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)



~~~javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  let ans = []
  preOrder(root, '', ans)
  return ans
};

function preOrder(root, prev, ans){
  if(!root){
    return 
  }

  if(prev == ''){
    prev += root.val
  }else{
    prev += '->' + root.val
  }
  if(root.left == null && root.right == null){
    ans.push(prev)
    return
  }
  preOrder(root.left, prev, ans)
  preOrder(root.right, prev, ans)
}
~~~



### [46. 全排列](https://leetcode-cn.com/problems/permutations/)



~~~javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  if(!nums || nums.length == 0){
    return []
  }

  let ans = []
  let visited = new Array(nums.length).fill(false)
  backtracking(nums, [], visited, ans)
  return ans
};

function backtracking(nums, prev, visited, ans){
  if(prev.length == nums.length){
    ans.push([...prev])
    return
  }

  for(let i = 0; i < nums.length; i++){
    if(!visited[i]){
      visited[i] = true
      prev.push(nums[i])
      backtracking(nums, prev, visited, ans)
      visited[i] = false
      prev.pop()
    }
  }
}
~~~





### [47. 全排列 II](https://leetcode-cn.com/problems/permutations-ii/)

引起结果重复是由于重复数字的排列引起的，如[1-1, 1-2, 1-3]的一个排列[1-2, 1-1, 1-3]

可以通过限制重复数字的选择顺序来除去重复结果，就是严格限制[1-1, 1-2, 1-3]在结果中其相对顺序也严格按照原序排列，如[1-1, 9, 1-2, 100, 1-3]

~~~javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  if(!nums || nums.length == 0){
    return 0
  }

  nums.sort((a, b) => a - b)
  let ans  = []
  let visited = new Array(nums.length).fill(false)
  backtracking(nums, visited, [], ans)
  return ans
};

function backtracking(nums, visited, prev, ans){
  if(prev.length == nums.length){
    ans.push([...prev])
    return
  }

  for(let i = 0; i < nums.length; i++){
    if(!visited[i]){
      if(i > 0 && nums[i] == nums[i-1] && visited[i-1] == false){		// 限制相同数字的出现顺序
        continue
      }
      visited[i] = true
      prev.push(nums[i])
      backtracking(nums, visited, prev, ans)
      visited[i] = false
      prev.pop()
    }
  }
}
~~~



### [77. 组合](https://leetcode-cn.com/problems/combinations/)



~~~javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 * 通过限制组合中的数字的出现顺序来去重
 */
var combine = function(n, k) {
  if(n == 0 || k == 0){
    return []
  }

  let ans = []
  for(let i  = 1; i <= n - k + 1; i++){		// i<=n-k 剪枝
    backtracking(n, k, [i], ans)
  }
  return ans
};

function backtracking(n, k, prev, ans){
  if(prev.length == k){
    ans.push([...prev])
    return
  }

  let lastNum = prev[prev.length - 1]
  if((n-lastNum) < k - prev.length){		// 剪枝
    return 
  }
  for(let i = lastNum + 1; i <= n; i++){	// 只能从小到大
    prev.push(i)
    backtracking(n, k, prev, ans)
    prev.pop()
  }
}
~~~



### [39. 组合总和](https://leetcode-cn.com/problems/combination-sum/)

可以对比题 [377. 组合总和 Ⅳ](https://leetcode-cn.com/problems/combination-sum-iv/)

~~~javascript
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  if(!candidates || candidates.length == 0){
    return []
  }

  candidates.sort((a, b) => a - b)			// 1
  let ans = []
  helper(candidates, 0, [], target, ans)
  return ans
};

function helper(candidates, start, prev, target, ans){
  if(target == 0){
    ans.push([...prev])
    return
  }

  if(target < candidates[start]){
    return
  }

  for(let i = start; i < candidates.length; i++){			// 2
    prev.push(candidates[i])
    helper(candidates, i, prev, target - candidates[i], ans)
    prev.pop()
  }
}
~~~



1, 2 两行结合, 达到了去重的效果, 

