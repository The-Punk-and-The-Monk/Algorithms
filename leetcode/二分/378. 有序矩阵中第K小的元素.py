'''
要找的数在已知范围[x, y]内，在[x, y]区间内二分，通过计数小于mid的数的个数确定其位置。
'''

class Solution:
    def kthSmallest(self, matrix: List[List[int]], k: int) -> int:
        n = len(matrix)
        left, right = matrix[0][0], matrix[n-1][n-1]
        while left < right:
            mid = left + (right - left) // 2
            cnt = self.helper(matrix, n, mid)
            if cnt < k:
                left = mid + 1
            else:
                right = mid
        return left


    def helper(self, matrix, n, mid):
        row, col = n-1, 0
        cnt = 0
        while row >=0 and col < n:
            if matrix[row][col] > mid:
                row -= 1
            elif matrix[row][col] <= mid:
                cnt += row + 1
                col += 1
        return cnt
