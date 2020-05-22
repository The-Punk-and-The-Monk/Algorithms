'''
1: 每行每列只能有一个
2：leetcode 题目中提示的能走一步至七步是假的，至少跟真正的题意是不一致的，应该是n-1步
3：所有的主对角线上 i - j = const, 次对角线上 i + j = const
'''

from typing import List

class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        if n == 1:
            return [['Q']]
        if n < 4:
            return []
        ans = []
        cols, zhudui, cidui = [0] * n, [0] * (2*n-1), [0] * (2*n-1)     #每个对角方向上有2n-1跟对角线
        queens=set()

        def backtrack(i):
            for j in range(n):
                if could_place(i, j):
                    place_queen(i, j)
                    if i == n-1:
                        add_solution()
                    else:
                        backtrack(i+1)
                    remove_queen(i, j)

        def could_place(i, j):
            return not (cols[j]+ zhudui[i - j] + cidui[i+j])

        def place_queen(i, j):
            queens.add((i, j))
            cols[j] = 1
            zhudui[i-j] = 1
            cidui[i+j] = 1

        def remove_queen(i, j):
            queens.remove((i, j))
            cols[j] = 0
            zhudui[i-j] = 0
            cidui[i+j] = 0

        def add_solution():
            ans.append(['.' * n for _ in range(n)])
            for i, j in queens:
                ans[-1][i] = ans[-1][i][:j] + 'Q' + ans[-1][i][j+1:]

        backtrack(0)
        return ans


if __name__ == '__main__':
    n = 12
    solution = Solution()
    # ans = solution.quanpailie(n)
    # assert len(ans) == math.factorial(n)
    # print(solution.quanpailie(n))
    print(solution.solveNQueens(n))