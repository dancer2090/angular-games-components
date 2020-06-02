import { UberApplicationEvent } from './UberApplicationEvent';

import { ProxyCourse } from '../DataClasses/other/ProxyCourse';

export class AddCourseEvent extends UberApplicationEvent
{
    public static ADD_COURSE_SUCCESS:string = "addCourseSuccess";
    public static ADD_COURSE_FAILED:string = "addCourseFailed";
    
    private _course:ProxyCourse;
    public get course():ProxyCourse
    {
        return this._course;
    }
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    public constructor(type:string, course:ProxyCourse, errMsg:string="")
    {
        super(type);
        this._course = course;
        this._errMsg = errMsg;
    }
    
    public clone():UberApplicationEvent
    {
        return new AddCourseEvent(this.type, this._course, this._errMsg);
    }
}