import { UberApplicationEvent } from './UberApplicationEvent';

export class ActivityFinishedEvent extends UberApplicationEvent
{
    public static FINISHED:string = "finished";
    public static STEP_INTO:string = "stepInto";
    
    private _howFast:number;
    public get HowFast():number
    {
        return this._howFast;
    }
    
    private _howWell:number;
    public get HowWell():number
    {
        return this._howWell;
    }
    
    private _resultObjects:any[];
    public get ResultObjects():any[]
    {
        return this._resultObjects;
    }
    
    private _endResultObjects:Object;
    public get EndResultObjects():Object
    {
        return this._endResultObjects;
    }
    
    constructor(type:string, howFast:number, howWell:number, resultObjects:any[], endResultObjects:Object)
    {
        super(type);
        this._howFast = howFast;
        this._howWell = howWell;
        this._resultObjects = resultObjects;
        this._endResultObjects = endResultObjects;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new ActivityFinishedEvent(this.type, this._howFast, this._howWell, this._resultObjects, this._endResultObjects);
    }
}