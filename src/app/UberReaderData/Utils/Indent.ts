export class Indent
{
    private _NumIndent:number = 0;
    
    public getIndentStr():string
    {
        var indentString:string = "\n";
        
        for (var i = 0; i < this._NumIndent; i++)
        {
            indentString += "\t";
        }
        return indentString;
    }
    
    public toString():string
    {
        return this.getIndentStr();
    }
    
    public Increase():void
    {
        this._NumIndent++;
    }
    public Decrease():void
    {
        this._NumIndent--;
    }
}