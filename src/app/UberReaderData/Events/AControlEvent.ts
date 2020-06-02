import { UberApplicationEvent } from './UberApplicationEvent';

export class AControlEvent extends UberApplicationEvent
{
    public static ACONTROL_CHANGED:string = "controlChanged";
    
    private _required_restart:boolean;
    public get Required_restart():boolean
    {
        return this._required_restart;
    }
    
    private _functionName:string;
    public get FunctionName():string
    {
        return this._functionName;
    }
    
    private _controlRef:string;
    public get ControlRef():string
    {
        return this._controlRef;
    }
    
    private _value:string;
    public get Value():string
    {
        return this._value;
    }
    
    private _saveSettings:boolean;
    public get SaveSettings():boolean
    {
        return this._saveSettings;
    }
    
    constructor(type:string, functionName:string, controlRef:string, value:string, saveSettings:boolean, required_restart:boolean)
    {
        super(type);
        this._functionName = functionName;
        this._controlRef = controlRef;
        this._value = value;
        this._saveSettings = saveSettings;
        this._required_restart = required_restart;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new AControlEvent(this.type, this._functionName, this._controlRef, this._value, this._saveSettings, this._required_restart);
    }
    
}