"""
nums1: [0, ..., i-1] [i, m-1]
nums2: [0, ..., j-1] [j, n-1]

nums1[i-1] < nums2[j]
nums2[j-1] < nums1[i]

i + j = (m + n + 1) // 2
i的有效取值范围为[0, m]
when i == 0: nums1_left_part is none
when i == m: nums1_right_part is none

如果总是有 m < n
则有
when i > 0: j < n
when i < m: j > 0
"""


from typing import List

class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        if len(nums1) > len(nums2):     # make nums1 shorter
            nums1, nums2 = nums2, nums1
        m, n = len(nums1), len(nums2)
        i_left, i_right, half_len = 0, m, (m + n + 1)//2

        # 易理解版
        # while i_left <= i_right:
        #     i = i_left + (i_right - i_left) // 2
        #     j = half_len - i
        #
        #     if (i <=0 or j >= n or nums1[i-1] <= nums2[j]) and (j <= 0 or i >= m or nums2[j-1] <= nums1[i]):
        #         if (m + n) % 2 == 1:
        #             if i == 0:
        #                 return nums2[j-1]
        #             if j == 0:
        #                 return nums1[i-1]
        #             return max(nums1[i-1], nums2[j-1])
        #         else:
        #             nums1_i_1 = nums1[i-1] if i > 0 else float('-inf')
        #             nums2_j_1 = nums2[j-1] if j > 0 else float('-inf')
        #             max_left = max(nums1_i_1, nums2_j_1)
        #
        #             nums1_i = nums1[i] if i < m else float('inf')
        #             nums2_j = nums2[j] if j < n else float('inf')
        #             min_right = min(nums1_i, nums2_j)
        #             return max_left + (min_right - max_left) / 2
        #     if i > 0 and j < n and nums1[i-1] > nums2[j]:
        #         i_right = i - 1
        #     if i < m and j > 0 or nums2[j-1] > nums1[i]:
        #         i_left = i + 1

        # 简化版
        while i_left <= i_right:
            i = i_left + (i_right - i_left) // 2
            j = half_len - i
            if i > 0 and nums1[i-1] > nums2[j]:
                i_right = i - 1
            elif i < m and nums2[j-1] > nums1[i]:
                i_left = i + 1
            else:
                nums1_im1 = nums1[i-1] if i > 0 else float('-inf')
                nums2_jm1 = nums2[j-1] if j > 0 else float('-inf')
                left_max = max(nums1_im1, nums2_jm1)
                if (m + n) % 2 == 1:
                    return left_max * 1.0

                nums1_i = nums1[i] if i < m else float('inf')
                nums2_j = nums2[j] if j < n else float('inf')
                right_min = min(nums1_i, nums2_j)
                return (left_max + right_min) / 2.0


if __name__ == '__main__':
    nums1 = [1, 3]
    nums2 = [2]
    solution = Solution()
    print(solution.findMedianSortedArrays(nums1, nums2))



