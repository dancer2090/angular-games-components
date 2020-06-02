import { UberApplicationEvent } from './UberApplicationEvent';
import { Prep_Program } from '../DataClasses/db/Prep_Program';

export class DiscoverProgramEvent extends UberApplicationEvent
{
    public static PROGRAMS_RECEIVED:string = "discoverProgramReceived";
    public static PROGRAMS_FAILED:string = "discoverProgramFailed";
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    private _prep_programs:Prep_Program[];
    public get Programs():Prep_Program[]
    {
        return this._prep_programs;
    }
    
    constructor(type:string, prep_programs:Prep_Program[], errMsg:string="")
		{
        super(type);
        this._prep_programs = prep_programs;
        this._errMsg = errMsg;
    }
    
    public clone():UberApplicationEvent
    {
        return new DiscoverProgramEvent(this.type, this._prep_programs, this._errMsg);
    }
}