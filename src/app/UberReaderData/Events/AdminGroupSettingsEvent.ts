import { UberApplicationEvent } from './UberApplicationEvent';
import { Setting } from '../DataClasses/db/Setting';
import { UserPref } from '../DataClasses/db/UserPref';

export class AdminGroupSettingsEvent extends UberApplicationEvent {
    public static ADMIN_GROUP_SETTINGS_RECEIVED: string = "adminGroupSettingsReceived";
    public static ADMIN_GROUP_SETTINGS_ERROR: string = "adminGroupSettingsError";
    public static ADMIN_GROUP_SETTINGS_UPDATED: string = "adminGroupSettingsUpdated";
    public static ADMIN_GROUP_SETTINGS_UPDATE_ERROR: string = "adminGroupSettingsUpdateError";
    public static ADMIN_GROUP_SETTINGS_RESET: string = "adminGroupSettingsReset";
    public static ADMIN_GROUP_SETTINGS_RESET_ERROR: string = "adminGroupSettingsResetError";

    private _group_settings: Setting[];
    private _group_userPrefs: UserPref[];
    private errorMessage: string;

    public get Group_Settings(): Setting[] {
        return this._group_settings;
    }

    public get Group_UserPrefs(): UserPref[] {
        return this._group_userPrefs;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, groupSettings: Setting[], groupUserPrefs: UserPref[], errMsg: string = "") {
        super(type);
        this._group_settings = groupSettings;
        this._group_userPrefs = groupUserPrefs;
        this.errorMessage = errMsg;
    }
}