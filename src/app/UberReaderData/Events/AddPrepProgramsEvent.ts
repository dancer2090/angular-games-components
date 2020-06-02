import { UberApplicationEvent } from './UberApplicationEvent';

import { Prep_Program } from '../DataClasses/db/Prep_Program';

export class AddPrepProgramsEvent extends UberApplicationEvent
{
    public static ADD_PROGRAMS_SUCCESS:string = "addProgramsSuccess";
    public static ADD_PROGRAMS_FAILED:string = "addProgramsFailed";
    
    private _prep_programs:Prep_Program[];
    public get Programs():Prep_Program[]
    {
        return this._prep_programs;
    }

    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    public constructor(type:string, prepPrograms:Prep_Program[], errMsg:string="")
    {
        super(type);
        this._prep_programs = prepPrograms;
        this._errMsg = errMsg;
    }
    
    public clone():UberApplicationEvent
    {
        return new AddPrepProgramsEvent(this.type, this._prep_programs, this._errMsg);
    }
}