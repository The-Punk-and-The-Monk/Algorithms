/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  if (!preorder || preorder.length == 0 || !inorder || inorder.length == 0){
    return null
  }

  const inorderValToIdxMap = new Map()
  for(let i = 0; i < inorder.length; i++){
    inorderValToIdxMap.set(inorder[i], i)
  }
  const preorderLeft  = 0,
        preorderRight = preorder.length - 1,
        inorderLeft   = 0,
        inorderRight  = inorder.length - 1

  return helper(preorder, inorder
        , preorderLeft, preorderRight
        , inorderLeft, inorderRight
        , inorderValToIdxMap)
};

function helper(preorder, inorder
        , preorderLeft, preorderRight
        , inorderLeft, inorderRight
        , inorderValToIdxMap){
  if(preorderLeft == preorderRight){
    return new TreeNode(preorder[preorderLeft])
  }

  const curNum  = preorder[preorderLeft]
  const root    = new TreeNode(curNum)

  const curNumInorderIdx = inorderValToIdxMap.get(curNum)
  const leftPartLen = curNumInorderIdx - inorderLeft
  if(leftPartLen){
    root.left = helper(preorder, inorder
                      , preorderLeft + 1, preorderLeft + leftPartLen
                      , inorderLeft, curNumInorderIdx - 1
                      , inorderValToIdxMap)
  }
  if(leftPartLen < (inorderRight - inorderLeft)){
    root.right = helper(preorder, inorder
                      , preorderLeft + leftPartLen + 1, preorderRight
                      , curNumInorderIdx + 1, inorderRight
                      , inorderValToIdxMap)
  }
  return root
}