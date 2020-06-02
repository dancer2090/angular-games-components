import { User_Course } from '../DataClasses/db/User_Course';

import { UberApplicationEvent } from './UberApplicationEvent';

export class ShowEndScreenEvent extends UberApplicationEvent
{
    public static ACTIVITY:string = "endActivity";
    public static COURSE:string = "endCourse";
    
    private _resultObject:any;
    public get ResultObject():any
    {
        return this._resultObject;
    }
    
    private _activityName:string;
    public get ActivityName():string
    {
        return this._activityName;
    }
    
    private _totalTime:number;
    public get TotalTime():number
    {
        return this._totalTime;
    }
    
    private _course:User_Course;
    public get Course():User_Course
    {
        return this._course;
    }
    
    private _nextRecommendedActivity:number;
    public get NextRecommendedActivity():number
    {
        return this._nextRecommendedActivity;
    }
    
    constructor(type:string, resultObject:any, activityName:string = "", totalTime:number = 0, course:User_Course = null, nextRecommendedActivityId:number = 0)
    {
        super(type);
        this._resultObject = resultObject;
        this._activityName = activityName;
        this._totalTime = totalTime;
        this._course = course;
        this._nextRecommendedActivity = nextRecommendedActivityId;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new ShowEndScreenEvent(this.type, this._resultObject, this._activityName, this._totalTime, this._course, this._nextRecommendedActivity);
    }
    
}