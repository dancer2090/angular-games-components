import { UberApplication } from '../UberApplication';
import { UserPref } from '../DataClasses/db/UserPref';
import { UberApplicationEvent } from './UberApplicationEvent';

export class UserAppBgImgUpdateEvent extends UberApplicationEvent
{
    public static BG_IMG_UPDATED:string = "bgImageUpdated";
    public static BG_IMG_UPDATE_ERROR:string = "bgImageUpdateError";
    
    private _bgImageUserPref:UserPref;
    public get BgImageUserPref(): UserPref {
        return this._bgImageUserPref;
    }
    
    public get BgImageUrl(): string {
        return UberApplication.GetInstance().GetUserBackgroundImageFolder() + this._bgImageUserPref.Value;
    }

    constructor(type:string, bgImageUserPref:UserPref) {
        super(type);
        this._bgImageUserPref = bgImageUserPref;
    }
    
    public clone():UberApplicationEvent {
        return new UserAppBgImgUpdateEvent(this.type, this._bgImageUserPref);
    }
}