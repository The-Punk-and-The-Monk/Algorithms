# Definition for a binary tree node.
from typing import List
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def generateTrees(self, n: int) -> List[TreeNode]:

        return self.generate_trees(1, n)


    def pre_order(self, root, tmp):
        if root is None:
            tmp.append(None)
            return
        tmp.append(root.val)
        self.pre_order(root.left, tmp)
        self.pre_order(root.right, tmp)


    def generate_trees(self, l, r):
        if l > r:
            return [None]
        if l == r:
            return [TreeNode(l)]
        trees = []
        for i in range(l, r+1):
            l_trees = self.generate_trees(l, i-1)
            r_trees = self.generate_trees(i +1, r)
            for l_tree in l_trees:
                for r_tree in r_trees:
                    cur_root = TreeNode(i)
                    cur_root.left = l_tree
                    cur_root.right = r_tree
                    trees.append(cur_root)
        return trees

