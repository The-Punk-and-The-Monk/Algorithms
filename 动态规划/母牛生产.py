"""
牛客： https://www.nowcoder.com/questionTerminal/e2696bb900ce41cda8b060768e61f796?toCommentId=3696004
"""


def solution(n):
    if n < 5:
        return 1
    dp, dp_nm1, dp_nm2 = 1, 1, 1
    for _ in range(5, n+1):
        dp, dp_nm1, dp_nm2 = dp + dp_nm2, dp, dp_nm1
    return dp


if __name__ == '__main__':
    print(solution(12))