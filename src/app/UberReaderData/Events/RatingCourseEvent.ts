import { UberApplicationEvent } from './UberApplicationEvent';

export class RatingCourseEvent extends UberApplicationEvent
{
    public static RATING_SUCCESSFUL:string = "ratingSuccessful";
    public static RATING_FAILED:string = "ratingFailed";
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    constructor(type:string, errMsg:string="")
    {
        super(type);
        this._errMsg = errMsg;
    }
}