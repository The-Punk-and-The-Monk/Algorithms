## BFS
广度优先搜索一层一层地进行遍历，每层遍历都是以上一层遍历的结果作为起点，遍历一个距离能访问到的所有节点。需要注意的是，遍历过的节点不能再次被遍历。
每一层遍历的节点都与根节点距离相同。设 di 表示第 i 个节点与根节点的距离，推导出一个结论：对于先遍历的节点 i 与后遍历的节点 j，有 di <= dj。利用这个结论，可以求解最短路径等 最优解 问题：第一次遍历到目的节点，其所经过的路径为最短路径。应该注意的是，使用 BFS 只能求解无权图的最短路径，无权图是指从一个节点到另一个节点的代价都记为 1。

在程序实现 BFS 时需要考虑以下问题：

队列：用来存储每一轮遍历得到的节点；
标记：对于遍历过的节点，应该将它标记，防止重复遍历。

PS: 在出队时做操作, 入队只判断符不符合入队条件



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





