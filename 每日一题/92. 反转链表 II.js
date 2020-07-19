/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
  if(!head || n <= m){
    return head
  }

  const headOfHead = new ListNode('headOfHead')
  headOfHead.next = head 
  let back = headOfHead, pre = head, cnt = 1
  while(cnt != m && pre.next){
    pre = pre.next 
    back = back.next 
    cnt += 1
  }

  if(cnt != m){
    return head 
  }
  const nodeM = pre
  let nodeNNext = null
  while(cnt != n + 1){
    if(cnt == n){
      nodeNNext = pre.next
    }
    const preNext = pre.next 
    const backNext = back.next 
    back.next = pre 
    pre.next = backNext
    pre = preNext
    cnt += 1
  }
  nodeM.next = nodeNNext
  return headOfHead.next
};