import random
from typing import List

class Solution:
    def minMoves2(self, nums: List[int]) -> int:
        if not nums:
            return 0
        if len(nums) == 1:
            return 0
        mid = self.findKthSmallest(nums, len(nums) // 2)
        cnt = 0
        for num in nums:
            cnt += abs(num - mid)
        return cnt

    def findKthSmallest(self, nums, k):
        l, r = 0, len(nums) - 1
        while l < r:
            mid = self.partition(nums, l, r)
            if mid == k:
                return nums[mid]
            elif mid < k :
                l = mid + 1
            else:
                r = mid
        return nums[l]

    def partition(self, nums, l, r):
        tmp = random.randint(l, r)
        nums[l], nums[tmp] = nums[tmp], nums[l]
        pivot = nums[l]
        j = l
        for i in range(l + 1, r + 1):
            if nums[i] < pivot:
                j += 1
                nums[i], nums[j] = nums[j], nums[i]
        nums[l], nums[j] = nums[j], nums[l]
        return j


if __name__ == '__main__':
    a = [1, 2, 3]
    solution = Solution()
    print(solution.minMoves2(a))