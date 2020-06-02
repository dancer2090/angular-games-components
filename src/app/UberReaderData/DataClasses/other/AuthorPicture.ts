// import GetImageEvent = com.er.ur.Events.GetImageEvent;
// import StringUtils = com.er.ur.Utils.StringUtils;

// import BitmapData = flash.display.BitmapData;
// import Loader = flash.display.Loader;
// import LoaderInfo = flash.display.LoaderInfo;
// import Event = flash.events.Event;
// import EventDispatcher = flash.events.EventDispatcher;
// import IOErrorEvent = flash.events.IOErrorEvent;
// import ByteArray = flash.utils.ByteArray;

// import Base64Decoder = mx.utils.Base64Decoder;

import { EventDispatcher } from '../../Events/EventDispatcher';
import { UberApplicationEvent } from '../../Events/UberApplicationEvent';

export class AuthorPicture extends EventDispatcher
{
    public static IMAGE_LOADED:string = "imageLoaded";
    
    // private _eventDispatcher : EventDispatcher;
    // private get eventDispatcher() : EventDispatcher
    // {
    //     if (!this._eventDispatcher)
    //     {
    //         this._eventDispatcher = new EventDispatcher(this);
    //     }
    //     return this._eventDispatcher;
    // } 
    // public addEventListener(type:string, listener:Function, useCapture:boolean=false, priority:number=0, useWeakReference:boolean=false):void
    // {
    //     this.eventDispatcher.addEventListener(type, listener, useCapture, priority, useWeakReference);
    // }
    // public removeEventListener(type:string, listener:Function, useCapture:boolean=false):void
    // {
    //     this.eventDispatcher.removeEventListener(type, listener, useCapture);
    // }
    // public dispatchEvent(event:Event):boolean
    // {
    //     return this.eventDispatcher.dispatchEvent(event);
    // }
    // public hasEventListener(type:string):boolean
    // {
    //     return this.eventDispatcher.hasEventListener(type);
    // }
    // public willTrigger(type:string):boolean
    // {
    //     return this.eventDispatcher.willTrigger(type);
    // }
    
    private _user_id:number;
    public get User_Id():number
    {
        return this._user_id;
    }
    
    public set User_Id(id:number)
    {
        this._user_id = id;
    }
        
    private _image_data:string;
    public get ImageData():string
    {
        return this._image_data;
    }
    
    public set ImageData(image:string)
    {
        this._image_data = image;
        
        // if(image && image.length > 0)
        // {
        //     this.authorPicValid();
        // }
    }
    
    // private _image:BitmapData;
    // public get Image():BitmapData
    // {
    //     return this._image;
    // }
    
    // public set Image(image:BitmapData)
    // {
    //     this._image = image;
    // }
    
    public static fromJson(jsonObject:any):AuthorPicture
    {
        var retVal:AuthorPicture = new AuthorPicture();
        retVal.User_Id = jsonObject.User_id;
        retVal.ImageData = jsonObject.Image_Data;
        
        return retVal;
    }
    
    // private authorPicValid():void
    // {
    //     var imageString:string = this.ImageData;
    //     var base64Decoder:Base64Decoder = new Base64Decoder();		
    //     base64Decoder.decode(imageString);
    //     var imageByteArray:ByteArray = base64Decoder.toByteArray()
        
    //     var loader:Loader = new Loader();
    //     loader.contentLoaderInfo.addEventListener(Event.INIT, this.imageLoaded);
    //     loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, this.imageLoadError);
    //     loader.loadBytes(imageByteArray);	
    // }
    
    // private imageLoadError(event:IOErrorEvent):void
    // {
    //     (<LoaderInfo>event.target ).removeEventListener(Event.INIT, this.imageLoaded);
    //     (<LoaderInfo>event.target ).removeEventListener(IOErrorEvent.IO_ERROR, this.imageLoadError);
    //     this.Image = null;
    // }
    
    // private imageLoaded(event:Event):void
    // {
    //     (<LoaderInfo>event.target ).removeEventListener(Event.INIT, this.imageLoaded);
    //     (<LoaderInfo>event.target ).removeEventListener(IOErrorEvent.IO_ERROR, this.imageLoadError);
        
    //     var loaderInfo:LoaderInfo = <LoaderInfo>event.target ;
    //     var bitmapData:BitmapData = new BitmapData(loaderInfo.width, loaderInfo.height, false, 0xFFFFFF);
    //     bitmapData.draw(loaderInfo.loader);
    //     this.Image = bitmapData;
    //     this.dispatchEvent(new UberApplicationEvent(AuthorPicture.IMAGE_LOADED));
    // }
}