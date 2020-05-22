class Solution:
    def convertToTitle(self, n: int) -> str:
        if n == 1:
            return 'A'
        ans = []
        while n != 0:
            n -= 1  # 因为1->A, 26 -> Z  从1开始，所以每次先减1
            yu = n % 26
            n = n // 26
            ans.append(chr(yu + ord('A')))
        ans.reverse()
        return ''.join(ans)