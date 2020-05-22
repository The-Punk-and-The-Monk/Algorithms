"""
任何一个数都可以分解成素数的乘积
如 84 = 2^2 * 3^1 * 5^0 * 7^1 * 11^0 ...
"""

def gcd(x, y):
    if x < y:
        x, y = y, x
    if y == 0:
        return x
    return gcd(y, x%y )


def lcm(x, y):
    """
    最小公倍数
    :param x:
    :param y:
    :return:
    """
    return x * y / gcd(x, y)

