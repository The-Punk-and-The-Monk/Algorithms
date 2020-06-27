var mySqrt = function(x) {
  if(x <= 3){
      return 1
  }
  let l = 2
  let r = Math.floor(x/2) + 1
  while(l <= r){
      let mid = l + Math.floor((r-l)/2)
      let midSquare = mid*mid 
      let midPlusOneSquare = (mid+1)*(mid+1)
      if(midSquare <= x && midPlusOneSquare > x){
          return mid
      }else if(midSquare > x){
          r = mid -1
      }else{
          l = mid + 1
      }
  }
};

console.log(mySqrt(8))