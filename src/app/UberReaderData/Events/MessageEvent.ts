import { UberApplicationEvent } from './UberApplicationEvent';

export class MessageEvent extends UberApplicationEvent
{
    public static CONFIRMATION_PIN_SENT:string = "confirmationPinSent";
    public static CONFIRMATION_PIN_ERROR:string = "confirmationPinError";
    
    public static PASSWORD_RESET:string = "passwordReset";
    public static PASSWORD_RESET_ERROR:string = "passwordResetError";
    
    private _message:string;
    public get Message():string
    {
        return this._message;
    }
    
    constructor(type:string, message:string)
    {
        super(type);
        this._message = message;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new MessageEvent(this.type, this._message);
    }
}