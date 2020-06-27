// https://leetcode-cn.com/problems/add-two-numbers/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  return addTwoNumbersWithCarry(l1, l2, 0)
};

function addTwoNumbersWithCarry(l1,l2,carry){
  if(!l1 && !l2 && carry == 0){
      return null
  }
  let l1FirstNum = l1 ? l1.val : 0
  let l2FirstNum = l2 ? l2.val : 0
  let sum = l1FirstNum + l2FirstNum + carry
  let curNum = sum % 10
  let nextCarry = Math.floor(sum / 10)
  let curNode = new ListNode(curNum)
  let l1NextNode = l1 ? l1.next : null 
  let l2NextNode = l2 ? l2.next : null 
  curNode.next = addTwoNumbersWithCarry(l1NextNode, l2NextNode, nextCarry)
  return curNode
}