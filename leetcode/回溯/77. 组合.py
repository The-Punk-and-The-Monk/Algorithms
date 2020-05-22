class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        if n < 1 or k < 1:
            return []
        ans = []
        combination = []
        self.backtrack(combination, k, n, ans)
        return ans

    def backtrack(self, combination, k, n, ans):
        if len(combination) == k:
            ans.append(combination[:])
        else:
            for i in range(1 if not combination else combination[-1] + 1, n - (k - len(combination)) + 2):
                """
                1 if not combination else combination[-1] + 1
                这句是为了去重，限制combination中的数递增，结果就不会重复
                n - (k - len(combination)) + 2
                这句是为了剪枝，根据len算出还差几个数。没剪枝550ms， 剪枝52ms
                """
                combination.append(i)
                self.backtrack(combination, k, n, ans)
                combination.pop()