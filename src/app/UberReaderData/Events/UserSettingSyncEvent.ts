import { UberApplicationEvent } from './UberApplicationEvent';

export class UserSettingSyncEvent extends UberApplicationEvent {
    public static USER_SETTING_SYNC: string = "userSettingSync";

    private _errorMessage: string;
    public get ErrorMessage(): string {
        return this._errorMessage;
    }

    constructor(type: string, errorMessage: string = null) {
        super(type);
        this._errorMessage = errorMessage;
    }

    /*override*/ public clone(): UberApplicationEvent {
        return new UserSettingSyncEvent(this.type, this._errorMessage);
    }
}