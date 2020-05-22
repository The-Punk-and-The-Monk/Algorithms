from typing import List


class Solution:
    def findLongestWord(self, s: str, d: List[str]) -> str:
        d.sort(key=lambda s: (-len(s), s))  # 多条件排序

        def helper(target):
            i = 0
            for c in target:
                k = s.find(c, i)  # 效率比自己敲的高。。72ms
                if k == -1:
                    return False
                i = k + 1
            return True

        # s_contains = set(list(s))
        # def helper2(target):  # 自己敲的双指针，360ms
        #     i, j = 0, 0
        #     while i < len(s) and j < len(target) and (len(s) - i >= len(target) - j):
        #         if target[j] not in s_contains:
        #             return False
        #         while i < len(s) and s[i] != target[j]:
        #             i += 1
        #         if i < len(s):
        #             i += 1
        #             j += 1
        #     if j == len(target):
        #         return True
        #     return False

        for target in d:
            if helper(target):
                return target
        return ""


if __name__ == '__main__':
    d = ["ale","apple","monkey","plea"]
    s = "abpcplea"
    solution = Solution()
    print(solution.findLongestWord(s, d))