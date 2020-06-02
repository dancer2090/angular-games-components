export class Code
{
    private _code_id:number;
    public get Code_id():number
    {
        return this._code_id;
    }
    public set Code_id(value:number)
    {
        this._code_id = value;
    }
    
    private _parent_code_id:number;
    public get Parent_code_id():number
    {
        return this._parent_code_id;
    }
    public set Parent_code_id(value:number)
    {
        this._parent_code_id = value;
    }
    
    private _code_text:string;
    public get Code_text():string
    {
        return this._code_text;
    }
    public set Code_text(value:string)
    {
        this._code_text = value;
    }
    
    public toString():string
    {
        return this.Code_text;
    }
    
    public static fromJson(jsonObject:any):Code
    {
        var retVal:Code = new Code();
        retVal.Code_id = jsonObject.Code_id;
        retVal.Code_text = jsonObject.Code_text;
        retVal.Parent_code_id = jsonObject.Parent_code_id;
        
        return retVal;
    }
}