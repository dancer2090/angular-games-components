import { UberApplication } from '../../UberApplication';

import { User_Text } from '../db/User_Text';
import { Text } from '../db/Text';
import { User } from '../db/User';
import { StringUtils } from '../../Utils/StringUtils';
import { UberApplicationEvent } from '../../Events/UberApplicationEvent';
import { UberApplicationEventTypes } from '../../Events/UberApplicationEventTypes';

// import BookCoverEvent = com.er.ur.Events.BookCoverEvent;
// import GetImageEvent = com.er.ur.Events.GetImageEvent;
// import ImageCropEvent = com.er.ur.Events.ImageCropEvent;
// import UberApplicationEvent = com.er.ur.Events.UberApplicationEvent;
// import AlertDialog = com.er.ur.UberReader.Dialogs.AlertDialog;
// import ImageCropDialog = com.er.ur.UberReader.Dialogs.ImageCropDialog;
// import UberReaderDataAccessFactory = com.er.ur.UberReaderData.UberDataAccess.UberReaderDataAccessFactory;
// import Text = com.er.ur.UberReaderData.db.Text;
// import User = com.er.ur.UberReaderData.db.User;
// import User_Text = com.er.ur.UberReaderData.db.User_Text;
// import BitmapUtils = com.er.ur.Utils.BitmapUtils;
// import StringUtils = com.er.ur.Utils.StringUtils;


// import BitmapData = flash.display.BitmapData;
// import Loader = flash.display.Loader;
// import LoaderInfo = flash.display.LoaderInfo;
// import Event = flash.events.Event;
// import IOErrorEvent = flash.events.IOErrorEvent;
// import URLRequest = flash.net.URLRequest;
// import Security = flash.system.Security;
// import ByteArray = flash.utils.ByteArray;
// import setTimeout = flash.utils.setTimeout;

// import PopUpManager = mx.managers.PopUpManager;
// import Base64Decoder = mx.utils.Base64Decoder;
// import Base64Encoder = mx.utils.Base64Encoder;

export class UserData
{
    private _model:UberApplication;
    
    //private var _current_text:Text;
    public get CurrentText():Text
    {
        return this._model.GetCurrentText();
        //return _current_text;
    }
    public set CurrentText(value:Text)
    {   
        if (value.Wordlist_id != null) {
            this._model.SetCurrentText(value);
            this._current_text_sentence = 0;                        
            this._model.UpdateUserPref("current_text_counter", "0", true);
            
            if (value.IsVocabText) {
                this._model.UpdateUserPref("current_text_id", "w_" + value.Wordlist_id.toString() + "_v", true);
            }
            else {
                this._model.UpdateUserPref("current_text_id", "w_" + value.Wordlist_id.toString() + "_s", true);
            }
            
            this._model.UpdateUserPref("current_text_sentence", this._current_text_sentence.toString(), true);
        }
        else {
            this._model.SetCurrentText(value);
            this._current_text_sentence = 0;                        
            this._model.UpdateUserPref("current_text_counter", "0", true);
            this._model.UpdateUserPref("current_text_id", value.Text_id.toString(), true);
            this._model.UpdateUserPref("current_text_sentence", this._current_text_sentence.toString(), true);            
            var userText:User_Text = this._model.GetUserText(value.Text_id);
            userText.Show_in_library = true;
            this._model.UpdateUserText(value.Text_id, true);
        }
        this._model.dispatchEvent(new UberApplicationEvent(UberApplicationEventTypes.CURRENT_TEXT_CHANGED));
    }
    
    private _current_text_sentence:number;
    public get CurrentTextSentence():number
    {
        return this._current_text_sentence;
    }
    public set CurrentTextSentence(value:number)
    {
        this._current_text_sentence = value;
        this._model.UpdateUserPref("current_text_sentence", this._current_text_sentence.toString(), true);
    }
    
    public get DisplayName():string
    {
        var displayName:string = this._model.GetUserPref("display_name");

        displayName = displayName.replace("[First Name]", this._model.CurrentUser.First_name);
        displayName = displayName.replace("[Last Name]", this._model.CurrentUser.Last_name);
        displayName = displayName.replace("[Username]", this._model.CurrentUser.Username);

        if (displayName == 'null' || displayName.length == 0)
        {
            displayName = this._model.CurrentUser.First_name;
            //displayName = _model.CurrentUser.First_name + " " + _model.CurrentUser.Last_name;
        }
        
        return displayName;
    }
    
    public get DisplayNamePosessive():string
    {
        var displayName:string = this.DisplayName;
        
        if (StringUtils.endsWith(displayName, "s") || StringUtils.endsWith(displayName, "S"))
        {
            displayName =  displayName + "'";
        }
        else
        {
            displayName =  displayName + "'s";
        }
        
        return displayName;
    }
    
    private _current_wordlist_id:number;
    public get Current_wordlist_id():number
    {
        return this._current_wordlist_id;
    }
    public set Current_wordlist_id(value:number)
    {
        this._current_wordlist_id = value;
    }
    private _aux_wordlist_id:number;
    public get Aux_wordlist_id():number
    {
        return this._aux_wordlist_id;
    }
    public set Aux_wordlist_id(value:number)
    {
        this._aux_wordlist_id = value;
    }
    private _current_word_id:number;
    public get Current_word_id():number
    {
        return this._current_word_id;
    }
    public set Current_word_id(value:number)
    {
        this._current_word_id = value;
    }
    
    
    protected _goal_1:number;
    public get Goal_1():number
    {
        return this._goal_1;
    }
    public set Goal_1(value:number)
    {
        this._goal_1 = value;
    }
    
    protected _goal_2:number;
    public get Goal_2():number
    {
        return this._goal_2;
    }
    public set Goal_2(value:number)
    {
        this._goal_2 = value;
    }
    
    public get ProfilePictureUrl():string
    {
        // if (this._model.CurrentUser.FacebookUser)
        // {
        //     return FacebookAccessor.ProfilePictureURL;
        // }
        /*else */if (this._model.CurrentUser.GoogleUser)
        {
            return this._model.CurrentUser.Profile_pic;//GoogleAccessor.ProfilePictureURL;
        }
        else if (this._model.CurrentUser.Profile_pic != null && this._model.CurrentUser.Profile_pic.length > 0)
        {
            return this._model.GetUserProfileFolder() + this._model.CurrentUser.Profile_pic;
        }
        else
        {
            return null;
        }
    }
    
    public RefreshProfilePic():void
    {
        var profilePicUrl:string = this.ProfilePictureUrl;
        this._model.ProfilePicLoaded();
    }
    
    // private profilePicReceived(event:GetImageEvent):void
    // {
    //     event.target.removeEventListener(GetImageEvent.GET_PROF_IMAGE_SUCCESS, this.profilePicReceived);
    //     event.target.removeEventListener(GetImageEvent.GET_PROF_IMAGE_FAILED, this.profilePicFailed);
        
    //     var imageString:string = event.ImageString;
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
    // }
    // private imageLoaded(event:Event):void
    // {
    //     (<LoaderInfo>event.target ).removeEventListener(Event.INIT, this.imageLoaded);
    //     (<LoaderInfo>event.target ).removeEventListener(IOErrorEvent.IO_ERROR, this.imageLoadError);
        
    //     var loaderInfo:LoaderInfo = <LoaderInfo>event.target ;
    //     var bitmapData:BitmapData = new BitmapData(loaderInfo.width, loaderInfo.height, false, 0xFFFFFF);
    //     bitmapData.draw(loaderInfo.loader);
    //     this._profileImageData = bitmapData;
        
    //     this._model.ProfilePicLoaded();
    // }
    
    // private profilePicFailed(event:GetImageEvent):void
    // {
    //     event.target.removeEventListener(GetImageEvent.GET_PROF_IMAGE_SUCCESS, this.profilePicReceived);
    //     event.target.removeEventListener(GetImageEvent.GET_PROF_IMAGE_FAILED, this.profilePicFailed);
        
    //     //setTimeout(RefreshProfilePic, 10000); //attempt again in next 10 seconds
    // }
    
    // private _loadedImageUrl:string;
    // private _profileImageData:BitmapData;
    // public get ProfileImageData():BitmapData
    // {
    //     return this._profileImageData;
    // }
    
    // private _logoImageData:BitmapData;
    // public get LogoImageData():BitmapData
    // {
    //     return this._logoImageData;
    // }
    
    // public set LogoImageData(value:BitmapData)
    // {
    //     this._logoImageData = value;
    // }
    
    constructor(user:User)
    {
        this._model = UberApplication.GetInstance();
        if (this._model.CurrentProduct.DisplayText)
        {
            var current_text_id:string = this._model.GetUserPref("current_text_id");
            if (current_text_id == "")
            {
                this._model.SetCurrentText(null);
                //_current_text = null;
            }
            else
            {
                //_current_text = _model.GetCurrentText();
                this._current_text_sentence = parseInt(this._model.GetUserPref("current_text_sentence"));
            }
        }
        if (this._model.CurrentProduct.DisplayVocab)
        {
            this._current_wordlist_id = parseInt(this._model.GetUserPref("current_wordlist_id"));
            this._aux_wordlist_id = parseInt(this._model.GetUserPref("aux_wordlist_id"));
            this._current_word_id = parseInt(this._model.GetUserPref("current_word_id"));
        }
        this._goal_1 = parseInt(this._model.GetUserPref("goal_1"));
        this._goal_2 = parseInt(this._model.GetUserPref("goal_2"));
        
        // if (this._model.CurrentUser.FacebookUser)
        // {
        //     FacebookAccessor.getProfilePic(function profilePicResponse(response:any, fail:any=null):void
        //     {
        //         /*if (response && response.data && response.data.url)
        //         {
        //             FacebookAccessor.ProfilePictureURL = response.data.url;
        //             RefreshProfilePic();
        //         }*/
        //         if(this.response != null)
        //         {
        //             FacebookAccessor.ProfilePictureURL = this.response.url;
        //             this.RefreshProfilePic();
        //         }
        //     });
            
        //     FacebookAccessor.getProductPic(function productPicResponse(response:any, fail:any=null):void
        //     {
        //         /*if (response && response.data && response.data.url)
        //         {
        //         FacebookAccessor.ProfilePictureURL = response.data.url;
        //         RefreshProfilePic();
        //         }*/
        //         if(this.response != null)
        //         {
        //             FacebookAccessor.ProductPictureURL = this.response.url;
        //             this.RefreshProfilePic();
        //         }
        //     });
        // }
        // else
        // {
        //this.RefreshProfilePic();
        // }
    }
}