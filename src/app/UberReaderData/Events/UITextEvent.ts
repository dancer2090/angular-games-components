import { UberApplicationEvent } from './UberApplicationEvent';

export class UITextEvent extends UberApplicationEvent
{
    public static UI_TEXT_RECEIVED:string = "uiTextReceived";
    public static UI_TEXT_ERROR:string = "uiTextError";

    constructor(type:string)
    {
        super(type);
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new UITextEvent(this.type);
    }
    
}