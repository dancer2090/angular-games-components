import { Wordlist } from '../DataClasses/db/Wordlist';

import { UberApplicationEvent } from './UberApplicationEvent';

export class NewWordsAddedToListEvent extends UberApplicationEvent
{
    public static NEW_WORDS_ADDED:string = "newWordsAdded";
    
    private _numOfNewWordsAdded:number;
    public get numOfNewWordsAdded():number
    {
        return this._numOfNewWordsAdded;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, numOfNewWordsAdded:number=0, errorMessage:string=null)
    {
        super(type);
        this._numOfNewWordsAdded = numOfNewWordsAdded;
        this._errorMessage = errorMessage;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new NewWordsAddedToListEvent(this.type, this._numOfNewWordsAdded, this._errorMessage);
    }
}