import { UberApplicationEvent } from './UberApplicationEvent';

export class UserProgressedEvent extends UberApplicationEvent
{
    public static USER_PROGRESSED:string = "userProgressed";
    public static USER_NAVIGATE_TO_COURSE:string = "userNavigateToCourse";
    
    private _currentCourseId:number;
    public get CurretnCourseId():number
    {
        return this._currentCourseId;
    }
    
    private _Sequence_upto:number;
    public get Sequence_upto():number
    {
        return this._Sequence_upto;
    }
    
    constructor(type:string, currentCourseId:number, sequence_upto:number)
    {
        super(type);
        this._currentCourseId = currentCourseId;
        this._Sequence_upto = sequence_upto;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new UserProgressedEvent(this.type, this._currentCourseId, this._Sequence_upto);
    }
}