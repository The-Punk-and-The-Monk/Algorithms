/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-11-01 10:47:18
 * @LastEditTime: 2020-11-01 11:45:46
 * @FilePath: /Algorithms/每日一题/140.单词拆分.js
 * @Description:
 */
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  if (!s || !wordDict || wordDict.length === 0) {
    return [];
  }
  const wordSet = new Set(wordDict);
  const dp = new Map();
  return backtracking(s, 0, wordSet, dp);
};

function backtracking(s, startIdx, wordSet, dp) {
  if (dp.has(startIdx)) {
    return dp.get(startIdx);
  }
  if (startIdx === s.length) {
    return [""];
  }
  const subs = [];
  for (let i = startIdx + 1; i <= s.length; i++) {
    const sub = s.slice(startIdx, i);
    if (wordSet.has(sub)) {
      const deepSubs = backtracking(s, i, wordSet, dp);
      for (let deepSub of deepSubs) {
        subs.push(deepSub.length === 0 ? sub : sub + " " + deepSub);
      }
    }
  }
  dp.set(startIdx, subs);
  return subs;
}

const s =
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const wordDict = [
  "a",
  "aa",
  "aaa",
  "aaaa",
  "aaaaa",
  "aaaaaa",
  "aaaaaaa",
  "aaaaaaaa",
  "aaaaaaaaa",
  "aaaaaaaaaa",
];

console.log(wordBreak(s, wordDict));
