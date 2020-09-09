/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-08-14 08:32:47
 * @LastEditTime: 2020-08-18 08:20:31
 * @FilePath: /Algorithms/牛客调试环境.js
 * @Description:
 */
let input = `5
10
2 2 6 5 4
6 3 5 4 6`;
input = input.split(/\n/);

function* readGenerator() {
  for (let line of input) {
    yield line;
  }
}

let interator = readGenerator();

function readline() {
  return interator.next().value;
}

function print(v) {
  console.log(v);
}

////////////////////////////////////

let obj = {
  name: "wawa",
};

let arr = [
  1,
  3,
  2,
  2,
  obj,
  "2",
  NaN,
  NaN,
  undefined,
  null,
  null,
  undefined,
  obj,
  {},
  {},
  { name: "haha" },
  { age: 2 },
];

console.log(unique(arr));

/////////////////////////////////
console.log("");
