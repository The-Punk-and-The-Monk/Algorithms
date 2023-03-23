/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 归并排序
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  if(!lists || lists.length == 0){
    return null
  }

  if(lists.length == 1){
    return lists[0]
  }

  if(lists.length == 2){
    return mergeTwoList(lists[0], lists[1])
  }

  const mid = Math.floor(lists.length / 2)

  return mergeTwoList(mergeKLists(lists.slice(0, mid)), mergeKLists(lists.slice(mid)))
};

function mergeTwoList(list1, list2){
  const head = new ListNode('head')
  let tail = head
  while(list1 || list2){
    const val1 = list1 ? list1.val : Infinity 
    const val2 = list2 ? list2.val : Infinity 

    if(val1 <= val2){
      tail.next = list1 
      list1 = list1 ? list1.next : null
    }else{
      tail.next = list2 
      list2 = list2 ? list2.next : null
    }
    tail = tail.next
  }

  tail.next = null 
  return head.next
}