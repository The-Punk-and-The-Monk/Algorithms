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