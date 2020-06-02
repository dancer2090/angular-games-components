import { UberApplicationEvent } from './UberApplicationEvent';

export class UserProfilePicUpdateEvent extends UberApplicationEvent
{
    public static PROFILE_PIC_UPDATED:string = "profilePicUpdated";
    public static PROFILE_PIC_UPDATE_ERROR:string = "profilePicUpdateError";
    
    private _profilePicUrl:string;
    public get ProfilePicUrl():string
    {
        return this._profilePicUrl;
    }
    
    constructor(type:string, profilePicUrl:string)
    {
        super(type);
        this._profilePicUrl = profilePicUrl;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new UserProfilePicUpdateEvent(this.type, this._profilePicUrl);
    }
}