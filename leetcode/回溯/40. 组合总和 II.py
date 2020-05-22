"""
解释语句: if cur > begin and candidates[cur-1] == candidates[cur] 是如何避免重复的
这个方法最重要的作用是，可以让同一层级，不出现相同的元素。即
                  1
                 / \
                2   2  这种情况不会发生 但是却允许了不同层级之间的重复即：
               /     \
              5       5
                例2
                  1
                 /
                2      这种情况确是允许的
               /
              2
"""


class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        if not candidates:
            return []
        self.ans = []
        self.candidates = sorted(candidates)    # 与39题不同，这里为了剪枝，也为了去重
        self.target = target
        self.backtrack(0,[], 0)
        return self.ans


    def backtrack(self, begin, tmp, tmp_sum):
        if tmp_sum == self.target:
            self.ans.append(tmp[:])
        else:
            for j in range(begin, len(self.candidates)):
                i = self.candidates[j]
                if i > self.target - tmp_sum:   # 剪枝
                    break
                if j > begin and self.candidates[j] == self.candidates[j-1]:    # 去重
                    continue
                tmp.append(i)
                tmp_sum += i
                self.backtrack(j+1, tmp, tmp_sum)
                tmp.pop()
                tmp_sum -= i