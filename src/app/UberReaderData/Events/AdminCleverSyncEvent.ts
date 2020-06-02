import { UberApplicationEvent } from './UberApplicationEvent';
import { Group } from '../DataClasses/db/Group';
import { Customer } from '../DataClasses/db/Customer';
import { UserSubscription } from '../DataClasses/db/UserSubscription';
import { AdminUser } from '../DataClasses/db/AdminUser';

export class AdminCleverSyncEvent extends UberApplicationEvent {
    public static ADMIN_CLEVER_SYNCED: string = "adminCleverSynced";
    public static ADMIN_CLEVER_SYNC_ERROR: string = "adminCleverSyncedError";
    public static CLEVER_SYNC_STATUS_UPDATE: string = "cleverSyncStatusUpdate";
    public static CLEVER_SYNC_STATUS_UPDATE_ERROR: string = "cleverSyncStatusUpdateError";

    private _errorMessage: string;
    private _adminUsers: AdminUser[] = [];
    private _classes: Group[] = [];
    private _sync_progress: number;

    public get ErrorMessage(): string {
        return this._errorMessage;
    }

    public get AdminUsers(): AdminUser[] {
        return this._adminUsers;
    }

    public get Classes(): Group[] {
        return this._classes;
    }

    public get SyncProgress(): number {
        return this._sync_progress;
    }

    constructor(type: string, adminUsers: AdminUser[], classes: Group[], syncProgress: number = -1, errorMessage: string = null) {
        super(type);
        this._adminUsers = adminUsers;
        this._classes = classes;
        this._sync_progress = syncProgress;
        this._errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new AdminCleverSyncEvent(this.type, this._adminUsers, this._classes, this._sync_progress);
    }
}