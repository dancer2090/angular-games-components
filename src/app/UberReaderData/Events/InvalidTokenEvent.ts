import { UberApplication } from '../UberApplication';
import { UberApplicationEvent } from './UberApplicationEvent';

export class InvalidTokenEvent extends UberApplicationEvent
{
    public static INVALID_TOKEN:string = "invalidToken";
    public static TOKEN_INVALIDATED:string = "tokenInvalidated";
    
    //private static var INVALID_TOKEN_MESSAGE:string = UberApplication.GetExistingInstance().GetUiTextByKey("ERR_INVALID_TOKEN_MESSAGE");//"Your session has expired. Please restart the application. If you continue to receive this message, please contact helpdesk@ereflect.com.";
    //private static var TOKEN_INVALIDATED_MESSAGE:string = UberApplication.GetExistingInstance().GetUiTextByKey("ERR_TOKEN_INVALIDATED_MESSAGE");//"Your session has expired. Your account is logged into too many places. If you continue to experience problems, please contact helpdesk@ereflect.com.";
    
    private _message:string;
    public get Message():string
    {
        return this._message;
    }
    
    constructor(type:string)
    {
        super(type);
        if (type == InvalidTokenEvent.INVALID_TOKEN)
        {
            this._message = UberApplication.GetExistingInstance().GetUiTextByKey("ERR_INVALID_TOKEN_MESSAGE");
        }
        else if (type == InvalidTokenEvent.TOKEN_INVALIDATED)
        {
            this._message = UberApplication.GetExistingInstance().GetUiTextByKey("ERR_TOKEN_INVALIDATED_MESSAGE");
        }
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new InvalidTokenEvent(this.type);
    }
}