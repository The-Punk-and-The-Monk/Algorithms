function minWindow(s: string, t: string): string {
    const charCountOfT = countChars(t);
    const charCountOfWindow: Record<string, number> = {};
    Object.entries(charCountOfT).forEach(([char]) => {
        charCountOfWindow[char] = 0;
    });
    const countOfNonDuplicatedCharOfT = Object.keys(charCountOfT).length;
    let validCharsCount = 0;
    let l = 0;
    let r = 0;
    let minLen = Infinity;
    let start = -1;

    while (r < s.length) {
        while (validCharsCount < countOfNonDuplicatedCharOfT && r < s.length) {
            const rc = s[r];
            r++;
            if (charCountOfT[rc]) {
                charCountOfWindow[rc] += 1;
                if (charCountOfWindow[rc] === charCountOfT[rc]) {
                    validCharsCount++;
                }
            }
        }

        while (validCharsCount === countOfNonDuplicatedCharOfT) {
            const currLen = r - l;
            if (currLen < minLen) {
                minLen = currLen;
                start = l;
            }

            const lc = s[l];
            l++;
            if (charCountOfT[lc]) {
                charCountOfWindow[lc] -= 1;
                if (charCountOfWindow[lc] < charCountOfT[lc]) {
                    validCharsCount--;
                }
            }
        }
    }
    return start !== -1 ? s.substring(start, start + minLen) : '';
}

function countChars(s: string): Record<string, number> {
    const charCount: Record<string, number> = {};
    for (let c of s) {
        if (!charCount[c]) {
            charCount[c] = 0;
        }
        charCount[c] += 1;
    }
    return charCount;
}
