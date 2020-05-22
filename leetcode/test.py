from typing import List
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        if n == 0:
            return []
        if n == 1:
            return ['()']
        else:
            ans = []
            cur_set = set()
            ans_n_1 = self.generateParenthesis(n-1)
            for s in ans_n_1:
                ans.append('()' + s)
                cur_set.add('()' + s)
                ans.append('(' + s + ')')
                cur_set.add('(' + s +')')
                if s + '()' not in cur_set:
                    ans.append(s + '()')
                    cur_set.add(s + '()')
            return ans


if __name__ == '__main__':
    n = 4
    solution = Solution()
    c_ans = {"(((())))", "((()()))", "((())())", "((()))()", "(()(()))", "(()()())", "(()())()", "(())(())", "(())()()",
             "()((()))", "()(()())", "()(())()", "()()(())", "()()()()"}
    ans = solution.generateParenthesis(n)
    print(len(ans))
    print(ans)
    for s in ans:
        if s in c_ans:
            c_ans.remove(s)
    print(c_ans)
