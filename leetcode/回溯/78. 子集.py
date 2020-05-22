from typing import List

class Solution1:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        if not nums:
            return [[]]
        def backtrack(start, tmp):
            ans.append(tmp[:])
            if start >= len(nums):
                return
            for i in range(start, len(nums)):
                tmp.append(nums[i])
                backtrack(i + 1, tmp)
                tmp.pop()
        ans = []
        backtrack(0, [])
        return ans

class Solution2:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        def back_tree(nums,star,track):
            ans.append(track[:])
            if star >= len(nums):
                return
            for i in range(star,len(nums)):
                track.append(nums[i])
                back_tree(nums,i+1,track)
                track.pop()
        ans = []
        back_tree(nums,0,[])
        return ans

if __name__ == '__main__':
    solution = Solution1()
    nums = [1,2,3]
    print(solution.subsets(nums))
