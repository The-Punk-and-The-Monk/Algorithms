class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        if not candidates:
            return []
        self.ans = []
        self.candidates = sorted(candidates)    # 为了剪枝
        self.target = target
        self.backtrack(0,[], 0)
        return self.ans


    def backtrack(self, begin, tmp, tmp_sum):
        """

        :param begin: 作用是去重, 限制成只向后看，不向前看
        :param tmp:
        :param tmp_sum:
        :return:
        """
        if tmp_sum == self.target:
            self.ans.append(tmp[:])
        else:
            for j in range(begin, len(self.candidates)):
                i = self.candidates[j]
                if i > self.target - tmp_sum:  #剪枝
                    break
                tmp.append(i)
                tmp_sum += i
                self.backtrack(j, tmp, tmp_sum)
                tmp.pop()
                tmp_sum -= i