import { DataStorageManager } from '../../../UberReaderClient/DataStorageManager';

export class UserGroup {
    public static GROUP_A:string = "A";
    public static GROUP_B:string = "B";

    public static GROUPS:string[] = [UserGroup.GROUP_A, UserGroup.GROUP_B];
}

export class TempUserData
{    
    private _currentExam:string;
    public get CurrentExam():string
    {
        return this._currentExam;
    }
    public set CurrentExam(value:string)
    {
        this._currentExam = value;
        DataStorageManager.GetInstance().SetStorageUserPref("currentExam", this._currentExam);
    }
 
    private _group:string;
    public get Group():string
    {
        return this._group;
    }
    public set Group(value:string)
    {
        this._group = value;
        DataStorageManager.GetInstance().SetStorageUserPref("group", this._group);
    }
}