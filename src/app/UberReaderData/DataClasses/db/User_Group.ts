export class User_Group
{
    private _user_id:number;
    public get User_id():number
    {
        return this._user_id;
    }
    public set User_id(value:number)
    {
        this._user_id = value;
    }

    private _group_id:number;
    public get Group_id():number
    {
        return this._group_id;
    }
    public set Group_id(value:number)
    {
        this._group_id = value;
    }
    
    private _is_leader:boolean;
    public get Is_leader():boolean
    {
        return this._is_leader;
    }
    public set Is_leader(value:boolean)
    {
        this._is_leader = value;
    }

    private synced_from_clever:boolean;
    public get Synced_from_clever():boolean
    {
        return this.synced_from_clever;
    }
    public set Synced_from_clever(value:boolean)
    {
        this.synced_from_clever = value;
    }

    private synced_from_classlink:boolean;
    public get Synced_from_classlink():boolean
    {
        return this.synced_from_classlink;
    }
    public set Synced_from_classlink(value:boolean)
    {
        this.synced_from_classlink = value;
    }

    public static fromJson(jsonObject:any):User_Group
    {
        var retVal:User_Group = new User_Group();
        retVal.User_id = jsonObject.User_id;
        retVal.Group_id = jsonObject.Group_id;
        retVal.Is_leader = jsonObject.Is_leader;
        retVal.Synced_from_clever = jsonObject.Synced_from_clever;
        retVal.Synced_from_classlink = jsonObject.Synced_from_classlink;
        
        return retVal;
    }
}