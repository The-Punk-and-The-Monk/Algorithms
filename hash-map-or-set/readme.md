## [1657. Determine if Two Strings Are Close](https://leetcode.com/problems/determine-if-two-strings-are-close/description/)
```typescript
function closeStrings(word1: string, word2: string): boolean {
    if (word1.length !== word2.length) {
        return false
    }
    const { charFrequency: charFrequencyOfWord1, charSet: charSet1 } = getCharFrequencyAscendingAndCharSet(word1);
    const { charFrequency: charFrequencyOfWord2, charSet: charSet2 } = getCharFrequencyAscendingAndCharSet(word2);
    return isEqualArray(charFrequencyOfWord1, charFrequencyOfWord2) && isEqualSet(charSet1, charSet2)
};

function isEqualArray(arr1: number[], arr2: number[]) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false
        }
    }
    return true
}

function isEqualSet(set1: Set<any>, set2: Set<any>) {
    if (set1.size !== set2.size) {
        return false
    }
    for (let v of set1.values()) {
        if (!set2.has(v)) {
            return false
        }
    }
    return true
}

function getCharFrequencyAscendingAndCharSet(word: string): { charFrequency: number[], charSet: Set<string> } {
    const distribution: Record<string, number> = {};
    const charFrequencyArray = [];
    const charSet = new Set<string>();
    for (let c of word) {
        if (!distribution[c]) {
            distribution[c] = 0
        }
        distribution[c] += 1
        charSet.add(c);
    }

    for (let k of Object.keys(distribution)) {
        charFrequencyArray.push(distribution[k])
    }
    return {
        charFrequency: charFrequencyArray.sort((a, b) => a - b),
        charSet
    };
}
```