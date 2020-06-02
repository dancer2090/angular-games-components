import { UberApplicationEvent } from './UberApplicationEvent';
import { Group } from '../DataClasses/db/Group';
import { AdminUser } from '../DataClasses/db/AdminUser';
import { District } from '../DataClasses/db/District';
import { Customer } from '../DataClasses/db/Customer';

export class AdminDistrictSyncEvent extends UberApplicationEvent {
    public static ADMIN_DISTRICT_SYNC_IN_PROGRESS: string = "adminDistrictSyncInProgress";
    public static ADMIN_DISTRICT_SYNC_FINISHED: string = "adminDistrictSyncFinished";
    public static ADMIN_DISTRICT_SYNC_ERROR: string = "adminDistrictSyncedError";

    private _errorMessage: string;
    private _district: District;
    private _customers: Customer[];
    private _classes: Group[];
    private _adminUsers: AdminUser[] = [];
    private _sync_progress: number;
    private _running_task_id: number;

    public get ErrorMessage(): string {
        return this._errorMessage;
    }

    public get AdminDistrict(): District {
        return this._district;
    }

    public get Customers(): Customer[] {
        return this._customers;
    }

    public get Classes(): Group[] {
        return this._classes;
    }

    public get AdminUsers(): AdminUser[] {
        return this._adminUsers;
    }

    public get RunningTaskID(): number {
        return this._running_task_id;
    }

    constructor(type: string, district: District, customers: Customer[], classes: Group[], adminUsers: AdminUser[], runningTaskID: number, errorMessage: string = null) {
        super(type);
        this._district = district;
        this._customers = customers;
        this._classes = classes;
        this._adminUsers = adminUsers;
        this._running_task_id = runningTaskID;
        this._errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new AdminDistrictSyncEvent(this.type, this._district, this._customers, this._classes, this._adminUsers, this._sync_progress);
    }
}