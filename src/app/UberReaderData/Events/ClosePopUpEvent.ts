import { UberApplicationEvent } from './UberApplicationEvent';

export class ClosePopUpEvent extends UberApplicationEvent
{
    public static CLOSE:string = "closeDialog";
    
    public static OK:string = "closeOk";
    public static CANCEL:string = "closeCancel";
    public static EXTRA:string = "extraButtonEvent";
    
    public detail:string;

    private _params:any;
    public get Params():any
    {
        return this._params;
    }
    
    constructor(type:string, d:string="closeCancel", params:any = null)
    {
        super(type);
        this.detail = d;
		this._params = params;
    }
}