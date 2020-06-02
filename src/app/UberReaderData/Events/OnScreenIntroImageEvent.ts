import { UberApplicationEvent } from './UberApplicationEvent';

export class OnScreenIntroImageEvent extends UberApplicationEvent
{
    public static INTRO_IMAGE_LOADED:string = "introImageLoaded";
    public static INTRO_IMAGE_FAILED:string = "introImageFailed";
    
    constructor(type:string)
    {
        super(type);
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new OnScreenIntroImageEvent(this.type);
    }
    
}