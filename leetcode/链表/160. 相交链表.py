
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
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        tmpA, tmpB = headA, headB
        if not headA or not headB:
            return None
        cnt = 1
        while headA.next is not None and headB.next is not None:
            if headA == headB:
                return headA.val
            cnt += 1
            headA = headA.next
            headB = headB.next
        if headA.next == None and headB.next == None:
            return None
        cross = headA if headA.next is not None else headB
        head = tmpA if headA.next is not None else tmpB
        while cnt != 1:
            cnt -= 1
            if cross.next is None:
                cross = head
            else:
                cross = cross.next
        return cross.val


'''
[4,1,8,4,5]
[5,0,1,8,4,5]
2
3'''

if __name__ == '__main__':
    headA = get_list([4,1,8,4,5])
    headB = get_list([5,0,1,8,4,5])
    solution = Solution()
    print(solution.getIntersectionNode(headA, headB))