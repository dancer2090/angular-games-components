import { UberApplicationEvent } from './UberApplicationEvent';

export class CourseIntroEvent extends UberApplicationEvent
{
    public static IMAGE_LOADED:string = "imageLoadedSuccess";
    public static IMAGE_FAILED:string = "imageLoadedFailed";
    
    private _imageVector:any[];
    public get ImageVector():any[]
    {
        return this._imageVector;
    }
    
    private _errorMsg:string;
    public get ErrorMessage():string
    {
        return this._errorMsg;
    }
    
    constructor(type:string, imageVector:any[], errorMsg:string="")
    {
        super(type);			
        this._imageVector = imageVector;	
        this._errorMsg = errorMsg;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new CourseIntroEvent(this.type, this._imageVector, this._errorMsg);
    }
}