/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 
 * 空间换时间版本,
 * 注意不能直接算链表的原来的数字, 可能数字会很大
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  if(!l1 || !l2){
    return l1 ? l1 : l2
  }

  let stack1 = []
  while(l1){
    stack1.push(l1.val)
    l1 = l1.next
  }

  let stack2 = []
  while(l2){
    stack2.push(l2.val)
    l2 = l2.next
  }

  let i = stack1.length - 1, j = stack2.length - 1
  let carry = 0
  const head = new ListNode('head')
  while(i >= 0 || j >= 0 || carry > 0){
    const valI = i >= 0 ? stack1[i] : 0
    const valJ = j >= 0 ? stack2[j] : 0
    const curSum = valI + valJ + carry 
    const curVal = curSum % 10
    carry = Math.floor(curSum / 10)

    const curNode = new ListNode(curVal)
    const tmp = head.next 
    head.next = curNode
    curNode.next = tmp 

    i -= 1
    j -= 1
  }

  return head.next
};



/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 
 * 时间换空间版本, 翻转l1, l2, 结束之前再翻转回来
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  if(!l1 || !l2){
    return l1 ? l1 : l2
  }

  function reverseLink(head) {
    let p = head.next 
    head.next = null
    while(p){
      const pNext = p.next 
      const tmp = head.next
      head.next = p
      p.next = tmp
      p = pNext
    }
  }

  const headOfL1 = new ListNode("h1")
  const headOfL2 = new ListNode("h2")
  const headOfAns = new ListNode('headOfAns')
  headOfL1.next = l1 
  headOfL2.next = l2
  reverseLink(headOfL1)
  reverseLink(headOfL2)

  l1 = headOfL1.next 
  l2 = headOfL2.next 
  let carry = 0
  while(l1 || l2 || carry > 0){
    const valOfL1 = l1 ? l1.val : 0
    const valOfL2 = l2 ? l2.val : 0
    const curSum = valOfL1 + valOfL2 + carry
    const curVal = curSum % 10
    carry = curSum / 10 >= 1 ? 1 : 0
    
    const newNode = new ListNode(curVal)
    let tmp = headOfAns.next 
    headOfAns.next = newNode
    newNode.next = tmp

    l1 = l1 ? l1.next : null
    l2 = l2 ? l2.next : null
  }

  reverseLink(headOfL1)
  reverseLink(headOfL2)
  return headOfAns.next
};



