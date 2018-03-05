class binary_tree_node():
    def __init__(self,data,left=None,right=None):
        self.data=data
        self.left=left
        self.right=right

class binary_tree():
    def __init__(self,root):
        self.root=root
    def pre_order(self,binary_tree_node):#前序遍历
        if binary_tree_node==None:
            return
        print(binary_tree_node.data)
        self.pre_order(binary_tree_node.left)
        self.pre_order(binary_tree_node.right)