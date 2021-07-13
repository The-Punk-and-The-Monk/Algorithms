/*
 * @lc app=leetcode id=69 lang=typescript
 *
 * [69] Sqrt(x)
 */

// @lc code=start
function mySqrt(x: number): number {
    if (x < 0) {
        throw Error('illegal x')
    }
    if (x <= 1) {
        return x;
    }
    let l = 1;
    let r = Math.floor(x / 2);
    while(l <= r) {
        const m = Math.floor((r - l + 1) / 2) + l;
        const mSquare = m * m;
        const mPlusOneSquare = (m + 1) * (m + 1)
        if (mSquare <= x && x < mPlusOneSquare) {
            return m
        } else if (mSquare < x) {
            l = m + 1
        } else {
            r = m - 1
        }
    }
    return -1
};
// @lc code=end

const nums = [0, 1, 2, 3, 4, 5, 9, 10, 15, 16, 17, 24, 25, 26];
nums.forEach(num => {
    console.log(mySqrt(num))
})

export {}