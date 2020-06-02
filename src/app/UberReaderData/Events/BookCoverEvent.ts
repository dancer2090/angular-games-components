import { UberApplicationEvent } from './UberApplicationEvent';

export class BookCoverEvent extends UberApplicationEvent
{
    public static IMAGE_LOADED:string = "bookImageLoadedSuccess";
    public static IMAGE_FAILED:string = "bookImageLoadedFailed";
    
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
        return new BookCoverEvent(this.type, this._imageVector, this._errorMsg);
    }
}