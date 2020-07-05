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

let board= [
  ["X","O","X","O","X","O"],
  ["O","X","O","X","O","X"],
  ["X","O","X","O","X","O"],
  ["O","X","O","X","O","X"]]
solve(board)
console.log(board)