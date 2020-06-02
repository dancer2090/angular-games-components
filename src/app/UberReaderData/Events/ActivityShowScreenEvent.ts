import { User_Course } from '../DataClasses/db/User_Course';

import { UberApplicationEvent } from './UberApplicationEvent';

export class ActivityShowScreenEvent extends UberApplicationEvent
{
    public static RUN_NEXT:string = "runNextActivity";
    public static RUN_AGAIN:string = "runCurrentActivityAgain";
    public static BACK:string = "mobileEndScreenBack";
    public static RECOMMENDED_ACTIVITY:string = "runRecommendedActivity";     
    
    private _activityId:number  = 0;
    public get ActivityId():number
    {
        return this._activityId;
    }
    
    private _userCourse:User_Course;
    public get UserCourse():User_Course
    {
        return this._userCourse;
    }

    constructor(type:string, activityId:number = 0, userCourse:User_Course=null)
    {
        super(type);
        this._activityId = activityId;
        this._userCourse = userCourse;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new ActivityShowScreenEvent(this.type, this._activityId, this._userCourse);
    }
}