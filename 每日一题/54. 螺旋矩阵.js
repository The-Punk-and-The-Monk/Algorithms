/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  if(!matrix || matrix.length === 0 || matrix[0].length === 0){
    return []
  }

  let left = -1, top = -1, right = matrix[0].length, bottom = matrix.length
  const ans = []
  while(left + 1 < right && top + 1 < bottom){
    for(let j = left + 1; j < right; j++){
      ans.push(matrix[top+1][j])
    }
    for(let i = top + 2; i < bottom; i++){  // 跳过右上角的数
      ans.push(matrix[i][right - 1])
    }
    if(top + 2 < bottom){   // 防止只剩一行的时候往回(左)走
      for(let j = right - 2; j > left; j--){    // 跳过右下角的数
        ans.push(matrix[bottom-1][j])
      }
    }
    if(left + 2 < right){   // 防止只剩一列的时候往回(上)走
      for(let i = bottom - 2; i > top + 1; i--){    // 跳过左下角和左上角的数
        ans.push(matrix[i][left+1])
      }
    }
    left += 1
    top += 1
    right -= 1
    bottom -= 1
  }
  return ans
};