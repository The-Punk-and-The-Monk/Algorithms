from typing import List
class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        ans = []
        ip = []
        self.backtrack(s, ip, 0, ans)
        return ans

    def backtrack(self, remain, ip, part, ans):
        if part == 3:
            if remain != '':
                ip.append(remain)
                if self.legal_ip(ip):
                    ans.append('.'.join(ip))
                ip.pop()
        else:
            for i in range(0, 3):
                ip.append(remain[:i+1])
                self.backtrack(remain[i+1:], ip, part + 1, ans)
                ip.pop()

    def legal_ip(self, ip):
        for i in range(len(ip)):
            if i == 0:
                if not (0 < int(ip[i]) <= 255):
                    return False
            else:
                if not (0 <= int(ip[i]) <= 255):
                    return False
        return True


if __name__ == '__main__':
    s = "25525511135"
    solution = Solution()
    print(solution.restoreIpAddresses(s))