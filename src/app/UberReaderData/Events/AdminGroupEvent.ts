import { UberApplicationEvent } from './UberApplicationEvent';
import { Group } from '../DataClasses/db/Group';

export class AdminGroupEvent extends UberApplicationEvent {
    public static ADMIN_GROUP_CREATED: string = "adminGroupCreated";
    public static ADMIN_GROUP_CREATION_ERROR: string = "adminGroupCreationError";
    public static ADMIN_GROUP_UPDATED: string = "adminGroupUpdated";
    public static ADMIN_GROUP_UPDATE_ERROR: string = "adminGroupUpdateError";
    public static ADMIN_GROUP_DELETED: string = "adminGroupDeleted";
    public static ADMIN_GROUP_DELETE_ERROR: string = "adminGroupDeleteError";

    private _group: Group;
    private errorMessage: string;
    private _group_ids: number[];

    public get Group(): Group {
        return this._group;
    }

    public get Group_ids(): number[] {
        return this._group_ids;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, group: Group, errMsg: string = "", group_ids?: number[]) {
        super(type);
        this._group = group;
        this.errorMessage = errMsg;
        this._group_ids = group_ids;
    }
}