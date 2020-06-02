export class TreeNode
{
    private _data:any;
    private _label:string;
    private _children:TreeNode[] = [];
    private _parentNode:TreeNode = null;

    constructor(data:any, label:string = "")
    {
        this._label = label;
        this._data = data;
    }
    
    public set ParentNode(parent:TreeNode)
    {
        this._parentNode = parent;
    }
    public get ParentNode():TreeNode
    {
        return this._parentNode;
    }
    
    public AddChild(child:TreeNode):void
    {
        child.ParentNode = this;
        this._children.push(child);
    }
    
    public get Children():TreeNode[]
    {
        return this._children;
    }

    public RemoveChildren():void
    {
        this._children = [];
    }
    
    public set Label(val:string)
    {
        this._label = val;
    }
    public get Label():string
    {
        return this._label;
    }

    public set Data(val:any)
    {
        this._data = val;
    }
    public get Data():any
    {
        return this._data;
    }

    public clone():TreeNode
    {
        let retVal:TreeNode = new TreeNode(this._data, this._label);
        for(let child of this._children)
        {
            retVal.AddChild(child);
        }

        retVal.ParentNode = this._parentNode;
        return retVal;
    }
}