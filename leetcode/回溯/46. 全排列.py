class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        if not nums:
            return []
        permutes = []
        permuteList = []
        visited = [0] * len(nums)
        self.backtrack(permuteList, permutes, visited, nums)
        return permutes


    def backtrack(self, permuteList, permutes, visited, nums):
        if len(permuteList) == len(nums):
            permutes.append(permuteList[:])
        else:
            for i in range(len(visited)):
                if visited[i] != 1:
                    visited[i] = 1
                    permuteList.append(nums[i])
                    self.backtrack(permuteList, permutes, visited,nums)
                    permuteList.pop()
                    visited[i] = 0