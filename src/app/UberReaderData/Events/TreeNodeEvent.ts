import { UberApplicationEvent } from './UberApplicationEvent';
import { Course } from '../DataClasses/db/Course';
import { TreeNode } from '../Utils/TreeNode';

export class TreeNodeEvent extends UberApplicationEvent
{
     public static TREE_NODE_SELECTED:string = "treeNodeSelected";
    // public static DELETE_TREE_NODE:string = "deleteTreeNode";
    
    // private _treeNodeData:TreeNodeData;
    // public get TreeNodeData():TreeNodeData
    // {
    //     return this._treeNodeData;
    // }

    private _treeNode:TreeNode;
    public get TreeNode():TreeNode
    {
        return this._treeNode;
    }
    
     constructor(type:string, treeNodeData:TreeNode)
     {
         super(type);
         this._treeNode = treeNodeData;
     }
}