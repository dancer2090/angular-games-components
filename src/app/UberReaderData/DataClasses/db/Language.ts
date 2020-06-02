export class Language
{
    private _language_id:number;
    public get Language_id():number
    {
        return this._language_id;
    }
    
    private _name:string;
    public get Name():string
    {
        return this._name;
    }
    
    public static fromJson(jsonObject:any):Language
    {
        var retVal:Language = new Language();
        retVal._language_id = jsonObject.Language_id;
        retVal._name = jsonObject.Name;
        
        return retVal;
    }
}