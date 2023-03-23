class UnionFind {
  constructor(){
    this.f = new Map();
  }

  find(x) {   // 查找 x 的所归属的集合
    if(!this.f.has(x)){
      this.f.set(x, x)
    }
    if(this.f.get(x) != x){
      this.f.set(x, this.find(this.f.get(x)))
    }
    return this.f.get(x)
  }

  union(x, y){  // 合并集合
    this.f.set(this.find(x), this.find(y))
  }
}