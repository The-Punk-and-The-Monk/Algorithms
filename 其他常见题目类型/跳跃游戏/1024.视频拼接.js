/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-10-24 15:41:02
 * @LastEditTime: 2020-10-24 16:28:39
 * @FilePath: /Algorithms/其他常见题目类型/跳跃游戏/1024.视频拼接.js
 * @Description:
 */
/**
 * @param {number[][]} clips
 * @param {number} T
 * @return {number}
 */
var videoStitching = function (clips, T) {
  if (!clips || clips.length === 0) {
    return -1;
  }
  if (T === 0) {
    return -1;
  }
  let maxn = Array(T);
  for (let i = 0; i < T; i++) {
    maxn[i] = i;
  }
  for (let i = 0; i < clips.length; i++) {
    if (clips[i][0] < T) {
      maxn[clips[i][0]] = Math.max(maxn[clips[i][0]], clips[i][1]);
    }
  }
  if (maxn[0] === -1) {
    return -1;
  }
  let last = 0;
  let pre = 0;
  let cnt = 0;
  for (let i = 0; i < T; i++) {
    last = Math.max(last, maxn[i]);
    if (last === i) {
      return -1;
    }
    if (i === pre) {
      cnt += 1;
      pre = last;
    }
  }
  return cnt;
};

clips = [
  [0, 2],
  [4, 6],
  [8, 10],
  [1, 9],
  [1, 5],
  [5, 9],
];
T = 10;
console.log(videoStitching(clips, T));
