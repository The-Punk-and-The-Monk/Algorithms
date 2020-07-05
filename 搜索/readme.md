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



