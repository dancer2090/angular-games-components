import { UberApplicationEvent } from './UberApplicationEvent';

import { Prep_Program } from '../DataClasses/db/Prep_Program';

export class AddPrepProgramEvent extends UberApplicationEvent
{
    public static ADD_PROGRAM_SUCCESS:string = "addProgramSuccess";
    public static ADD_PROGRAM_FAILED:string = "addProgramFailed";
    
    private _prep_program:Prep_Program;
    public get Program():Prep_Program
    {
        return this._prep_program;
    }

    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    public constructor(type:string, prepProgram:Prep_Program, errMsg:string="")
    {
        super(type);
        this._prep_program = prepProgram;
        this._errMsg = errMsg;
    }
    
    public clone():UberApplicationEvent
    {
        return new AddPrepProgramEvent(this.type, this._prep_program, this._errMsg);
    }
}