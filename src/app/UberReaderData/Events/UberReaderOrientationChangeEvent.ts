import { UberApplicationEvent } from './UberApplicationEvent';

export class UberReaderOrientationChangeEvent extends UberApplicationEvent
{
    public static ORIENTATION_CHANGED:string = "orientationChanged";
    
    public static PORTRAIT:string = "portrait";
    public static LANDSCAPE:string = "landscape";
    
    public static CURRENT_ORIENTATION:string = UberReaderOrientationChangeEvent.LANDSCAPE;
    
    private _orientation:string;
    public get Orientation():string
    { 
        return this._orientation;
    }
    
    constructor(type:string, orientation:string)
    {
        super(type);
        UberReaderOrientationChangeEvent.CURRENT_ORIENTATION = orientation;	
        this._orientation = orientation;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new UberReaderOrientationChangeEvent(this.type, this._orientation);
    }
    
}