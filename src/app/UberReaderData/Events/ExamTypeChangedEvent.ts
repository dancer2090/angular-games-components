import { UberApplicationEvent } from './UberApplicationEvent';

export class ExamTypeChangedEvent extends UberApplicationEvent
{
    private _exam_type:any;
    public get Exam_type():any
    {
        return this._exam_type;
    }
    
    public static EXAM_TYPE_CHANGED:string = "examTypeChanged";
    
    constructor(type:string, exam_type:any)
    {
        super(type);
        this._exam_type = exam_type;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new ExamTypeChangedEvent(this.type, this._exam_type);
    }
}