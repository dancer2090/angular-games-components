import { UberApplicationEvent } from './UberApplicationEvent';

export class GetImageEvent extends UberApplicationEvent
{
    public static GET_IMAGE_SUCCESS:string = "GetImageSuccess";
    public static GET_IMAGE_FAILED:string = "GetImageFailed";
    
    public static GET_PROF_IMAGE_SUCCESS:string = "GetProfileImageSuccess";
    public static GET_PROF_IMAGE_FAILED:string = "GetProfileImageFailed";
    
    private _imageString:string;
    public get ImageString():string
    {
        return this._imageString;
    }
    
    constructor(type:string, imageString:string)
    {
        super(type);
        this._imageString = imageString;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new GetImageEvent(this.type, this._imageString);
    }
}