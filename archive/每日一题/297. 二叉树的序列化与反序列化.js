
// // 自己的版本, 层次遍历, 记录每一层的空叶子节点
// /**
//  * Definition for a binary tree node.
//  * function TreeNode(val) {
//  *     this.val = val;
//  *     this.left = this.right = null;
//  * }
//  */

// function TreeNode(val){
//   this.val = val;
//   this.left = this.right = null;
// }

// /**
//  * Encodes a tree to a single string.
//  *
//  * @param {TreeNode} root
//  * @return {string}
//  */
// var serialize = function(root) {
//   if (!root){
//     return JSON.stringify([])
//   }
//   const list = []
//   const q = [root]
//   while(q.length != 0){
//     const curLen = q.length 
//     for(let i = 0; i < curLen; i++){
//       const curNode = q[i]
//       list.push(curNode ? curNode.val : null)
//       if(curNode){
//         q.push(curNode.left, curNode.right)
//       }
//     }
//     q.splice(0, curLen)
//   }

//   return JSON.stringify(list)
// };

// /**
//  * Decodes your encoded data to tree.
//  *
//  * @param {string} data
//  * @return {TreeNode}
//  */
// var deserialize = function(data) {
//   if(!data || data.length == 0){
//     return null
//   }
//   const list = JSON.parse(data)
//   if(list.length == 0){
//     return null
//   }

//   let i = 1, j = 0
//   const q = [new TreeNode(list[0])]

//   while(i < list.length && j < q.length){
//     const leftChild = list[i] != null ? new TreeNode(list[i]) : null
//     const rightChild = list[i+1] != null ? new TreeNode(list[i+1]) : null 

//     while(!q[j]){
//       j += 1
//     }
//     if(j >= q.length){
//       break
//     }

//     q[j].left = leftChild
//     q[j].right = rightChild
//     q.push(leftChild, rightChild)
//     i += 2
//     j += 1
//   }

//   return q[0]
// };



// 先序遍历版本
/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function TreeNode(val){
  this.val = val;
  this.left = this.right = null;
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
  if (!root){
    return JSON.stringify([])
  }
  const list = []
  preOrder(root, list)
  return JSON.stringify(list)
};

function preOrder(root, list){
  list.push(root ? root.val : null)
  if(root){
    preOrder(root.left, list)
    preOrder(root.right, list)
  }
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
  if(!data || data.length == 0){
    return null
  }
  const list = JSON.parse(data)
  if(list.length == 0){
    return null
  }

  const root = new TreeNode(list[0])
  const pos = [1]
  root.left = preOrderBulid(list, pos)
  root.right = preOrderBulid(list, pos)

  return root 
};

function preOrderBulid(list, pos){
  let p = pos[0]
  pos[0] += 1
  const curNode = (list[p] || list[p] == 0) ? new TreeNode(list[p]) : null 
  if(curNode){
    curNode.left = preOrderBulid(list, pos)
    curNode.right = preOrderBulid(list, pos)
  }
  return curNode
}

const root = new TreeNode(1)
root.right = new TreeNode(2)
console.log(deserialize(serialize(root)))