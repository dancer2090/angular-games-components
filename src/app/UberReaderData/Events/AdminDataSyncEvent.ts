import { UberApplicationEvent } from './UberApplicationEvent';
import { Group } from '../DataClasses/db/Group';
import { Customer } from '../DataClasses/db/Customer';
import { UserSubscription } from '../DataClasses/db/UserSubscription';
import { AdminUser } from '../DataClasses/db/AdminUser';

export class AdminDataSyncEvent extends UberApplicationEvent {
    public static ADMIN_DATA_SYNCED: string = "adminDataSynced";
    public static ADMIN_DATA_SYNC_ERROR: string = "adminDataSyncedError";

    private _errorMessage: string;
    private _adminUsers: AdminUser[] = [];
    private _adminUserGropus: Group[] = [];

    public get ErrorMessage(): string {
        return this._errorMessage;
    }

    public get AdminUsers(): AdminUser[] {
        return this._adminUsers;
    }

    public get AdminUserGroups(): Group[] {
        return this._adminUserGropus;
    }

    constructor(type: string, adminUsers: AdminUser[], adminUserGroups: Group[], errorMessage: string = null) {
        super(type);
        this._adminUsers = adminUsers;
        this._adminUserGropus = adminUserGroups;
        this._errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new AdminDataSyncEvent(this.type, this._adminUsers, this._adminUserGropus);
    }
}