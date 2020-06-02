import { Course } from '../DataClasses/db/Course';

import { UberApplicationEvent } from './UberApplicationEvent';

export class CourseEvent extends UberApplicationEvent
{
    public static COURSE_DATA_RECEIVED:string = "courseDataReceived";
    public static COURSE_DATA_ERROR:string = "courseDataError";
    public static COURSE_PURCHASED:string = "coursePurchased";   
    
    
    private _course:Course;
    public get course():Course
    {
        return this._course;
    }
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    constructor(type:string, course:Course, errorMsg:string)
    {
        super(type);
        this._course = course;
        this._errMsg = errorMsg;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new CourseEvent(this.type, this._course, this._errMsg);
    }
}