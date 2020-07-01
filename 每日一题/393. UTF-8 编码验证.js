/**
 * @param {number[]} data
 * @return {boolean}
 * 位操作
 */
var validUtf8 = function(data) {
  let i = 0
  while(i < data.length){
      if(validOneByteUtf8(data[i])){
          i += 1
          continue
      }
      if(i + 1 < data.length && validTwoByteUtf8(data[i], data[i+1])){
          i += 2
          continue
      }
      if(i + 2 < data.length && validThreeByteUtf8(data[i], data[i+1], data[i+2])){
          i += 3
          continue
      }
      if(i + 3 < data.length && validFourByteUtf8(data[i], data[i+1], data[i+2], data[i+3])){
          i += 4
          continue
      }
      return false
  }
  return true
};


/**
 * 这里有个坑
 * 197 & 224  // 192 
 * 197 & 224 == 192 // 0 
 * (197 & 224) == 192 // true
 * & 的优先级比 == 低
 */
function validOneByteUtf8(num){
  return (num & 128) == 0;
}

function validTwoByteUtf8(num1, num2){
  return (num1 & 224) == 192 && (num2 & 192) == 128;
}

function validThreeByteUtf8(num1, num2, num3){
  return (num1 & 240) == 224 && (num2 & 192) == 128 && (num3 & 192) == 128;
}

function validFourByteUtf8(num1, num2, num3, num4){
  return (num1 & 248) == 240 && (num2 & 192) == 128 && (num3 & 192) == 128 && (num4 & 192) == 128;
}

console.log(validUtf8([197,130,1]))