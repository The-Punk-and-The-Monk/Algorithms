"""
辗转相除法：
两个整数的最大公约数等于其中较小的数和两数相除余数的最大公约数
"""

class Solution:
    def gcd(self, a, b):
        if a < b:
            a, b = b, a
        if b == 0:
            return a
        return self.gcd(b, a % b)

