/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  let headOfHead = new ListNode(-1)
  headOfHead.next = head 
  let left = headOfHead   // left 始终指向一组的 head的 prev
  while(left != null){
    let right = left.next   // 
    let cnt = 1

    while(right != null && cnt != k){ // right 要指向一组的尾巴
      right = right.next
      cnt += 1
    }

    if(right == null){  // 不足 k 个
      break
    }

    left = reverseRange(left, right.next)
  }
  return headOfHead.next
};

function reverseRange(left, rightNext){   // 翻转(left, rightNext)内的节点, 并返回 rightNext.prev
  let tail = left.next    // 最后的尾巴, 需要记住指针
  let p = left.next 
  while(p !== rightNext){   // 头插法
    let pNext = p.next
    let tmp = left.next 
    left.next = p
    p.next = tmp 
    p = pNext 
  }
  tail.next = right
  return tail
}