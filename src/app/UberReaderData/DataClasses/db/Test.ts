import { StringUtils } from '../../Utils/StringUtils';

export class Test
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
    
    /*private var _sequence:number;
    public function get Sequence():int
    {
        return _sequence;
    }
    public function set Sequence(value:number):void
    {
        _sequence = value;
    }*/
    
    private _test_text:string;
    public get Test_text():string
    {
        return this._test_text;
    }
    public set Test_text(value:string)
    {
        this._test_text = value;
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

    /*public function ToXml():string
    {
        
        var xml:string = "<questions>\n";
        for (q:Question in _questions)
        {
            xml += q.GetXml() + "\n";
        }
        xml += "</questions>";
        
        return xml;
    }*/
    
    /*public function ToHtml():string
    {
        var html:string = "<p>Author: " + this.Author + "</p>";
        html += "<p>Book: " + this.Book + "</p>";
        html += "<p>" + this.Test_text + "</p>";
        
        for (q:Question in UberApplication.getQuestionsByTest(Test_id))
        {
            html += q.ToHtml();
        }
        html += "<hr/>";
        return html;
    }*/
    
    public static fromJson(jsonObject:any):Test
    {
        var retVal:Test = new Test();
        retVal.Test_id = jsonObject.Test_id;
        retVal.Book = jsonObject.Book;
        retVal.Author = jsonObject.Author;
        retVal.Test_text = StringUtils.DecodeFromJSONUri(jsonObject.Test_text);
        //retVal.Sequence = jsonObject.Sequence;
        retVal.Reading_level = jsonObject.Reading_level;
        
        return retVal;
    }
}