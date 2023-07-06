function advantageCount(nums1: number[], nums2: number[]): number[] {
    if (!nums1?.length || !nums2?.length || nums1.length !== nums2.length) {
        return nums1;
    }
    const nums2WithIndex: { v: number; i: number }[] = [];
    nums2.forEach((v, i) => {
        nums2WithIndex.push({
            v,
            i,
        });
    });
    nums2WithIndex.sort((a, b) => b.v - a.v);
    nums1.sort((a, b) => a - b);
    let l = 0;
    let r = nums1.length - 1;
    const res = new Array(nums1.length).fill(-1);
    for (let h of nums2WithIndex) {
        const { v, i } = h;
        if (nums1[r] > v) {
            res[i] = nums1[r];
            r--;
        } else {
            res[i] = nums1[l];
            l++;
        }
    }
    return res;
}

console.log(advantageCount([12, 24, 8, 32], [13, 25, 32, 11]));
