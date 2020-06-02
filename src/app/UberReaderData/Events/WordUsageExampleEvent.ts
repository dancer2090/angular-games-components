import { WordUsageExample } from '../DataClasses/db/WordUsageExample';

import { UberApplicationEvent } from './UberApplicationEvent';

export class WordUsageExampleEvent extends UberApplicationEvent
{
    public static WORD_USAGE_RETRIEVED:string = "wordUsageRetrieved";
    public static WORD_USAGE_FAILED:string = "wordUsageFailed";
    
    private _examples:WordUsageExample[];
    public get Examples():WordUsageExample[]
    {
        return this._examples;
    }
    
    private _errorMsg:string;
    public get ErrorMessage():string
    {
        return this._errorMsg;
    }
    
    constructor(type:string, examples:WordUsageExample[], errorMsg:string="")
    {
        super(type);
        this._examples = examples;
        this._errorMsg = errorMsg;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new WordUsageExampleEvent(this.type, this._examples, this._errorMsg);
    }
}