import { EventDispatcher } from '../UberReaderData/Events/EventDispatcher';
import { AppSettings } from '../UberReaderData/AppSettings';
import { UberApplication } from '../UberReaderData/UberApplication';
import { StringUtils } from '../UberReaderData/Utils/StringUtils';
import { DictionaryString } from '../UberReaderData/Utils/Dictionary';
import { UberReaderStateData } from './UberReaderStateData';
import { PrepEdSubjectFilter } from '../UberReaderData/Utils/PrepEdSubjectFilter';
import { DevUtils } from '../UberReaderData/DevUtils';

export class DataStorageManager extends EventDispatcher
{
    private static _instance:DataStorageManager;
    private _useLocalStorage:boolean = false;
    
    public static GetInstance():DataStorageManager
    {
        if (DataStorageManager._instance == null)
        {
            DataStorageManager._instance = new DataStorageManager();
        }
        return DataStorageManager._instance;
    }
    
    constructor()
    {
        super();
        
        if (typeof(Storage) !== "undefined")
        {
            this._useLocalStorage = true;
            // Code for localStorage/sessionStorage.
        }
        else
        {
            this._useLocalStorage = false;
            // Sorry! No Web Storage support..
        }
    }

    public GetStorageUserPref(key:string)
    {
        var value = localStorage.getItem(key);
        value = (value != null ? value : "");
        return value;
    }

    public SetStorageUserPref(key:string, value:string)
    {        
        localStorage.setItem(key, value);
    }
    
    private hasDefaultUser:boolean = false;
    private defaultUserType:string = null;
    private defaultUserString:string = null;
    private defaultPassword:string = null;
    private defaultUserGoogleRefreshToken:string = null;
    private defaultUserFacebookAccessToken:string = null;
    private defaultUserAuthenticationID:number = null;
    private defualtUserAuthenticationToken:string = null;
    
    public Restart():void
    {
        DevUtils.ShowTime("DataStorageManager", "Restart");
        this.hasDefaultUser = false;
        this.defaultUserType = null;
        this.defaultUserString = null;
        this.defaultPassword = null;
        this.defaultUserGoogleRefreshToken = null;
        this.defaultUserFacebookAccessToken = null;
        this.defaultUserAuthenticationID = null;
        this.defualtUserAuthenticationToken = null;

        try{
            sessionStorage.clear();
        }catch(err){}
    }

    private _settingsDictionary:DictionaryString<string> = {};
	
    public GetWordSoundUrl(wordText:string):string
    {
        return null;
    }
    
    public HasDefaultUser():boolean
    {
        return !AppSettings.schoolBuild && this.hasDefaultUser;
    }
    
    public GetDefaultUserType():string
    {
        return this.defaultUserType;
    }
    
    public GetDefaultUser():string
    {
        return this.defaultUserString;
    }
    
    public GetDefaultPassword():string
    {
        return this.defaultPassword;
    }
    
    public GetDefaultGoogleRefreshToken():string
    {
        return this.defaultUserGoogleRefreshToken;
    }
    
    public GetDefaultFacebookAccessToken():string
    {
        return this.defaultUserFacebookAccessToken;
    }

    public GetDefaultAuthenticationID():number
    {
        return this.defaultUserAuthenticationID;
    }
    
    public GetDefaultAthenticationToken():string
    {
        return this.defualtUserAuthenticationToken;
    }

    public UpdateDefaultAnonymousLogin(user:string, password:string):void
    {
        if (!AppSettings.schoolBuild && user != null && password != null)
        {
            localStorage.setItem("default_user", "Anonymous\n" + user + "\n" + password);
        }
    }
    
    public UpdateDefaultLogin(user:string, password:string):void
    {   
        //if (!AppSettings.schoolBuild)
        //{
            try {
                localStorage.setItem("default_user", "Email\n" + user + "\n" + password);
                DevUtils.ShowTime("DataStorageManager", "UpdateDefaultLogin");
                //console.log(localStorage);
            }catch(err){}            
        //}
    }
    
    public UpdateDefaultGoogleLogin(googleRefreshToken:string):void
    {
        if (!AppSettings.schoolBuild)
        {
            try{
                localStorage.setItem("default_user", "Google\n" + googleRefreshToken);
            }catch(err){}            
        }
    }
    
    public UpdateDefaultFacebookLogin(facebookAccessToken:string):void
    {
        if (!AppSettings.schoolBuild)
        {
            try{
                localStorage.setItem("default_user", "Facebook\n" + facebookAccessToken);
            }catch(err){}            
        }
    }

    public UpdateDefaultCleverLogin(userId:number, authenticationToken:string):void
    {
        try{
            localStorage.setItem("default_user", "Clever\n" + userId + "\n" + authenticationToken);
        }catch(err){}
    }

    public UpdateDefaultClasslinkLogin(userId:number, authenticationToken:string):void
    {
        try{
            localStorage.setItem("default_user", "Classlink\n" + userId + "\n" + authenticationToken);
        }catch(err){}
    }

    
    public RemoveDefaultLogin(useLogin:boolean = false):void
    {   
        DevUtils.ShowTime("DataStorageManager", "RemoveDefaultLogin");
        if(useLogin)
        {
            this.defaultUserType = "UseLogin";
            try{
                localStorage.setItem("default_user", "UseLogin");
            }catch(err){}
        }
        else
        {
            this.defaultUserType = null;
            try{
                localStorage.removeItem("default_user");
            }catch(err){}            
        }

        this.defaultUserString = null;
        this.defaultPassword = null;
    }
    
    public GetClipBoardData():string
    {
        return "";
        //return <String>Clipboard.generalClipboard.getData(ClipboardFormats.TEXT_FORMAT) ;
    }
    
    public SelectPicture(successFunction:Function):void
    {
        //Select an image
        // var file:File = File.documentsDirectory;
        // var fileFilter:any[] = new Array();
        // fileFilter.push(new FileFilter("Image Files (*.bmp;*.jpg;*.gif;*.png)", "*.bmp;*.jpg;*.gif;*.png"));
        // fileFilter.push(new FileFilter("All Files", "*"));
        // file.browseForOpen("Open", fileFilter);
        // file.addEventListener(Event.SELECT, function(event:Event):void
        // {
        //     var imageFile:File = <File>this.event.target ;
        //     var url:string;
            
        //     if (AppSettings.OsString == AppSettings.OS_MAC)
        //     {
        //         url = imageFile.url;
        //     }
        //     else
        //     {
        //         url = imageFile.nativePath
        //     }
            
        //     var urlLoader:URLLoader = new URLLoader();
        //     urlLoader.dataFormat = URLLoaderDataFormat.BINARY;
        //     urlLoader.addEventListener(Event.COMPLETE, function (event:Event):void
        //     {
        //         var ba:ByteArray = <ByteArray>this.event.currentTarget.data ;
        //         successFunction(ba);
        //     });
        //     urlLoader.load(new URLRequest(url));
            
        // });
    }
    
    public SelectTextDoc(successFunction:Function):void
    {
        //Select an image
        // var file:File = File.documentsDirectory;
        // var fileFilter:any[] = new Array();
        // fileFilter.push(new FileFilter("All supported file types", "*.txt;*.doc;*.docx;*.pdf;*.html;*.htm"));
        // fileFilter.push(new FileFilter("Text Files (*.txt;)", "*.txt"));
        // fileFilter.push(new FileFilter("Word Documnets (*.doc;*.docx;)", "*.doc;*.docx"));
        // fileFilter.push(new FileFilter("PDF Documents (*.pdf;)", "*.pdf"));
        // fileFilter.push(new FileFilter("Web Pages (*.html;*.htm;)", "*.html;*.htm"));
        // fileFilter.push(new FileFilter("All Files", "*"));
        // file.browseForOpen("Open", fileFilter);
        // file.addEventListener(Event.SELECT, function(event:Event):void
        // {
        //     var textDocFile:File = <File>this.event.target ;
        //     var url:string;
            
        //     if (AppSettings.OsString == AppSettings.OS_MAC)
        //     {
        //         url = textDocFile.url;
        //     }
        //     else
        //     {
        //         url = textDocFile.nativePath;
        //     }
            
        //     var urlLoader:URLLoader = new URLLoader();
        //     urlLoader.dataFormat = URLLoaderDataFormat.BINARY;
        //     urlLoader.addEventListener(Event.COMPLETE, function (event:Event):void
        //     {
        //         this.event.target.removeEventListener(this.event.type, arguments.callee);
        //         var ba:ByteArray = <ByteArray>this.event.currentTarget.data ;
        //         successFunction(ba, textDocFile.name);
        //     });
            
        //     urlLoader.load(new URLRequest(url));
        // });
    }
    
    public Init(): void
    {
        DevUtils.ShowTime("DataStorageManager", "Init");
        if (!AppSettings.schoolBuild)
        {
            let lastLogin:string;// = localStorage.getItem("default_user");
            try{
                lastLogin = localStorage.getItem("default_user");
                
            }catch(err){}     
                 
            if (lastLogin != null)
            {
                DevUtils.LogFunction("DataStorageManager", "Init : NOT SCHOOL BUILD : lastLogin", [lastLogin]);
                var splitFields:any[] = lastLogin.split("\n");
                if (splitFields.length > 1)
                {
                    this.defaultUserType = splitFields[0];
                    this.hasDefaultUser = true;
                    
                    if (this.defaultUserType == "Google")
                    {
                        this.defaultUserGoogleRefreshToken = splitFields[1];
                    }
                    else if (this.defaultUserType == "Facebook")
                    {
                        this.defaultUserFacebookAccessToken = splitFields[1];
                    }
                    else if (this.defaultUserType == "Anonymous")
                    {
                        this.defaultUserString = splitFields[1];
                        this.defaultPassword = splitFields[2];
                    }
                    else if (this.defaultUserType == "Email")
                    {
                        this.defaultUserType = "Email";
                        this.defaultUserString = splitFields[1];
                        this.defaultPassword = splitFields[2];
                    }
                    else if (this.defaultUserType == "Clever" || this.defaultUserType == "Classlink")
                    {
                        this.defaultUserAuthenticationID = splitFields[1];
                        this.defualtUserAuthenticationToken = splitFields[2];
                    }
                }
                else if(splitFields.length == 1)
				{
					this.defaultUserType = splitFields[0];
				}
            }
        }

        var settingsString:string;// = localStorage.getItem("settings");
        try{
            settingsString = localStorage.getItem("settings");
        }catch(err){}

        if (settingsString != null)
        {
            var settingsArray:string[] = settingsString.split("\s+");
            for (var settingLine of settingsArray)
            {
                var settingSplit:string[] = StringUtils.TrimString(settingLine).split("=");
                this._settingsDictionary[settingSplit[0]] = settingSplit[1];
            }
        }
    }
    
    public GetSetting(key:string):string
    {
        return this._settingsDictionary[key];
    }
    
    public SetSetting(key:string, value:string):void
    {
        this._settingsDictionary[key] = value;
        
        var settingsString:string = "";
        for (var key in this._settingsDictionary)
        {
            settingsString += key + "=" + this._settingsDictionary[key] + "\n";
        }
        settingsString = settingsString.substr(0, settingsString.length - 1);
        
        try{
            localStorage.setItem("settings", settingsString);
        }catch(err){}            
    }

    public GetCourseDeviceFilePath(filename:string):string
    {
        var url:string = "";
        // var file:File = AppDataDir.resolvePath(filename);			
        // if(file && file.exists)
        // {
        //     url = new File(file.nativePath).url;
        // }
        
        return url;
    }

    public GetLastState():any
    {
        let lastState:string;        
        try{
            lastState = sessionStorage.getItem("last_state");
        }catch(err){}    
         
        if(lastState != null)
        {
            return JSON.parse(lastState);
        }

        return null;    
    }

    public UpdateLastState(state:any):void
    {
        try{            
                sessionStorage.setItem("last_state", JSON.stringify(state));
        }catch(err){}    
    }

    public UpdateLastPrepEdSubjectFilter(filter: PrepEdSubjectFilter): void {
        try {
            if(filter){
                sessionStorage.setItem("subject_filter", JSON.stringify(filter));            
            }                
            else {
                try{
                    sessionStorage.clear();
                }catch(err){}
            }

        }catch(err){}
    }   

    public GetSubjectFilter(): PrepEdSubjectFilter
    {
        let filter:string;        
        try{
            filter = sessionStorage.getItem("subject_filter");
        }catch(err){}    
         
        if(filter != null)
        {
            return JSON.parse(filter);
        }

        return null;    
    }
}