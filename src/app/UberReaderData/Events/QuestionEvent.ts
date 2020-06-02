import { UberApplicationEvent } from './UberApplicationEvent';
import { Course_Activity } from '../DataClasses/db/Course_Activity';

export class QuestionEvent extends UberApplicationEvent
{
    public static QUESTION_CREATED:string = "questionCreated";
    public static QUESTION_SAVED:string = "questionSaved";
    public static QUESTION_CREATION_ERROR:string = "questionCreationError";
    public static QUESTION_SAVE_ERROR:string = "questionSaveError";
    
    private _course_activity:Course_Activity;
    public get Course_Activity():Course_Activity
    {
        return this._course_activity;
    }
    
    constructor(type:string, courseActivity:Course_Activity)
    {
        super(type);
        this._course_activity = courseActivity;
    }
}