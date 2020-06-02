import { UberApplicationEvent } from './UberApplicationEvent';

export class MobileSideMenuEvent extends UberApplicationEvent
{
    public static SIDE_MENU_TRIGGER:string = "sideMenuTrigger";
    
    private _trigger:string;
    public get Trigger():string
    {
        return this._trigger;
    }
    
    private _animate:boolean = true;
    public get Animate():boolean
    {
        return this._animate;
    }
    
    constructor(type:string, trigger:string, anim:boolean = true)
    {
        super(type);
        this._trigger = trigger;
        this._animate = anim;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new MobileSideMenuEvent(this.type, this._trigger, this._animate);
    }
    
}