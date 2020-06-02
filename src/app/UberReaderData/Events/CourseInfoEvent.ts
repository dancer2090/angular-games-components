import { UberApplicationEvent } from './UberApplicationEvent';
import { CourseInfo } from '../DataClasses/other/CourseInfo';

export class CourseInfoEvent extends UberApplicationEvent
{
    public static INFO_RECEIVED:string = "infoReceived";
	public static INFO_FAILED:string = "infoFailed";
    
    public static INFO_USER_DATA_RECEIVED:string = "userDataInfoReceived";
	public static INFO_USER_DATA_FAILED:string = "userDataInfoFailed";

    private _course:CourseInfo;
    public get course():CourseInfo
    {
        return this._course;
    }
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    public constructor(type:string, course:CourseInfo, errMsg:string="")
    {
        super(type);
        this._course = course;			
        this._errMsg = errMsg;
    }
    
    public clone():UberApplicationEvent
    {
        return new CourseInfoEvent(this.type, this._course, this._errMsg);
    }
}