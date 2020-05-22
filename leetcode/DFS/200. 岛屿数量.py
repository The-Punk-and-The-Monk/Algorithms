class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid or len(grid[0]) == 0:
            return 0
        cnt = 0
        m, n = len(grid), len(grid[0])
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    cnt += 1
                    self.dfs(i, j, grid)
        return cnt

    def dfs(self, i, j, grid):
        m, n = len(grid), len(grid[0])
        if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] == 0:
            return
        grid[i][j] = 0
        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        for cz, sp in directions:
            self.dfs(i + cz, j + sp, grid)


if __name__ == '__main__':
    grid =