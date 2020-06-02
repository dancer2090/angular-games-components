import { ProxyCourse } from '../DataClasses/other/ProxyCourse';

import { UberApplicationEvent } from './UberApplicationEvent';

export class CourseClickedEvent extends UberApplicationEvent
{
    public static COURSE_CLICKED:string = "courseClicked";
    public static PROGRAM_CLICKED:string = "programClicked";
    public static COURSE_REVIEW_CLICKED:string = "courseReviewClicked";
    
    private _course:ProxyCourse;
    public get course():ProxyCourse
    {
        return this._course;
    }
    
    constructor(type:string, course:ProxyCourse)
    {
        super(type);
        this._course = course;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new CourseClickedEvent(this.type, this._course);
    }
}