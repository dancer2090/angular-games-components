import { UberApplicationEvent } from './UberApplicationEvent';

export class SwitchScreenEvent extends UberApplicationEvent
{
    public static CHANGE_SCREEN:string = "changeScreen";

    private _screen:number;
    public get Screen():number
    {
        return this._screen;
    }
    
    constructor(type:string, screen:number)
    {
        super(type);
        this._screen = screen;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new SwitchScreenEvent(this.type, this._screen);
    }
}