import { UberApplicationEvent } from './UberApplicationEvent';
import { UserPref } from '../DataClasses/db/UserPref';

export class UserPrefEvent extends UberApplicationEvent {
    public static USER_PREF_RECEIVED: string = "userPrefReceived";
    public static USER_PREF_ERROR: string = "userPrefError";

    private errorMessage: string
    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    private userPref: UserPref;
    public get UserPref(): UserPref {
        return this.userPref;
    }

    constructor(type: string, userPref: UserPref, errorMessage: string = null) {
        super(type);
        this.userPref = userPref;
        this.errorMessage = errorMessage;
    }
}