import { Question } from '../db/Question';
import { StringUtils } from '../../Utils/StringUtils';

export class TestData
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
    
    private _test_text:string;
    public get Test_text():string
    {
        return this._test_text;
    }
    public set Test_text(value:string)
    {
        this._test_text = value;
    }
    
    private _questions:Question[];
    public get Questions():Question[]
    {
        return this._questions;
    }
    public set Questions(value:Question[])
    {
        this._questions = value;
    }
    
    public ToXml():string
    {
        var xml:string = "<questions>\n";
        for (var q of this._questions)
        {
            xml += q.GetXml() + "\n";
        }
        xml += "</questions>";
        
        return xml;
    }
    
    public static fromJson(jsonObject:any):TestData
    {
        var retVal:TestData = new TestData();
        retVal.Test_id = jsonObject.Test_id;
        retVal.Test_text = StringUtils.DecodeFromJSONUri(jsonObject.Test_text);
        retVal.Questions = [];
        for (var questionObject of jsonObject.Questions)
        {
            var chart:Question = Question.fromJson(questionObject);
            retVal.Questions.push(chart);
        }
        
        return retVal;
    }
}