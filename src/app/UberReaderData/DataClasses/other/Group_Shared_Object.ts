import { Shared_Object } from '../db/Shared_Object';
import { StringUtils } from '../../Utils/StringUtils';

export class Group_Shared_Object extends Shared_Object
{
    private _group_name:string;
    public get Group_name():string
    {
        return this._group_name;
    }
    
    public set Group_name(val:string)
    {
        this._group_name = val;
    }
    
    private _group_description:string;
    public get Group_description():string
    {
        return this._group_description;
    }
    
    public set Group_description(val:string)
    {
        this._group_description = val;
    }
    
    public static fromJson(jsonObject:any):Group_Shared_Object
    {
        var retVal:Group_Shared_Object = new Group_Shared_Object();
        retVal.Group_name = StringUtils.DecodeFromJSONUri(jsonObject.Group_name);
        retVal.Group_id = jsonObject.Group_id;
        retVal.Shared_object_id = jsonObject.Shared_object_id;
        retVal.Can_edit = jsonObject.Can_edit;
        retVal.Group_description = StringUtils.DecodeFromJSONUri(jsonObject.Group_description);
        return retVal;
    }
}