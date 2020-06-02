import { AdminUser } from '../DataClasses/db/AdminUser';
import { UberApplicationEvent } from './UberApplicationEvent';
import { UserPref } from '../DataClasses/db/UserPref';

export class AdminUserGoalsEvent extends UberApplicationEvent {
    public static ADMIN_USER_GOALS_RECEIVED: string = "adminUserGoalsReceived";
    public static ADMIN_USER_GOALS_ERROR: string = "adminUserGoalsError";

    private goalUserPrefs: UserPref[];
    private errorMessage: string;

    public get GoalUserPrefs(): UserPref[] {
        return this.goalUserPrefs;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, goalUserPrefs: UserPref[], errMsg: string = "") {
        super(type);
        this.goalUserPrefs = goalUserPrefs;
        this.errorMessage = errMsg;
    }

    public clone(): UberApplicationEvent {
        return new AdminUserGoalsEvent(this.type, this.goalUserPrefs, this.errorMessage);
    }
}