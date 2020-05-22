# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


def get_list(l):
    head = ListNode(l[0])
    tmp = head
    for num in l[1:]:
        node = ListNode(num)
        tmp.next = node
        tmp = node
    return head


class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        if not head or head.next is None:
            return head
        self.new_head = None
        self.reverse(head, head.next)
        head.next = None
        return self.new_head

    def reverse(self, father, son):
        if son.next is None:
            son.next = father
            self.new_head = son
        else:
            self.reverse(son, son.next)
            son.next = father