import { Shared_Object } from '../db/Shared_Object';
import { StringUtils } from '../../Utils/StringUtils';

export class User_Shared_Object extends Shared_Object
{
    private _name:string;
    public get Name():string
    {
        return this._name;
    }
    
    public set Name(val:string)
    {
        this._name = val;
    }
            
    public static fromJson(jsonObject:any):User_Shared_Object
    {
        var retVal:User_Shared_Object = new User_Shared_Object();
        retVal.Name = StringUtils.DecodeFromJSONUri(jsonObject.User_name);
        retVal.User_id = jsonObject.User_id;
        retVal.Shared_object_id = jsonObject.Shared_object_id;
        retVal.Can_edit = jsonObject.Can_edit;
        return retVal;
    }
}