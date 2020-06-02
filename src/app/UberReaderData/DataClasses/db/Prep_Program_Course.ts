export class Prep_Program_Course
{
    private _prep_program_course_id:number;
    public set Prep_program_course_id(val:number)
    {
        this._prep_program_course_id = val;
    }
    public get Prep_program_course_id():number
    {
        return this._prep_program_course_id;
    }

    private _prep_program_id:number;
    public set Prep_program_id(val:number)
    {
        this._prep_program_id = val;
    }
    public get Prep_program_id():number
    {
        return this._prep_program_id;
    }

    private _course_id:number;
    public set Course_id(val:number)
    {
        this._course_id = val;
    }
    public get Course_id():number
    {
        return this._course_id;
    }

    private _sequence:number;
    public set Sequence(val:number)
    {
        this._sequence = val;
    }
    public get Sequence():number
    {
        return this._sequence;
    }

    public static fromJson(jsonObject:any):Prep_Program_Course
    {
        var retVal:Prep_Program_Course = new Prep_Program_Course();

        retVal.Prep_program_course_id = jsonObject.Prep_program_course_id;
        retVal.Prep_program_id = jsonObject.Prep_program_id;
        retVal.Course_id = jsonObject.Course_id;
        retVal.Sequence = jsonObject.Sequence;

        return retVal;
    }
}