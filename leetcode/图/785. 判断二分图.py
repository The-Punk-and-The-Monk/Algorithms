from typing import List
class Solution:
    def __init__(self):
        self.flag = True

    def isBipartite(self, graph: List[List[int]]) -> bool:
        visited = [0] * len(graph)
        for i in range(len(graph)):
            self.dfs(graph, i, i, 0, visited)
        return self.flag

    def dfs(self, graph, i, start, cnt, visited):
        if not visited[i]:
            visited[i] = 1
            cnt += 1
            for j in graph[i]:
                if j == start and cnt != 1:
                    if cnt % 2 == 1:
                        self.flag = False
                else:
                    self.dfs(graph, j, start, cnt, visited)
            visited[i] = 0


if __name__ == '__main__':
    graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
    solution = Solution()
    print(solution.isBipartite(graph))

