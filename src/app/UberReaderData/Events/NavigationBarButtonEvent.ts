import { UberApplicationEvent } from './UberApplicationEvent';

export class NavigationBarButtonEvent extends UberApplicationEvent
{
    public static BUTTON_BAR_CLICKED:string = "buttonBarClicked";
    
    private _view:number
    public get View():number
    {
        return this._view;
    }
    
    constructor(type:string, view:number)
    {
        super(type);
        this._view = view;
    }
    
    public clone():UberApplicationEvent
    {
        return new NavigationBarButtonEvent(this.type, this._view);
    }
}