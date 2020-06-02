import { Text } from '../DataClasses/db/Text';

import { UberApplicationEvent } from './UberApplicationEvent';

export class UberReaderTextEvent extends UberApplicationEvent
{
    public static TEXT_SELECTED:string = "textSelected";
    public static TEXT_RETREIVED:string = "textReceived";
    public static TEXT_RETREIVAL_ERROR:string = "textRetreivalError";
    public static TEXT_INSERTED:string = "textInserted";
    public static TEXT_INSERT_ERROR:string = "textInsertError";
    
    private _text:Text;
    public get _Text():Text
    {
        return this._text;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    private _action:boolean = false;
    public get Action():boolean
    {
        return this._action;
    }
    
    constructor(type:string, text:Text, errorMessage:string=null, saveAndAction:boolean=false)
    {
        super(type);
        this._text = text;
        this._errorMessage = errorMessage;
        this._action = saveAndAction;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new UberReaderTextEvent(this.type, this._text, this._errorMessage);
    }
}