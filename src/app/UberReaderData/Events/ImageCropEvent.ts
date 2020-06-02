//import BitmapData = flash.display.BitmapData;
import { UberApplicationEvent } from './UberApplicationEvent';

export class ImageCropEvent extends UberApplicationEvent
{
    public static CROP_FINISH:string = "doneCropping";		
    
    // private _imgCrop:BitmapData;
    // public get CroppedImage():BitmapData
    // {
    //     return this._imgCrop;
    // }
    //
    // constructor(type:string, bitmapData:BitmapData)
    // {
    //     super(type);
    //     this._imgCrop = bitmapData;
    // }
    //
    // /*override*/ public clone():UberApplicationEvent
    // {
    //     return new ImageCropEvent(this.type, this._imgCrop);
    // }
}