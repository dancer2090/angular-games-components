import { AdminUser } from '../DataClasses/db/AdminUser';
import { UberApplicationEvent } from './UberApplicationEvent';

export class AdminUserEvent extends UberApplicationEvent {
    public static ADMIN_USERS_RECEIVED: string = "adminUsersReceived";
    public static ADMIN_USERS_DELETED: string = "adminUsersDeleted";
    public static ADMIN_USER_UPDATED: string = "adminUserUpdated";
    public static ADMIN_USER_PASSWORD_RESET: string = "adminUserPasswordReset";
    public static ADMIN_USER_CREATED: string = "adminUserCreated";
    public static ADMIN_USERS_ERROR: string = "adminUsersError";
    public static ADMIN_USERS_IMPORTED: string = "adminUsersImported";
    public static ADMIN_USERS_IMPORT_ERROR: string = "adminUsersImportError";

    private adminUsers: AdminUser[];
    private errorMessage: string;
    private running_task_id: number;
    private progress: number;

    public get Running_task_id(): number {
        return this.running_task_id;
    }

    public get Progress(): number {
        return this.progress;
    }

    public get AdminUsers(): AdminUser[] {
        return this.adminUsers;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, adminUsers: AdminUser[], errMsg: string = "", running_task_id?: number, progress?: number) {
        super(type);
        this.adminUsers = adminUsers;
        this.running_task_id = running_task_id;
        this.progress = progress;
        this.errorMessage = errMsg;
    }

    public clone(): UberApplicationEvent {
        return new AdminUserEvent(this.type, this.adminUsers, this.errorMessage, this.running_task_id, this.progress);
    }
}