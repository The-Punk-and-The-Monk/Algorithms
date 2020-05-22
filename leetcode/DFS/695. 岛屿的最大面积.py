from typing import List

class Solution_dfs:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        if not grid or len(grid) == 0 or len(grid[0]) == 0:
            return 0
        m, n = len(grid), len(grid[0])
        visited = [[0] * n for _ in range(m)]
        max_area = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    max_area = max(max_area, self.dfs(i, j, grid, visited))
        return max_area

    def dfs(self, i, j, grid, visited):
        if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]) or grid[i][j] == 0 or visited[i][j] == 1:
            return 0
        cnt = 1
        visited[i][j] = 1
        direction = [[1, 0], [0, 1], [-1, 0], [0, -1]]
        for m, n in direction:
            cnt += self.dfs(i + m, j + n, grid, visited)
        return cnt

