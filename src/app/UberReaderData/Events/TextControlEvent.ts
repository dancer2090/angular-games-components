import { Text } from '../DataClasses/db/Text';

import { UberApplicationEvent } from './UberApplicationEvent';

export class TextControlEvent extends UberApplicationEvent
{
    public static EDIT_TEXT:string = "editTextContent";
    public static DELETE_TEXT:string = "deleteTextContent";
    public static SHARE_TEXT:string = "shareText";
    
    private _text:Text;
    public get _Text():Text
    {
        return this._text;
    }	
    
    constructor(type:string, text:Text)
    {
        super(type);
        this._text = text;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new TextControlEvent(this.type, this._text);
    }
    
}