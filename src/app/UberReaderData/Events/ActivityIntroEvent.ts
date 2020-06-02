import { Course_Activity } from '../DataClasses/db/Course_Activity';

import { UberApplicationEvent } from './UberApplicationEvent';

export class ActivityIntroEvent extends UberApplicationEvent
{
    public static DONE:string = "finished";
    public static START:string = "initialized";
    public static START_ACTIVITY:string = "startActivity";
    public static CONTINUE_ACTIVITY:string = "continueActivity";
    
    private _courseActivity:Course_Activity;
    public get CourseActivity():Course_Activity
    {
        return this._courseActivity;
    }		
    
    constructor(type:string, courseActivity:Course_Activity=null)
    {
        super(type);
        this._courseActivity = courseActivity;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new ActivityIntroEvent(this.type, this._courseActivity);
    }
}