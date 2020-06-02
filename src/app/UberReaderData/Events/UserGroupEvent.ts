import { UberApplicationEvent } from './UberApplicationEvent';
import { User_Group } from '../DataClasses/db/User_Group';

export class UserGroupEvent extends UberApplicationEvent
{
    public static USERS_ADDED_TO_GROUP:string = "usersAddedToGroup";
    public static USERS_ADD_TO_GROUP_ERROR:string = "usersAddToGroupError";
    public static INSTRUCTORS_ADDED_TO_GROUP:string = "instructorsAddedToGroup";
    public static INSTRUCTORS_ADD_TO_GROUP_ERROR:string = "instructorsAddToGroupError";
    public static USERS_REMOVED_FROM_GROUP:string = "usersRemovedFromGroup";
    public static USERS_REMOVE_FROM_GROUP_ERROR:string = "usersRemoveFromGroupError";
    public static USERS_REMOVED_FROM_OTHER_GROUPS:string = "usersRemovedFromOtherGroups";
    public static USERS_REMOVE_FROM_OTHER_GROUPS_ERROR:string = "usersRemoveFromOtherGroupsError";
    
    private _errorMessage:string
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }

    private _statusMessage:string
    public get StatusMessage():string
    {
        return this._statusMessage;
    }
    
    private _userGroups:User_Group[];
    public get User_Groups():User_Group[]
    {
        return this._userGroups;
    }
    
    constructor(type:string, userGroups:User_Group[], errorMessage:string=null, statusMessage?: string)
    {
        super(type);
        this._userGroups = userGroups;
        this._errorMessage = errorMessage;
        this._statusMessage = statusMessage;
    }
}