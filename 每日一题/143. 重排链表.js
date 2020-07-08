/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * 空间复杂度: O(n)
 *
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
  if(!head || !head.next || !head.next.next){
    return head
  }

  let headOfHead = new ListNode("fakeHead")
  let allNode = []

  while (head) {
    allNode.push(head)
    head = head.next
  }

  let left = 0
  let right = allNode.length - 1
  let tail = headOfHead
  while(left <= right){
    tail.next = allNode[left]
    tail = tail.next
    if(left != right){
      tail.next = allNode[right]
      tail = tail.next
    }
    left += 1
    right -= 1
  }
  tail.next = null
  return headOfHead.next
};


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * 快慢指针, 先翻转后半部分, 再把前半部分跟后半部分交叉
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
  if(!head || !head.next || !head.next.next){
    return head
  }

  let headOfHead = new ListNode('headOfHead')
  let pre = head.next, back = head 
  while (pre && pre.next) {
    pre = pre.next.next
    back = back.next
  }

  let p = back.next
  let tail = p
  while(p){
    let pNext = p.next
    p.next = back.next
    back.next = p 
    p = pNext
  }
  if(tail){
    tail.next = null
  }

  let left = head, right = back.next 
  back.next = null
  tail = headOfHead
  while(left != null){
    let leftNext = left.next
    tail.next = left 
    left.next = right
    tail = right
    left = leftNext 
    right = right ? right.next : null
  }
  return headOfHead.next
};
