/*
 * @lc app=leetcode id=451 lang=typescript
 *
 * [451] Sort Characters By Frequency
 */

// @lc code=start
function frequencySort(s: string): string {
    if (!s) {
        return ''
    }
    const buckets: string[][] = []
    const charToFreq = new Map<string, number>()
    Array.from(s).forEach(c => {
        buckets.push([])
        if (!charToFreq.has(c)) {
            charToFreq.set(c, 0)
        }
        charToFreq.set(c, charToFreq.get(c)! + 1)
    })
    Array.from(charToFreq.entries()).forEach(([c, freq]) => {
        for(let i = 0; i < freq; i++) {
            buckets[freq-1].push(c);
        }
    })
    const ans: string[] = [];
    for(let i = buckets.length - 1; i >= 0; i--) {
        while(buckets[i].length) {
            ans.push(buckets[i].pop()!)
        }
    }
    return ans.join('')
};
// @lc code=end

const s = 'tree'
console.log(frequencySort(s))

