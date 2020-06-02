import { TreeNode } from './TreeNode';

export class PrepEdSubjectFilter
{
    public treeNode:Array<TreeNode>;
    public count:number = 0;
    public selected:boolean = false;
    public label:string;

    public header:boolean = false;

    constructor()
    {
        this.count = 0;
        this.selected = false;
        this.treeNode = [];
    }    

    setValues(node:TreeNode, count:number, selected:boolean, header:boolean):void
    {
        this.label = node.Label;
        this.treeNode.push(node)
        //this.treeNode = node;
        this.count = count;
        this.selected = selected;
        this.header = header;
    }

    merge(filter:PrepEdSubjectFilter)
    {
        this.treeNode = this.treeNode.concat(filter.treeNode);
        this.count += filter.count;
        this.selected = this.selected || filter.selected;
    }

    get formattedData():Array<TreeNode>
    {
        let data:Array<TreeNode> = [];
        let parentNode:TreeNode;        
        return data;
    }
}