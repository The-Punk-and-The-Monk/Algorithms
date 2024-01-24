Function.prototype.myCall = function (context, ...args) {
    if (typeof this !== "function") {
        throw new Error('xxxx')
    }
    context = context || window;
    const fn = this;
    context.fn = fn;
    const result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myApply = function (context, args) {
    if (typeof this !== 'function') {
        throw new Error('xxxx')
    }
    context = context || window;
    const fn = this;
    context.fn = fn;
    const result = context.fn(...args)
    delete context.fn;
    return result;
}

Function.prototype.myBind = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new Error('xxx')
    }
    const fn = this;

    return function F(...args2) {
        if (this instanceof F) {
            return new fn(...args, ...args2)
        }
        return fn.apply(context, args.concat(args2))
    }
}

// // call
// Function.prototype.myCall = function (context){
//     if(typeof this !== 'function'){
//      throw new TypeError('error')
//     }
//     context = context || window
//     const fn = this
//     const args = [...arguments].slice(1)
//     context.fn = fn 
//     let result 
//     result = context.fn(...args)
//     delete context.fn
//     return result
// }
    
// apply
// Function.prototype.myApply = function (context){
// if(typeof this !== 'function'){
//  throw new TypeError('error')
// }
// context = context || window
// context.fn = this
// const args = arguments[1] ? [...arguments[1]] : []
// const result = context.fn(...args)
// delete context.fn
// return result
// }

// bind
// Function.prototype.myBind = function (context){
//     if(typeof this !== 'function'){
//      throw new TypeError('error')
//     }
//     const fn = this
//         const args = [...arguments].slice(1)
//     // 返回一个函数
//     return function F(...args1){
//      // 因为返回了一个函数， 可以new F() 所以需要判断
//      if(this instanceof F){	// 如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象, 而这个对象的__proto__ === F.prototype
//        return new fn(...args, ...args1)
//      }else{
//        return fn.apply(context, args.concat(args1))
//      }
//     }
// }