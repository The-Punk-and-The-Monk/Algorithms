from typing import List
import time

from typing import List
class Solution1:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        visited = [[0] * 9 for _ in range(9)]
        options, point_cnt = self.pre_cnt(board, visited)
        i, j = self.getnext(visited, options)
        self.backtrack(i, j, options, board, point_cnt, visited)

    def backtrack(self, i, j, options, board, point_cnt, visited):
        visited[i][j] = 1
        tmp = board[i][j]
        for num in (options[i][j]):
            if self.legal_num(i, j, num, board):
                board[i][j] = num
                point_cnt -= 1
                if point_cnt == 0:
                    return True
                new_i, new_j = self.getnext(visited, options)
                if self.backtrack(new_i, new_j, options, board, point_cnt, visited):
                    return True
                board[i][j] = '.'
                point_cnt += 1
        board[i][j] = tmp
        visited[i][j] = 0
        return False

    def getnext(self, visited, options):
        min_idx = (0,0)
        min_len = 100
        for i in range(9):
            for j in range(9):
                if visited[i][j] == 0 and len(options[i][j]) < min_len:
                    min_len = len(options[i][j])
                    min_idx = (i, j)
        return min_idx

    def legal_num(self, i, j, num, board):
        n = len(board)
        for m in range(n):
            if m != j and board[i][m] == num: return False
            if m != i and board[m][j] == num: return False
        m, n = i // 3, j // 3
        for p in range(m * 3, m * 3 + 3):
            for q in range(n * 3, n * 3 + 3):
                if p != i or q != j:
                    if board[p][q] == num:
                        return False
        return True

    def pre_cnt(self, board, visited):
        n = len(board)
        options = [[{'1', '2', '3', '4', '5', '6', '7', '8', '9'}.copy() for _ in range(n)] for _ in range(n)]
        point_cnt = 0
        for i in range(n):
            row_tmp = []
            for j in range(n):
                if board[i][j] != '.':
                    options[i][j] = set(board[i][j])
                    row_tmp.append(board[i][j])
                    visited[i][j] = 1
            for j in range(n):
                if board[i][j] == '.':
                    point_cnt += 1
                    for num in row_tmp:
                        if num in options[i][j]:
                            options[i][j].remove(num)

        for j in range(n):
            l_tmp = []
            for i in range(n):
                if board[i][j] != '.':
                    options[i][j] = set(board[i][j])
                    l_tmp.append(board[i][j])
            for i in range(n):
                if board[i][j] == '.':
                    for num in l_tmp:
                        if num in options[i][j]:
                            options[i][j].remove(num)

        def block_pre_cnt(left, right, up, down):
            assert right - left == 3 and down - up == 3
            tmp = []
            for i in range(left, right):
                for j in range(up, down):
                    if board[i][j] != '.':
                        options[i][j] = set(board[i][j])
                        tmp.append(board[i][j])
            for i in range(left, right):
                for j in range(up, down):
                    if board[i][j] == '.':
                        for num in tmp:
                            if num in options[i][j]:
                                options[i][j].remove(num)

        for i in range(3):
            for j in range(3):
                left = 3 * i
                right = 3 * i + 3
                up = 3 * j
                down = 3 * j + 3
                block_pre_cnt(left, right, up, down)

        return options, point_cnt


from functools import lru_cache
class Solution2:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        self.board = board
        self.visited = [[0] * 9 for _ in range(9)]
        self.rows = [['0'] * 9 for _ in range(9)]
        self.cols = [['0'] * 9 for _ in range(9)]
        self.cells = [[['0'] * 9 for _ in range(3)] for _ in range(3)]
        point_cnt = self.pre_cnt()
        i, j = self.getnext()
        self.backtrack(i, j, point_cnt)

    def backtrack(self, i, j, point_cnt):
        self.visited[i][j] = 1
        tmp = self.board[i][j]
        options = self.getOptions(i, j)
        for num in options:
            if self.legal_num(i, j, num):
                self.board[i][j] = num
                point_cnt -= 1
                if point_cnt == 0:
                    return True
                new_i, new_j = self.getnext()
                if self.backtrack(new_i, new_j, point_cnt):
                    return True
                point_cnt += 1
        self.board[i][j] = tmp
        self.visited[i][j] = 0
        return False

    def getnext(self):
        min_idx = (0,0)
        min_len = 100
        for i in range(9):
            for j in range(9):
                if self.visited[i][j] == 0:
                    options = self.getOptions(i, j)
                    if len(options) < min_len:
                        min_len = len(options)
                        min_idx = (i, j)
        return min_idx

    @lru_cache
    def getOptions(self, i, j):
        tmp = self.rows[i] | self.cols[j] | self.cells[i // 3][j//3]
        s = bin(tmp)[2:]
        num = 9
        options = []
        for i in range(len(s) - 1, -1, -1):
            if s[i] == '0':
                options.append(str(num))
            num -= 1
        while num > 0:
            options.append(str(num))
            num -= 1
        return options

    def legal_num(self, i, j, num):
        n = len(self.board)
        for m in range(n):
            if m != j and self.board[i][m] == num: return False
            if m != i and self.board[m][j] == num: return False
        m, n = i // 3, j // 3
        for p in range(m * 3, m * 3 + 3):
            for q in range(n * 3, n * 3 + 3):
                if p != i or q != j:
                    if self.board[p][q] == num:
                        return False
        return True


    def pre_cnt(self):
        n = len(self.board)
        point_cnt = 81
        for i in range(n):
            for j in range(n):
                if self.board[i][j] != '.':
                    num = int(self.board[i][j])
                    point_cnt -= 1
                    self.visited[i][j] = 1
                    self.rows[i][num-1] = '1'
                    self.cols[j][num-1] = '1'
                    self.cells[i//3][j//3][num-1] = '1'
        for i in range(n):
            self.rows[i] = int('0b' + ''.join(self.rows[i]), 2)
        for j in range(n):
            self.cols[j] = int('0b' + ''.join(self.cols[j]), 2)
        for i in range(3):
            for j in range(3):
                self.cells[i][j] = int('0b' + ''.join(self.cells[i][j]), 2)
        return point_cnt


from collections import defaultdict


class Solution3:
    def solveSudoku(self, board):
        """
        :type board: List[List[str]]
        :rtype: void Do not return anything, modify board in-place instead.
        """

        def could_place(d, row, col):
            """
            Check if one could place a number d in (row, col) cell
            """
            return not (d in rows[row] or d in columns[col] or \
                        d in boxes[box_index(row, col)])

        def place_number(d, row, col):
            """
            Place a number d in (row, col) cell
            """
            rows[row][d] += 1
            columns[col][d] += 1
            boxes[box_index(row, col)][d] += 1
            board[row][col] = str(d)

        def remove_number(d, row, col):
            """
            Remove a number which didn't lead
            to a solution
            """
            del rows[row][d]
            del columns[col][d]
            del boxes[box_index(row, col)][d]
            board[row][col] = '.'

        def place_next_numbers(row, col):
            """
            Call backtrack function in recursion
            to continue to place numbers
            till the moment we have a solution
            """
            # if we're in the last cell
            # that means we have the solution
            if col == N - 1 and row == N - 1:
                nonlocal sudoku_solved
                sudoku_solved = True
            # if not yet
            else:
                # if we're in the end of the row
                # go to the next row
                if col == N - 1:
                    backtrack(row + 1, 0)
                # go to the next column
                else:
                    backtrack(row, col + 1)

        def backtrack(row=0, col=0):
            """
            Backtracking
            """
            # if the cell is empty
            if board[row][col] == '.':
                # iterate over all numbers from 1 to 9
                for d in range(1, 10):
                    if could_place(d, row, col):
                        place_number(d, row, col)
                        place_next_numbers(row, col)
                        # if sudoku is solved, there is no need to backtrack
                        # since the single unique solution is promised
                        if not sudoku_solved:
                            remove_number(d, row, col)
            else:
                place_next_numbers(row, col)

        # box size
        n = 3
        # row size
        N = n * n
        # lambda function to compute box index
        box_index = lambda row, col: (row // n) * n + col // n

        # init rows, columns and boxes
        rows = [defaultdict(int) for i in range(N)]
        columns = [defaultdict(int) for i in range(N)]
        boxes = [defaultdict(int) for i in range(N)]
        for i in range(N):
            for j in range(N):
                if board[i][j] != '.':
                    d = int(board[i][j])
                    place_number(d, i, j)

        sudoku_solved = False
        backtrack()




if __name__ == '__main__':
    board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
    solution = Solution2()
    start_time = time.time()
    solution.solveSudoku(board)
    print(time.time() - start_time)
    print(board)
