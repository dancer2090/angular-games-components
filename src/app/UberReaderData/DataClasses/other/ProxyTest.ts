export class ProxyTest
{
    private _test_id:number;
    public get Test_id():number
    {
        return this._test_id;
    }
    public set Test_id(value:number)
    {
        this._test_id = value;
    }
    
    private _book:string;
    public get Book():string
    {
        return this._book;
    }
    public set Book(value:string)
    {
        this._book = value;
    }
    
    private _author:string;
    public get Author():string
    {
        return this._author;
    }
    public set Author(value:string)
    {
        this._author = value;
    }
    
    private _reading_level:string;
    public get Reading_level():string
    {
        return this._reading_level;
    }
    public set Reading_level(value:string)
    {
        this._reading_level = value;
    }
    
    public static fromJson(jsonObject:any):ProxyTest
    {
        var retVal:ProxyTest = new ProxyTest();
        retVal.Test_id = jsonObject.Test_id;
        retVal.Book = jsonObject.Book;
        retVal.Author = jsonObject.Author;
        retVal.Reading_level = jsonObject.Reading_level;
        
        return retVal;
    }
}