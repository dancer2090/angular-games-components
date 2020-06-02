import { UberApplicationEvent } from './UberApplicationEvent';
import { Prep_Program_Info } from '../DataClasses/other/Prep_Program_Info';
import { ProxyCourse } from '../DataClasses/other/ProxyCourse';

export class ProgramInfoEvent extends UberApplicationEvent
{
    public static INFO_RECEIVED:string = "programInfoReceived";
	public static INFO_FAILED:string = "programInfoFailed";
    
    public static INFO_USER_DATA_RECEIVED:string = "userDataProgramInfoReceived";
	public static INFO_USER_DATA_FAILED:string = "userDataProgramInfoFailed";

    private _program:Prep_Program_Info;
    public get Program():Prep_Program_Info
    {
        return this._program;
    }

    private _courses:ProxyCourse[];
    public get Courses():ProxyCourse[]
    {
        return this._courses;
    }
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    public constructor(type:string, program:Prep_Program_Info, courses:ProxyCourse[], errMsg:string="")
    {
        super(type);
        this._program = program;	
        this._courses = courses;		
        this._errMsg = errMsg;
    }
    
    public clone():UberApplicationEvent
    {
        return new ProgramInfoEvent(this.type, this._program, this._courses, this._errMsg);
    }
}