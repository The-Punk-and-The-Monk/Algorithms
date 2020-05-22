from typing import List
class Solution:
    def __init__(self):
        self.ans = []
        self.cc = {'+', '-', '*'}

    def diffWaysToCompute(self, s: str) -> List[int]:
        flag = True
        for i in range(len(s)):
            if s[i] in self.cc:
                if i == 0:
                    continue
                flag = False
                l, r, res = self.compute(i, s)
                new_s = s[:l] + str(res) + s[r + 1:]
                self.diffWaysToCompute(new_s)
        if flag:
            self.ans.append(int(s))
        return self.ans

    def compute(self, i, s):
        l, r = i - 1, i + 1
        while l > 0 and s[l - 1] not in self.cc:
            l -= 1
        while r < len(s) - 1 and s[r + 1] not in self.cc:
            r += 1
        a = int(s[l:i])
        b = int(s[i + 1:r + 1])
        if s[i] == '+':
            res = a + b
        elif s[i] == '-':
            res = a - b
        else:
            res = a * b
        return l, r, res


if __name__ == '__main__':
    s = "2*3-4*5"
    solution = Solution()
    print(solution.diffWaysToCompute(s))