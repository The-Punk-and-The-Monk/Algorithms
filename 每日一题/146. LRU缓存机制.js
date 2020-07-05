/**
 * https://leetcode-cn.com/problems/lru-cache/
 * 双向链表
 */

 /**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.map = new Map()
  this.stack = []
  this.capacity = capacity
  this.cnt = 0

  this.getNode = function(key, value){
    return {
      key: key,
      value:value,
      next:null,
      prev:null
    }
  }

  this.head = this.getNode('_head', '_head')
  this.tail = this.getNode('_tail', '_tail')
  this.head.next = this.tail
  this.tail.prev = this.head

  this.maintain = function(key){
    if(this.tail.prev.key != key){
      let keyNode = this.map.get(key)
      let keyNodePrev = keyNode.prev 
      let keyNodeNext = keyNode.next

      keyNodePrev.next = keyNodeNext
      keyNodeNext.prev = keyNodePrev

      let lastNode = this.tail.prev
      lastNode.next = keyNode
      this.tail.prev = keyNode
      keyNode.prev = lastNode
      keyNode.next = this.tail
    }
  }

  this.addKey = function(key, value){
    if(this.map.size == this.capacity){
      let firstNode = this.head.next
      this.map.delete(firstNode.key)
      let firstNodeNext = firstNode.next
      this.head.next = firstNodeNext
      firstNodeNext.prev = this.head
    }
    let newNode = this.getNode(key, value)
    this.map.set(key, newNode)
    let lastNode = this.tail.prev
    lastNode.next = newNode
    newNode.prev =lastNode
    newNode.next = this.tail
    this.tail.prev = newNode
  }  
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if(this.map.has(key)){
    this.maintain(key)
    return this.map.get(key).value
  }
  return -1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  if(!this.map.has(key)){
    this.addKey(key, value)
  }else{
    this.map.get(key).value = value
    this.maintain(key)
  }
};

let lruCache = new LRUCache(2)
console.log(
lruCache.put(1,1),
lruCache.put(2,2),
lruCache.get(1),
lruCache.put(3,3),
lruCache.get(2),
lruCache.put(4,4),
lruCache.get(1),
lruCache.get(3),
lruCache.get(4))
