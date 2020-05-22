class NumArray:

    def __init__(self, nums):
        self.nums = nums
        self.dp = [[None] * len(nums)] * len(nums)

    def sumRange(self, i: int, j: int) -> int:
        if self.dp[i][j] is not None:
            return self.dp[i][j]
        elif j - i < 3:
            self.dp[i][j] = sum(self.nums[i:j+1])
            return self.dp[i][j]
        else:
            mid = int((i+j) / 2)
            self.dp[i][j] = self.sumRange(i, mid) + self.sumRange(mid + 1, j)
            return self.dp[i][j]


def main():
    obj = NumArray([-2,0,3,-5,2,-1])
    print(obj.sumRange(0, 5))


if __name__ == '__main__':
    main()