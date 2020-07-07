/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 * 
 * 层次遍历取最右
 */
var rightSideView = function(root) {
  if(!root){
    return []
  }
  let ans = []
  let q = [root]
  while(q.length != 0){
    let curLen = q.length
    ans.push(q[curLen - 1].val)   // 取最右
    for(let i = 0; i < curLen; i++){
      let curNode = q[i]
      if(curNode.left){
        q.push(curNode.left)
      }
      if(curNode.right){
        q.push(curNode.right)
      }
    }
    q = q.slice(curLen)
  }
  return ans
};

