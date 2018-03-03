class TreeNode(object):
    def __init__(self, x,left=None,right=None):
        self.val = x
        self.left = left
        self.right = right

class Solution(object):
    def findFrequentTreeSum(self, root):
        """
        :type root: TreeNode
        :rtype: List[int]
        """
        t=self.get_list(root)
        if t==[]:
            return t
        d={}
        for i in t:
            d[i]=d.setdefault(i,0)+1
        v=[]
        for key,value in d.items():
            v.append(value)
        mvalue=max(v)
        k=[]
        for key,value in d.items():
            if value==mvalue:
                k.append(key)
        return k
        
    def get_list(self,root):
        if root==None:
            return []
        if root.left==None:
            if root.right==None:
                return [root.val]
            else:
                return [root.val+self.findFrequentTreeSum(root.right)[0]]+self.findFrequentTreeSum(root.right)
        elif root.right==None:
            return [root.val+self.findFrequentTreeSum(root.left)[0]]+self.findFrequentTreeSum(root.left)
        else:
            return [root.val+self.findFrequentTreeSum(root.right)[0]+self.findFrequentTreeSum(root.left)[0]]+self.findFrequentTreeSum(root.right)+self.findFrequentTreeSum(root.left)
     
tree11=TreeNode(1)
tree21=TreeNode(14,tree11,None)
root=TreeNode(5,tree21)
s=Solution()
print(s.findFrequentTreeSum(root))