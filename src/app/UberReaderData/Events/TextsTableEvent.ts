import { SharedProxyText } from '../DataClasses/other/SharedProxyText';

import { UberApplicationEvent } from './UberApplicationEvent';

export class TextsTableEvent extends UberApplicationEvent
{
    public static TEXTS_RETRIEVED:string = "textsRetrieved";
    public static TEXT_RETRIEVAL_FAILED:string = "textRetrievalFailed";
    
    private _sharedTexts:SharedProxyText[];
    public get SharedTexts():SharedProxyText[]
    {
        return this._sharedTexts;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, sharedTexts:SharedProxyText[], errorMessage:string=null)
    {
        super(type);
        this._errorMessage = errorMessage;
        this._sharedTexts = sharedTexts;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new TextsTableEvent(this.type, this._sharedTexts, this._errorMessage);
    }
}