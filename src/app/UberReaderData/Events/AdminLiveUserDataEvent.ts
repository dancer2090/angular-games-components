import { UberApplicationEvent } from './UberApplicationEvent';
import { Admin_Live_User_Data } from '../DataClasses/db/Admin_Live_User_Data';
import { UserPref } from '../DataClasses/db/UserPref';

export class AdminLiveUserDataEvent extends UberApplicationEvent {
    public static ADMIN_LIVE_USER_DATA_RECEIVED: string = "adminLiveUserDataReceived";
    public static ADMIN_LIVE_USER_DATA_ERROR: string = "adminLiveUserDataError";
    public static ADMIN_LIVE_GROUP_DATA_RECEIVED: string = "adminLiveGroupDataReceived";
    public static ADMIN_LIVE_GROUP_DATA_ERROR: string = "adminLiveGroupDataError";
    

    private _admin_live_user_data: Admin_Live_User_Data[];
    private _group_userprefs: UserPref[];
    private errorMessage: string;

    public get Live_User_Data(): Admin_Live_User_Data[] {
        return this._admin_live_user_data;
    }

    public get Group_UserPrefs(): UserPref[] {
        return this._group_userprefs;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, liveUserData: Admin_Live_User_Data[], groupUserprefs: UserPref[], errMsg: string = "") {
        super(type);
        this._admin_live_user_data = liveUserData;
        this._group_userprefs = groupUserprefs;
        this.errorMessage = errMsg;
    }
}