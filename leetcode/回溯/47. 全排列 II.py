"""
引起结果重复是由于重复数字的排列引起的，如[1-1, 1-2, 1-3]的一个排列[1-2, 1-1, 1-3]
可以通过限制重复数字的选择顺序来除去重复结果，就是严格限制[1-1, 1-2, 1-3]在结果中其相对顺序也严格按照原序排列，如[1-1, 9, 1-2, 100, 1-3]
if i > 0 and nums[i] == nums[i-1] and nums[i-1] == 0: continue
"""


class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        if not nums:
            return []
        permutes = []
        permuteList = []
        nums.sort()
        visited = [0] * len(nums)
        self.backtrack(permuteList, permutes, visited, nums)
        return permutes

    def backtrack(self, permuteList, permutes, visited, nums):
        if len(permuteList) == len(nums):
            permutes.append(permuteList[:])
        else:
            for i in range(len(nums)):
                if i != 0 and nums[i] == nums[i - 1] and visited[i - 1] == 0:
                    continue
                if visited[i] == 1:
                    continue
                visited[i] = 1
                permuteList.append(nums[i])
                self.backtrack(permuteList, permutes, visited, nums)
                permuteList.pop()
                visited[i] = 0