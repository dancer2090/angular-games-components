import { UberApplicationEvent } from './UberApplicationEvent';

export class NumberEvent extends UberApplicationEvent
{
    public static COURSE_DELETED:string = "courseDeleted";
    public static QUESTION_DELETED:string = "questionDeleted";
    public static QUESTION_GROUP_DELETED:string = "questionDeleted";
    public static COURSE_DELETE_ERROR:string = "courseDeleteError";
    public static QUESTION_DELETE_ERROR:string = "questionDeleteError";
    public static QUESTION_GROUP_DELETE_ERROR:string = "questionDeleteError";
    public static QUESTION_SENTENCE_CHANGED:string = "questionSentenceChanged";
    
    private _value:number;
    public get Value():number
    {
        return this._value;
    }
    
    constructor(type:string, value:number)
    {
        super(type);
        this._value = value;
    }
}