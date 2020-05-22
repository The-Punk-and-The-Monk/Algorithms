class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False
        if x < 10:
            return True
        tmp = x
        cnt = 0
        while tmp != 0:
            tmp = tmp // 10
            cnt += 1
        l, r = cnt - 1, 0
        while l > r:
            if self.helper(x, l) != self.helper(x, r):
                return False
            l -= 1
            r += 1
        return True

    def helper(self, x, p):
        if p > 0:
            x = x // (10**p)
        return x % 10



if __name__ == '__main__':
    solution = Solution()
    print(solution.isPalindrome(121))