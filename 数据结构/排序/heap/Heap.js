class Heap{
  constructor(compareFunc){
    /**
     * 要求compareFunc(a, b) 返回 -1, 0, 1
     */
    this.compareFunc = compareFunc
  }

  min(a, b, c){
    if(b == "Infinity"  && c == "Infinity"){
      return a
    }else if(b == "Infinity"){
      return this.compareFunc(a, c) >= 0 ? c : a;
    }else if(c == "Infinity"){
      return this.compareFunc(a, b) >= 0 ? b : a;
    }
    let tmp = this.compareFunc(a, b) >= 0 ? b : a
    return this.compareFunc(tmp, c) >= 0 ? c : tmp
  }

  swap(arr, i, j){
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  min_heapify(arr, i, size){
    /**
     * 调整 arr[i] 的位置
     * O(lg(size))
     */
    const leftChildIdx = i * 2 + 1
    const rightChildIdx = i * 2 + 2
    const leftChild = leftChildIdx < size ? arr[leftChildIdx] : "Infinity"
    const rightChild = rightChildIdx < size ? arr[rightChildIdx] : "Infinity"
    const minValue = this.min(arr[i], leftChild, rightChild)
    if(minValue == leftChild){
      this.swap(arr, i, leftChildIdx)
      this.min_heapify(arr, leftChildIdx, size)
    }else if(minValue == rightChild){
      this.swap(arr, i, rightChildIdx)
      this.min_heapify(arr, rightChildIdx, size)
    }
  }

  build_heap(arr){
    /**
     * 对arr建堆
     * 设 arr.length = n, n-1 是最后一个节点, (n-1)//2是最后一个有孩子的节点
     * (n-1) // 2 + 1 开始往后是叶节点
     * 按逆序, 对所有非叶节点都调用一次 this.min_heapify, 
     * 时间复杂度为 O(n), 既可以在线性时间内把一个无序数组构造成一个堆, 
     * 证明见算法导论第三版 P88
     */
    const lastFather = Math.floor((arr.length - 1) /2) + 1
    for(let i = lastFather; i >= 0; i--){
      this.min_heapify(arr, i, arr.length)
    }
  }

  heapsort(arr){
    /**
     * 对 arr 进行排序
     * 如果是小顶堆则是降序排序
     * 先建堆, 再交换堆顶元素跟最后一个元素, 再维护 size-1 的堆
     * 时间复杂度为 O(nlgn) 因为调用了 n-1 次 min_heapify
     */
    this.build_heap(arr)
    let size = arr.length
    for(let i = arr.length - 1; i > 0; i--){
      this.swap(arr, 0, i)
      this.min_heapify(arr, 0, size-1)
      size = size - 1
    }
  }
}

let myHeap = new Heap(function (a, b){
  if(a > b){
    return -1
  }else if(a == b){
    return 0
  }else{
    return 1
  }
})

let arr = [4,2,5,2,5,3,5,6]
myHeap.heapsort(arr)
console.log(arr)