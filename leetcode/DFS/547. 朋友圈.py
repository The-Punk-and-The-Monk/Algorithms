from typing import List


class Solution:
    def findCircleNum(self, M: List[List[int]]) -> int:
        if not M or not M[0]:
            return 0
        dic = {}
        N = len(M)
        for i in range(N):
            dic[i] = set()
            for j in range(i + 1, N):
                if M[i][j] == 1:
                    dic[i].add(j)
        visited = [0] * N
        cnt = 0
        for i in range(N):
            if visited[i] != 1:
                cnt += 1
                self.dfs(i, visited, dic)
        return cnt

    def dfs(self, i, visited, dic):
        if visited[i] == 1:
            return
        else:
            visited[i] = 1
            for j in dic[i]:
                self.dfs(j, visited, dic)


if __name__ == '__main__':
    M = [[1,1,0],[1,1,0],[0,0,1]]
    solution = Solution()
    print(solution.findCircleNum(M))