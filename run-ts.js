/*
 * @Author: LinFeng
 * @Date: 2021-06-29 14:32:38
 * @LastEditors: LinFeng
 * @LastEditTime: 2021-06-29 14:44:15
 * @Description: file content
 */
import { execSync } from 'child_process';
const file = process.argv[2];
console.log("file", file);
execSync(`ts-node ${file}`)
