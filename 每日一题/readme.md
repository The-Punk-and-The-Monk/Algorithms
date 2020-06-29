### 440. 字典序的第K小数字
* 大顶堆, O(nlogk)超时爆内存
* dfs,前序遍历,  O(n)超时
* dfs, 剪枝, 通过

### dfs 
~~~
var findKthNumber = function(n, k) {
  if(n == 1){
    return 1 
  }
  let cnt = 0   // 在遍历的过程中计数
  let res = null
  for(let i = 1; i < 10; i++){
    if(i > n){
      break
    }
    cnt += 1 
    if(cnt == k){ 
      return i
    }
    [cnt, res] = dfs(i, cnt, n, k)
    if(res){
      return res
    }
  }
};


function dfs(base, cnt, n, k){  
  /**
  * 相当于前序遍历, base 是 root
  * cnt 已经把 base 算进去了
  * 返回: [cnt + 这颗子树的大小 - 1, 如果遇到 k 这个位置是结果]
  */
  base = base * 10 
  for(let i = 0; i< 10; i++){
    let tmp = base + i 
    if(tmp > n){
      break
    }
    cnt += 1
    if(cnt == k){   // 如果到 k , tmp 就是结果
      return [cnt, tmp]
    }
    [cnt, res] = dfs(tmp, cnt, n, k)  // 前序遍历
    if(res){    // 如果前序遍历子树 返回了 res, 则向上返回 res
      return [cnt, res]
    }
  }
  return [cnt, null]  // 遍历完这颗以 base 为 root 的树, 没有到 k
}
~~~

dfs + 减枝
~~~
var findKthNumber = function(n, k) {
  if(n == 1){
    return 1 
  }
  let cnt = 0   // 在遍历的过程中计数
  let res = null
  for(let i = 1; i < 10; i++){
    if(i > n){
      break
    }
    cnt += 1 
    if(cnt == k){ 
      return i
    }
    [cnt, res] = dfs(i, cnt, n, k)
    if(res){
      return res
    }
  }
};


// 计算以 base 为 root 的树的总节点数(包含 base), 按题意画个 10 叉树, 比较好理解
function countTree(base, n){   
  let nextBase = base + 1 // base 的下一个兄弟
  let count = 0
  while(base <= n){
    count += Math.min(n+1, nextBase) - base   // 如果 n 在当前层
    base *= 10
    nextBase *= 10
  }
  return count
}

function dfs(base, cnt, n, k){  
  /**
  * 相当于前序遍历, base 是 root
  * cnt 已经把 base 算进去了
  * 返回: [cnt + 这颗子树的大小 - 1, 如果遇到 k 这个位置是结果]
  */

  // 剪枝
  let countOfCurTree = countTree(base, n)
  countOfCurTree -= 1
  if(cnt + countOfCurTree < k){   // 说明 k 不在当前树, 往上返回
    return [cnt + countOfCurTree, null]
  }

  base = base * 10 
  for(let i = 0; i< 10; i++){
    let tmp = base + i 
    if(tmp > n){
      break
    }
    cnt += 1
    if(cnt == k){   // 如果到 k , tmp 就是结果
      return [cnt, tmp]
    }
    [cnt, res] = dfs(tmp, cnt, n, k)  // 前序遍历
    if(res){    // 如果前序遍历子树 返回了 res, 则向上返回 res
      return [cnt, res]
    }
  }
  return [cnt, null]  // 遍历完这颗以 base 为 root 的树, 没有到 k
}
~~~

简洁版本:
~~~
var findKthNumber = function(n, k) {
  let cnt = 0;  
  let curBase = 1;
  while(cnt < k){
    if(cnt + 1 == k){   // 如果当前 base 就是结果
      return curBase
    }
    let cntCur = countTree(curBase, n)
    if(cnt + cntCur < k){  // k 不在当前子树, 走向下一个兄弟
      curBase += 1;
      cnt += cntCur;   
    }else if(cnt + cntCur >= k){   // k 在当前子树, 走向下一层
      curBase *= 10;
      cnt += 1;
    }
  }
};

function countTree(base, n){   
  let nextBase = base + 1 // base 的下一个兄弟
  let count = 0
  while(base <= n){
    count += Math.min(n+1, nextBase) - base   // 如果 n 在当前层
    base *= 10
    nextBase *= 10
  }
  return count
}
~~~