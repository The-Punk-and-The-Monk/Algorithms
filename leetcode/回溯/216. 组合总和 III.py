from typing import List
class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        if k < 1 or n < 1:
            return []

        def backtrack(comb, comb_sum, ans, start):
            if len(comb) == k and comb_sum == n:
                ans.append(comb[:])
            elif len(comb) < k and comb_sum < n:
                if start > n - comb_sum:
                    return
                for i in range(start, 10):
                    comb.append(i)
                    comb_sum += i
                    backtrack(comb, comb_sum, ans, i + 1)
                    comb.pop()
                    comb_sum -= i

        ans, comb, comb_sum, start = [], [], 0, 1
        backtrack(comb, comb_sum, ans, start)
        return ans


if __name__ == '__main__':
    k, n = 3, 9
    solution = Solution()
    print(solution.combinationSum3(k, n))