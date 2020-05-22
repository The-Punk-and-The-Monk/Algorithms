# Definition for singly-linked list.
from functools import lru_cache
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
    def isPalindrome(self, head: ListNode) -> bool:
        if not head:
            return True
        if head.next is None:
            return True
        slow, fast = head, head
        while fast.next is not None and fast.next.next is not None:
            slow = slow.next
            fast = fast.next.next

        slow.next = self.fanzhuan(slow.next)
        l, r = head, slow.next
        while r is not None and l != slow.next:
            if l.val != r.val:
                slow.next = self.fanzhuan(slow.next)
                return False
            l = l.next
            r = r.next
        slow.next = self.fanzhuan(slow.next)
        return True

    def fanzhuan(self, head):
        if not head or head.next is None:
            return head
        new_head = None

        def helper(father, son):
            nonlocal new_head
            if son.next is None:
                son.next = father
                new_head = son
            else:
                helper(son, son.next)
                son.next = father

        helper(head, head.next)
        head.next = None
        return new_head


if __name__ == '__main__':
    head = get_list([1, 1, 2, 1])
    solution = Solution()
    print(solution.isPalindrome(head))
