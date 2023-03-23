/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 *  用先进先出FIFO队列
 *  遍历方向始终从右到左
 *  入队先后: 父节点在偶数层, 左孩子先入队, 父节点在奇数层, 右孩子先入队
 */
var zigzagLevelOrder = function(root) {
  if(!root){
    return []
  }
  const q = [root]  
  const ans = []
  let leftFirst = true
  while(q.length != 0){
    const curLen = q.length
    const curLayer = []
    for(let i = curLen - 1; i >= 0; i--){
      const curNode = q[i]
      curLayer.push(curNode.val)
      if(leftFirst){
        if(curNode.left) q.push(curNode.left)
        if(curNode.right) q.push(curNode.right)
      } else {
        if(curNode.right) q.push(curNode.right)
        if(curNode.left) q.push(curNode.left)
      }
    }
    ans.push(curLayer)
    q.splice(0, curLen)
    leftFirst = !leftFirst
  }
  return ans 
};