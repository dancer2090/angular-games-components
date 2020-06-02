import { Course_Activity } from '../DataClasses/db/Course_Activity';

import { ProxyCourse } from '../DataClasses/other/ProxyCourse';

import { UberApplicationEvent } from './UberApplicationEvent';

export class CourseActivityPreviewEvent extends UberApplicationEvent
{
    public static COURSE_ACTIVITY_PREVIEW_RECEIVED:string = "courseActivityPreviewReceived";
    public static COURSE_ACTIVITY_PREVIEW_ERROR:string = "courseActivityPreviewError";
    
    private _course_activity:Course_Activity;
    public get courseActivity():Course_Activity
    {
        return this._course_activity;
    }

    private _proxyCourse:ProxyCourse;
    public get proxyCourse():ProxyCourse
    {
        return this._proxyCourse;
    }

    private _stepNumber:number;
    public get stepNumber():number
    {
        return this._stepNumber;
    }
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    constructor(type:string, courseActivityVal:Course_Activity, proxyCourse:ProxyCourse, stepNumber:number, errorMsg:string)
    {
        super(type);
        this._course_activity = courseActivityVal;
        this._proxyCourse = proxyCourse;
        this._stepNumber = stepNumber;
        this._errMsg = errorMsg;
    }
    
    // /*override*/ public clone():UberApplicationEvent
    // {
    //     return new CourseEvent(this.type, this._course_activity, this._errMsg);
    // }
}