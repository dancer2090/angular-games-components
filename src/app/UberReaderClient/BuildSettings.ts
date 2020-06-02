import { AppSettings } from '../UberReaderData/AppSettings';

//import Resources.ProductIconResources.UltimateTypingIcons;

export class BuildSettings
{
    /** TYPESY SETTINGS **/
    public static ProducDataVersion:string = "2020-04-24";
    public static ClientType:number = AppSettings.ANGULAR;
    public static DeviceDebugType:number = AppSettings.WEB;
    public static ClientVersion:string = "2020.3.0.1";
    public static productId:number = AppSettings.TYPESY;

    /** PREPED SETTINGS **/
    /*
    public static ProducDataVersion:string = "2018-01-29";
    public static ClientType:number = AppSettings.WEB;
    public static DeviceDebugType:number = AppSettings.WEB;
    public static ClientVersion:string = "2018.1.1";
    public static productId:number = AppSettings.PREP_ED;
    */
    
    public static EnableDebugWindow:boolean = false;
    public static schoolBuild:boolean = false;
    public static useMediaFolder:boolean = false; //keep this false in production
    
    //public static useDistributionAssetsFolder:boolean = true;
    public static isLocalBuild:boolean = true; // set to true if local build; false if test or live build
    public static isDevBuild:boolean = false; // set to true if test build; false if live build
    public static isAppStoreBuild:boolean = false;
    public static trialEnabled:boolean = false;
	public static allowAnonymousLogin:boolean = false;
    public static useCDN:boolean = false;
    public static trackEvents:boolean = true;

    public static prepEdProduct:string = AppSettings.PREP_ED_GRE_STRING;
    /***
     * IPAD
     * SPREEDER - IPADSPREEDERTRIAL1
     * TYPESY - TYPESYTRIAL1
     */
    
    /***
     * DESKTOP WEB
     * TYPESY - TYPESYTRIAL1
     */
    public static TrialKey:string = null;

    public static toJson(): any {
        let keys = Object.keys(this);
        let settings: any = {};
        for (let key of keys) {            
            settings[key] = this[key];
        }        
        return settings;
    }    
}