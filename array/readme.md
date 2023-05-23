## [151. Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/description/)
```typescript
function reverseWords(s: string): string {
    return s.split(' ').filter(w => !!w.length).reverse().join(' ').trim();
};

```