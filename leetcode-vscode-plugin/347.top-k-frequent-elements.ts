/*
 * @lc app=leetcode id=347 lang=typescript
 *
 * [347] Top K Frequent Elements
 */

// @lc code=start
function topKFrequent(nums: number[], k: number): number[] {
    if (!nums || k <= 0 || !nums.length) {
        return []
    }
    const buckets: any[] = []
    const numToFreq = new Map<number, number>()
    nums.forEach(num => {
        buckets.push([])
        if (!numToFreq.has(num)) {
            numToFreq.set(num, 0)
        }
        numToFreq.set(num, numToFreq.get(num)! + 1)
    })
    Array.from(numToFreq.entries()).forEach(([num, freq]) => {
        buckets[freq - 1].push(num);
    })
    const ans: any[] = [];
    for(let i = buckets.length - 1; i >= 0; i--) {
        while(buckets[i].length && k > 0) {
            ans.push(buckets[i].pop())
            k--;
        }
    }
    return ans
};
// @lc code=end

const nums = [1, 1, 1, 2, 2, 3,3,4,4,4,5,4,6];
console.log(topKFrequent(nums, 2));

export {}