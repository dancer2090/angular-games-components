import { User_Course } from '../DataClasses/db/User_Course';

import { UberApplicationEvent } from './UberApplicationEvent';

export class UberSyncEvent extends UberApplicationEvent
{
    public static USER_DATA_SYNC:string = "userDataSync";
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    private _userCourseList:User_Course[];
    public get UserCourseList():User_Course[]
    {
        return this._userCourseList;
    }
    
    constructor(type:string, userCourseList:User_Course[], errorMessage:string=null)
    {
        super(type);
        this._userCourseList = userCourseList;
        this._errorMessage = errorMessage;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new UberSyncEvent(this.type, this._userCourseList, this._errorMessage);
    }
}