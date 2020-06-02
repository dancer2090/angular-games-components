import { Shared_Object } from '../DataClasses/db/Shared_Object';

import { UberApplicationEvent } from './UberApplicationEvent';

export class SharedObjectEvent extends UberApplicationEvent
{
    public static DELETE_SHARED_OBJECT:string = "deleteSharedObject";	
    public static CHANGE_SHARE_PERMISSION:string = "changeSharePermission";
    
    public static SHARED_OBJECT_UPDATED:string = "sharedObjectUpdated";
    public static SHARED_OBJECT_UPDATE_ERROR:string = "sharedObjectUpdateError";
    
    private _sharedObject:Shared_Object;
    public get SharedObject():Shared_Object
    {
        return this._sharedObject;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, sharedObject:Shared_Object, errorMessage:string=null)
    {
        super(type);
        this._sharedObject = sharedObject;
        this._errorMessage = errorMessage;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new SharedObjectEvent(this.type, this._sharedObject, this._errorMessage);
    }
}