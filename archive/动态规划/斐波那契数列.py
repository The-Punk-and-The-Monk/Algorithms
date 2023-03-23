"""
1， 1， 2， 3， 5， 8， 。。。
"""
import time


def muli_matrix(A, B):
    """
    两个矩阵相乘
    若A， B都为n*n方阵， 时间复杂度为O(n^3), 有个Strassen算法，时间复杂度为O(n^lg7),祥见算法导论
    :param A:
    :param B:
    :return:
    """
    assert len(A[0]) == len(B)
    res = [[0] * len(B[0]) for _ in range(len(A))]
    for i in range(len(A)):
        for j in range(len(B[0])):
            for k in range(len(B)):
                res[i][j] += A[i][k] * B[k][j]
    return res


def matrixPower(A, p):
    """
    快速幂算法：
    假设一个整数是10， 如何最快地求解10的75次方
    1. 75的二进制形式为1001011
    2. 10的75次方=10^64 * 10^8 * 10^2 * 10^1
    在这个过程中，我们先求出10^1, 然后根据10^1求出10^2， 再根据10^2求出10^4, ......,最后根据
    10^32 求出10^64, 即75的二进制数形式总共有多少位，我们就使用了几次乘法
    3. 在步骤2进行的过程中，把应该累乘的值相乘即可，比如10^64, 10^8, 10^2, 10^1应该累乘，因为
    64，8，2，1对应到75的二进制数中，相应的位上是1；而32，16，4不应该累乘，因为它们的对位是0
    :param A:
    :param p:
    :return:
    """
    assert len(A) == len(A[0])
    res = [[0] * len(A) for _ in range(len(A))]

    for i in range(len(A)):
        res[i][i] = 1

    tmp = A
    while p != 0:
        if p & 1 != 0:
            res = muli_matrix(res, tmp)
        tmp = muli_matrix(tmp, tmp)
        p = p >> 1
    return res


def f3(n):
    """
    用矩阵乘法求解斐波那契数列：
    已知 f[n] = f[n-1] + f[n-2]
        f[n-1] = f[n-1] + 0*f[n-2]
    得 (f[n], f[n-1]) = (f[n-1], f[n-2]) X [[1,1], [1, 0]]
                        = (1, 1) X [[1, 1], [1, 0]]^(n-2)   when n > 2
    :param n:
    :return:
    """
    if n < 1:
        return 0
    if n < 3:
        return 1
    base = [[1, 1], [1, 0]]
    res = matrixPower(base, n-2)
    return res[0][0] + res[1][0]

def f2(n):
    """
    动态规划解法：f[n] = f[n-1] + f[n-2]
    :param n:
    :return:
    """
    if n < 1:
        return 0
    if n < 3:
        return 1
    res, pre, tmp = 1, 1, 0
    for i in range(3, n+1):
        tmp = res
        res = res+pre
        pre = tmp
    return res

def main(n):
    print(str(n) + ":")
    start_time = time.time()
    res2 = f2(n)
    f2_time = time.time() - start_time

    start_time = time.time()
    res3 = f3(n)
    f3_time = time.time()-start_time

    assert res2 == res3
    print(res2)
    print("f2_time: " + str(f2_time))
    print("f3_time: " + str(f3_time))
    print("f2_time/f3_time: " + str(f2_time/f3_time))
    print("f3_time < f2_time: " + str(f3_time < f2_time))
    print("")

    return res2, f2_time, res3, f3_time


if __name__ == '__main__':
    print("测试： ")
    ns = [100, 1000, 10000, 100000, 1000000]
    for n in ns:
        main(n)