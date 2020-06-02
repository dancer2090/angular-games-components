import { StringUtils } from './Utils/StringUtils';
import { BuildSettings } from '../UberReaderClient/BuildSettings';

export class AppSettings
{
    public static ULTIMATE_VOCABULARY:number = 1;
    public static ULTIMATE_SPELLING:number = 2;
    public static SPEED_READING:number = 3;
    public static ULTIMATE_MEMORY:number = 4;
    public static ULTIMATE_TYPING:number = 5;		
    // used for populating list texts table
    public static ALL_PRODUCTS:number = 7;
    public static PREP_ED:number = 8;
    public static PREP_ED_GRE_VOCAB:number = 9;
    public static PREP_ED_SAT_VOCAB:number = 10;
    public static TYPESY:number = 11;
    public static SPREEDER:number = 12;
    public static SPEED_READING_2:number = 13;
    public static SPREEDER_2:number = 14;
    
    /*private static const UT_TRIAL_ACCOUNT_KEY:string = "UTTRIALACC";
    private static const UV_TRIAL_ACCOUNT_KEY:string = "UVTRIALACC";
    private static const US_TRIAL_ACCOUNT_KEY:string = "USTRIALACC";
    private static const SR_TRIAL_ACCOUNT_KEY:string = "7SR1";
    private static const TYPESY_TRIAL_ACCOUNT_KEY:string = "TYPESYTRIAL1";
    private static const SPREEDER_TRIAL_ACCOUNT_KEY:string = "IPADSPREEDERTRIAL1";*/
    
    public static PREP_ED_GRE_STRING:string = "GRE";
	public static PREP_ED_SAT_STRING:string = "SAT";
	public static PREP_ED_GMAT_STRING:string = "GMAT";

    public static PREP_MODULE_TERM:string = "Targeted Prep";
    public static PREP_MODULE_PLURAL_TERM:string = "Targeted Preps";
    public static PREP_PROG_TERM:string = "Full Course";
    public static PREP_PROG_PLURAL_TERM:string = "Full Courses";
    
    public static DESKTOP:number = 1;
    public static WEB:number = 2;
    public static IPAD:number = 3;
    public static IPHONE:number = 4;
    public static ANGULAR:number = 5;
    public static IPAD_ANGULAR: number = 6;
    public static ANDROID_ANGULAR: number = 7;
    /*public static var iosDebugType:int = 3;*/
    
    public static OS_MAC:string = "mac";
    public static OS_WIN:string = "win";
    
    public static FacebookAppId:string;
    
    //public static var GoogleAppId:string = "868979525443-f6knike4mifnblb090kkito3ud53nmhe.apps.googleusercontent.com";
    //public static var GoogleAppSecret:string = "w8pl9wAIHbC0vGKc7iQVdWar";
    
    //DESKTOP
    public static GoogleAppId:string = "211695439936-sreackt85coaj7ef3v562fh25mokh93q.apps.googleusercontent.com";
    //public static GoogleAppSecret:string = "vf99U4IsTG9qCq7y-5oBXLhN";
    public static GoogleAPIKey:string = "";
    
    //WEB
    //public static var GoogleAppId:string = "871381777261-mmqhm8vu4rve2kj3eubinci90ks5r9tq.apps.googleusercontent.com";
    //public static var GoogleAppSecret:string = "vf99U4IsTG9qCq7y-5oBXLhN";

    //CLEVER
    public static CleverLocalTestRedirectURI:string = "http://localhost:3000/edu";
    public static CleverTestRedirectURI:string = "https://www.typesy.com/apps/test2/edu";
    public static CleverLiveRedirectURI:string = "https://www.typesy.com/type/edu";
    public static CleverTestClientID:string = "ab5c2dcec778683165f5";
    public static CleverLiveClientID:string = "28d106d0e7b595bfd34e";    

    //CLASSLINK
    public static ClasslinkLocalRedirectURI:string = "http://localhost:3000/edu?login_type=classlink";
    public static ClasslinkTestRedirectURI:string = "https://www.typesy.com/apps/test2/edu?login_type=classlink";
    public static ClasslinkLiveRedirectURI:string = "https://www.typesy.com/type/edu?login_type=classlink";
    public static ClasslinkLocalClientID:string = "c153725578186628ccab288df6178a0d64725362797463";
    public static ClasslinkLiveClientID:string = "c1542759062160a96e2d1a69ecd0ffb3c46a8bbc57af4b";

    //ZOHO
    /* public static ZohoLocalRedirectURI:string = "http://localhost:3000";
    public static ZohoLiveRedirectURI:string = "https://www.typesy.com";
    public static ereflectOrgZohoID:string = "642097315";
    public static typesyEDUDeptID:string = "172636000006254041";
    public static ZohoDeskLiveClientID:string = "1000.VMMLK0S1DYUU556542MYUGGO0OS2FU";
    public static ZohoDeskLiveClientSecret:string = "47a43b1a26c3c20e0010228d8e852ae8f2e7447bc6";
    public static ZohoDeskLocalClientID:string = "1000.3VV3LEOWL25Y45334MPG8V9ZMYV7XH";
    public static ZohoDeskLocalClientSecret:string = "433f35b868e87b5854f8cf83d60833bd8706531770"; */

    public static abbreviationsList:string[] = new Array<string>();
    public static activityUsingEmbedFonts:boolean = false;
    public static requiresKeyboard:boolean = false;
    public static useActivationCode:boolean = true;
	public static useLoginProfilePicture:boolean = true;    
    
    public static SECTION_SIZE_SMALL:number = 1000;
    public static SECTION_SIZE_MEDIUM:number = 2000;
    public static SECTION_SIZE_LARGE:number = 3000;
    
    public static WEB_MEDIA:string = "web";
    public static LOCAL_MEDIA:string = "local";
    
    //following all set from BuildSettings
    public static CurrentProductId:number;
    /*[Bindable]*/public static ClientType:number;
    public static ClientVersion:string;
    public static ProductDataVersion:string;
    public static TrialEnabled:boolean = false;
    public static TrackEvents:boolean = true;
            
    /*[Bindable]*/
    public static appScale:number = 1.0;
    public static supportedDPIs:any[] = [160, 240, 320];
    
    public static  applicationDPI:number = 160;
    
    /*[Bindable]*/
    public static profilePictureSize:number = 155;
    public static textAction:string = "Play";
    public static useTrainingHelp:boolean = true;
    public static GetClientVersionCalculated():number
    {
        var versionNumberValues:string[] = AppSettings.ClientVersion.split(".");
        var yearNum:number = parseInt(versionNumberValues[0]);
        var majorVersionNum:number = parseInt(versionNumberValues[1]);
        var minorVersionNumber:number = 0;
        if (versionNumberValues.length > 2)
        {
            minorVersionNumber = parseInt(versionNumberValues[2]);
        }
        var clientVersionNumber:number = (yearNum - 2000) * 1000 + (majorVersionNum * 100) + minorVersionNumber;
        
        return clientVersionNumber;
    }
    
    public static PasswordMinLength:number = 6;
    public static PasswordMaxLength:number = 40;
    
    public static GetClientTypeString():string
    {
        switch (AppSettings.ClientType)
        {
            case (AppSettings.DESKTOP):
                return "DESKTOP";
            case (AppSettings.WEB):
                return "WEB";
            case (AppSettings.IPAD):
                return "IPAD";
            case (AppSettings.IPHONE):
                return "IPHONE";
            case (AppSettings.ANGULAR):
                return "ANGULAR";
            case (AppSettings.IPAD_ANGULAR):
                return "IPA_ANG";
            case (AppSettings.ANDROID_ANGULAR):
                return "AND_ANG";
            default:
                return "default";
        }
    }
    public static EnableDebugWindow:boolean;
    //public static var UseRemoteDataAccessor:boolean;
    //public static var onLocalNetwork:boolean;
    public static schoolBuild:boolean;
    public static useMediaFolder:boolean;
    //public static useDistributionFolder:boolean = false;
    public static allowAnonymousLogin:boolean = false;
    //public static const useRemoteProcedureCalls:boolean = true;
    
    public static useCDN:boolean = true;

    public static PREPED_ASSET_LOCATION:string = "https://resources.ereflect.com/PrepEd/webApp/";
    //public static TYPESY_ASSET_LOCATION:string = "https://resources.ereflect.com/Typesy/webApp/";
    public static TYPESY_ASSET_LOCATION:string = "https://resources2.ereflect.com/appfiles/";

    public static CDNAssetLocation:string = AppSettings.PREPED_ASSET_LOCATION;

    public static inAppPurchaseBuild:boolean;
    
    public static MediaDirectory:string = "Media/";
    //public static const wikiServiceUrl:string = "http://www.ereflect.com/DotNetWikiService/DotNetWikiService.asmx?wsdl";
    
    public static UpdateURL:string = "https://www.ereflect.com/uberreaderupdate.xml";

    //public static const UserResroucesURL:string = "http://www.ereflect.com/UberDataResources/";
    //public static UserResroucesURL:string = "http://storage.ereflect.com/uberdataresources/";
    //public static UserResourcesURL:string = "https://www.preped.com/images/";
    public static UserResourcesURL:string = "https://resources.ereflect.com/users/";
    
    /*public static var menuLogo:Class;*/
    
    public static CharCode_a:number = "a".charCodeAt(0);
    public static CharCode_z:number = "z".charCodeAt(0);
    
    public static dockIcon:string;
    public static systemTrayIcon:string;
    
    public static ProductName:string;
    public static ShortProductName:string;	
    public static TrialKey:string;
    public static UpfrontPurchaseBuild:boolean = false;    
    public static RecommendGoalsActivityId:number = -1;
    public static PrepEdProduct:string = "";

    public static ShowSignUp:boolean = false;
    
    public static Init(productId:number, enableDebugWindow:boolean, isSchoolBuild:boolean, usingMediaFolder:boolean, isIUnAppPurchaseBuild:boolean, 
                                clientType:number, clientVersion:string, trialEnabled:boolean, DeviceDebugType:number, trialKey:string, prepEdProduct:string,
                                anonymousLogin:boolean, useCDNResources, productDataVersion:string, trackEvents:boolean):void
    {
        //AppSettings.applicationDPI = FlexGlobals.topLevelApplication.applicationDPI;
        AppSettings.applicationDPI = 160;
        
        AppSettings.CurrentProductId = productId;
        AppSettings.EnableDebugWindow = enableDebugWindow;
        AppSettings.useMediaFolder = usingMediaFolder;
        AppSettings.schoolBuild = isSchoolBuild;
        AppSettings.inAppPurchaseBuild = isIUnAppPurchaseBuild;
        //AppSettings.ClientType = clientType == AppSettings.IPAD ? AppSettings.IOSType(DeviceDebugType) : clientType;
        AppSettings.ClientType = clientType;
        AppSettings.ClientVersion = clientVersion;
        AppSettings.TrialEnabled = trialEnabled;
        AppSettings.TrialKey = trialKey;
        AppSettings.PrepEdProduct = prepEdProduct;
        AppSettings.allowAnonymousLogin = anonymousLogin;
        AppSettings.useCDN = useCDNResources;
        AppSettings.ProductDataVersion = productDataVersion;
        //AppSettings.useDistributionFolder = distributionFolder;
        AppSettings.TrackEvents = trackEvents;
        
        AppSettings.abbreviationsList.push("dr", "mr", "mrs", "ms");
        
        switch (productId)
        {
            case (AppSettings.ULTIMATE_VOCABULARY):
                AppSettings.ProductName = "Ultimate Vocabulary";
                AppSettings.dockIcon = "icons/UltimateVocabularyIcons/uv_128x128.png";
                AppSettings.systemTrayIcon = "icons//UltimateVocabularyIcons//uv_16x16.png";
                AppSettings.FacebookAppId = "734431579950810";
                //TrialKey = UV_TRIAL_ACCOUNT_KEY;
                AppSettings.useTrainingHelp = true;
                //UpdateURL = "http://www.ereflect.com/UltimateVocabularyCloudUpdate.xml";
                
                if (clientType == AppSettings.WEB)
                {
                    AppSettings.GoogleAppId = "268758093830-ulkf3go5h1t2umh6q4gkfqnli6d0ca7t.apps.googleusercontent.com";
                    //fwX6VTJWUxqKzB1mN8DEFIo5
                }
                else if (clientType == AppSettings.DESKTOP || clientType == AppSettings.IPAD)
                {
                    AppSettings.GoogleAppId = "268758093830-j23a5vrc8kunj26frqhep5g2c3nmgj0d.apps.googleusercontent.com";
                    //AppSettings.GoogleAppSecret = "sROgKRuilAsxeQ3IjBToscGW";
                }
                break;
            case (AppSettings.ULTIMATE_SPELLING):
                AppSettings.ProductName = "Ultimate Spelling";
                
                AppSettings.dockIcon = "icons/UltimateSpellingIcons/us_128x128.png";
                AppSettings.systemTrayIcon = "icons//UltimateSpellingIcons//us_16x16.png";	
                AppSettings.FacebookAppId = "618270984912603";
                //TrialKey = US_TRIAL_ACCOUNT_KEY;
                AppSettings.useTrainingHelp = true;
                //UpdateURL = "http://www.ultimatespelling.com/ultimatespellingupdate.xml";	
                
                if (clientType == AppSettings.WEB)
                {
                    AppSettings.GoogleAppId = "583189769240-a76b0dr663d4uac5d94sbo7t3u8gvra0.apps.googleusercontent.com";
                    //_ZGL-Y2JVNqCQ83LQlIeE5LJ
                }
                else if (clientType == AppSettings.DESKTOP || clientType == AppSettings.IPAD)
                {
                    AppSettings.GoogleAppId = "583189769240-lrdnnoucgokn062q3b1r0imlvdni726p.apps.googleusercontent.com";
                    //AppSettings.GoogleAppSecret = "mOIOuyHAvuj60rWBl4d0exDm";
                }
                break;
            case (AppSettings.ULTIMATE_TYPING):
                AppSettings.ProductName = "Ultimate Typing";
                AppSettings.activityUsingEmbedFonts = true;
                //menuLogo = ResourceClasses.ultimatetyping_logo;
                
                AppSettings.dockIcon = "icons/UltimateTypingIcons/ut_128x128.png";	
                AppSettings.FacebookAppId = "592391337520840";
                //TrialKey = UT_TRIAL_ACCOUNT_KEY;
                AppSettings.RecommendGoalsActivityId = 187;
                AppSettings.textAction = "Train";
                AppSettings.useTrainingHelp = true;
                AppSettings.requiresKeyboard = true;
                //UpdateURL = "http://www.ultimatetyping.com/ultimatetypingupdate.xml";
                
                if (clientType == AppSettings.WEB)
                {
                    AppSettings.GoogleAppId = "235676817509-0507nnlan8kdb6pdu80o7406du19hmmh.apps.googleusercontent.com";
                    //JiH38Q1ES3v82F1UNZcL0m_0
                }
                else if (clientType == AppSettings.DESKTOP || clientType == AppSettings.IPAD)
                {
                    AppSettings.GoogleAppId = "235676817509-25tdq44ccpooksi5dqgh7vuvbqclcuse.apps.googleusercontent.com";
                    //AppSettings.GoogleAppSecret = "35dWCihMKWW_L51kkV5b8Y44";
                }
                break;
            case (AppSettings.SPEED_READING):
            case (AppSettings.SPEED_READING_2):
                AppSettings.ProductName = "7 Speed Reading";
                //menuLogo = ResourceClasses.speedreading_logo;
                
                AppSettings.dockIcon = "icons//SpeedReaderIcons//7sr_128x128.png";	
                AppSettings.FacebookAppId = "516424575141280";
                //TrialKey = SR_TRIAL_ACCOUNT_KEY;
                AppSettings.RecommendGoalsActivityId = 322;
                AppSettings.textAction = "Read";
                AppSettings.useTrainingHelp = true;
                //UpdateURL = "http://www.7speedreading.com/7speedreadingupdate2.xml";
                
                if (clientType == AppSettings.WEB)
                {
                    AppSettings.GoogleAppId = "871381777261-mmqhm8vu4rve2kj3eubinci90ks5r9tq.apps.googleusercontent.com";
                    //VrXPPdzeK9-1LiBYIdf3ioV-
                }
                else if (clientType == AppSettings.DESKTOP || clientType == AppSettings.IPAD)
                {
                    AppSettings.GoogleAppId = "871381777261-jsbnv3b53dc5bhghdfc1pnjp8jahllhq.apps.googleusercontent.com";
                    //AppSettings.GoogleAppSecret = "o6PCDNr4n5bz4O8OHoVImHGi";
                }
                break;
            case (AppSettings.PREP_ED):
                AppSettings.ProductName = "PrepEd";
                AppSettings.useTrainingHelp = true;
                ///menuLogo = ResourceClasses.speedreading_logo;
                
                AppSettings.FacebookAppId = "";
                AppSettings.dockIcon = "icons//PrepEd//preped_128x128.png";					
                //UpdateURL = "http://www.7speedreading.com/7speedreadingupdate2.xml";

                AppSettings.GoogleAppId = "1043885528797-deb5juftahpeiq9a4q87vq3sieeoj9s6.apps.googleusercontent.com";
                //AppSettings.GoogleAppSecret = "IW2YC6jcCklPbzbUJGeVJcMD";

                this.useActivationCode = false;
                this.useLoginProfilePicture = false;
                this.CDNAssetLocation = this.PREPED_ASSET_LOCATION;
                break;
            case (AppSettings.PREP_ED_GRE_VOCAB):
                AppSettings.ProductName = "PrepEd GRE Vocab";
                AppSettings.useTrainingHelp = true;
                //menuLogo = ResourceClasses.speedreading_logo;
                
                AppSettings.FacebookAppId = "1061661950511899";
                AppSettings.dockIcon ="icons//PrepEdVocabIcons//pevcb_128x128.png";
                AppSettings.systemTrayIcon = "icons//PrepEdVocabIcons//pevcb_16x16.png";
                //UpdateURL = "http://www.7speedreading.com/7speedreadingupdate2.xml";
                
                this.useActivationCode = false;
                this.useLoginProfilePicture = false;
                if (clientType == AppSettings.WEB)
                {
                    AppSettings.GoogleAppId = "918511030360-skuqgtd3j3ms0rjs8dcop8g2l0dvg3ji.apps.googleusercontent.com";
                    //5AJLi7r-jZ3Cay42mfo-8GjM
                }
                else if (clientType == AppSettings.DESKTOP || clientType == AppSettings.IPAD)
                {
                    AppSettings.GoogleAppId = "918511030360-9t3qj1vd7sov6mnqd5qukctejel46jij.apps.googleusercontent.com";
                    //AppSettings.GoogleAppSecret = "mKzJQHB2YQbLEHtNa7LtKSkb";
                }
                break;
            case (AppSettings.PREP_ED_SAT_VOCAB):
                AppSettings.ProductName = "PrepEd SAT Vocab";
                AppSettings.useTrainingHelp = true;
                //menuLogo = ResourceClasses.pe;
                
                AppSettings.FacebookAppId = "1469121883411855";
                AppSettings.dockIcon ="icons//PrepEdVocabIcons//pevcb_128x128.png";
                AppSettings.systemTrayIcon = "icons//PrepEdVocabIcons//pevcb_16x16.png";
                
                if (clientType == AppSettings.WEB)
                {
                    AppSettings.GoogleAppId = "911178117431-fudapllr6gpfhk14138ag1dg0r1vbn79.apps.googleusercontent.com";
                    //KG4EkO8GDL8NxZxCmq-nXduG
                }
                else if (clientType == AppSettings.DESKTOP || clientType == AppSettings.IPAD)
                {
                    AppSettings.GoogleAppId = "911178117431-afia3pcci0kdu43fe3tp6fiq8kme6quj.apps.googleusercontent.com";
                    //AppSettings.GoogleAppSecret = "92-X_TtJPR7tQwlK7HK8855v";
                }
                break;
            case (AppSettings.TYPESY):
                AppSettings.ProductName = "Typesy";
                AppSettings.activityUsingEmbedFonts = true;
                AppSettings.dockIcon = "icons/TypesyIcons/typesy_128.png";	
                AppSettings.FacebookAppId = "628342130640045";
                //TrialKey = TYPESY_TRIAL_ACCOUNT_KEY;
                AppSettings.RecommendGoalsActivityId = 337;
                AppSettings.textAction = "Play";
                AppSettings.useTrainingHelp = true;
                AppSettings.requiresKeyboard = true;
                
                if (clientType == AppSettings.WEB) {
                    AppSettings.GoogleAppId = "1076109003078-k2d1qshpbbk3r556c2jvhk4uvm418fpb.apps.googleusercontent.com";
                    //xyoZ0KRsZSOiz23XmmPIhLXb
                }
                else if(clientType == AppSettings.ANGULAR) {
                    AppSettings.GoogleAppId = "47697474457-5goatp6cjvm00h7136m8dag534adm0of.apps.googleusercontent.com";
                    AppSettings.GoogleAPIKey = "AIzaSyAgZPCIk7cl6xZDd8XzWtWzUms1gR_gtyM";
                    //AppSettings.GoogleAppSecret = "MG-95ODUPDx8IPv_3SX4o4dF";
                }
                else if (clientType == AppSettings.DESKTOP || clientType == AppSettings.IPAD)
                {
                    AppSettings.GoogleAppId = "1076109003078-tifu50ht1k5jlqeklhhh06bq6eohjljf.apps.googleusercontent.com";
                    //AppSettings.GoogleAppSecret = "koGzblQ504dLpA9oSewnyUJn";
                }

                this.CDNAssetLocation = this.TYPESY_ASSET_LOCATION;
                break;
            case (AppSettings.SPREEDER):
            case (AppSettings.SPREEDER_2):
                AppSettings.ProductName = "Spreeder";
                AppSettings.activityUsingEmbedFonts = true;
                AppSettings.dockIcon = "icons/SpreederIcons/spreeder_128.png";	
                AppSettings.FacebookAppId = "1512316579079561";
                //TrialKey = SPREEDER_TRIAL_ACCOUNT_KEY;
                AppSettings.RecommendGoalsActivityId = 495;
                AppSettings.textAction = "Spreed";
                AppSettings.useTrainingHelp = false;
                
                if (clientType == AppSettings.WEB)
                {
                    AppSettings.GoogleAppId = "769301385564-8kv2im9v93hl1s4kfoc3obgdi9rafik7.apps.googleusercontent.com";
                    //R6s7KCjFQ_bhlRYyUuYwHLjI
                }
                else if (clientType == AppSettings.DESKTOP || clientType == AppSettings.IPAD)
                {
                    AppSettings.GoogleAppId = "769301385564-qgeaio0u9v9qdg06k8ilue9m0g5mavd7.apps.googleusercontent.com";
                    //AppSettings.GoogleAppSecret = "3bqqatFdH2fVYc9K_x2ku_bd";
                }
                break;
        }
        AppSettings.ShortProductName = StringUtils.RemoveAllSpaces(AppSettings.ProductName);
    }
            
    // private static upgradeLogo:Class;
    // public static GetUpgradeLogo():Class
    // {
    //     if(AppSettings.upgradeLogo != null)
    //         return AppSettings.upgradeLogo;
        
    //     switch (AppSettings.CurrentProductId)
    //     {
    //         case (AppSettings.ULTIMATE_VOCABULARY):
    //             if(AppSettings.ClientType == AppSettings.IPAD)
    //             {
                    
    //             }
    //             else
    //             {
                    
    //             }
    //             break;
    //         case (AppSettings.ULTIMATE_SPELLING):		
    //             if(AppSettings.ClientType == AppSettings.IPAD)
    //             {
                    
    //             }
    //             else
    //             {
                    
    //             }
    //             break;
    //         case (AppSettings.ULTIMATE_TYPING):
    //             if(AppSettings.ClientType == AppSettings.IPAD)
    //             {
                    
    //             }
    //             else
    //             {
                    
    //             }
    //             break;
    //         case (AppSettings.SPEED_READING):
    //             if(AppSettings.ClientType == AppSettings.IPAD)
    //             {
                    
    //             }
    //             else
    //             {
                    
    //             }
    //             break;
    //         case (AppSettings.PREP_ED):
    //             if(AppSettings.ClientType == AppSettings.IPAD)
    //             {
                    
    //             }
    //             else
    //             {
                    
    //             }
    //             break;
    //         case (AppSettings.PREP_ED_GRE_VOCAB):
    //             if(AppSettings.ClientType == AppSettings.IPAD)
    //             {
                    
    //             }
    //             else
    //             {
                    
    //             }
    //             break;
    //         case (AppSettings.PREP_ED_SAT_VOCAB):
    //             if(AppSettings.ClientType == AppSettings.IPAD)
    //             {
                    
    //             }
    //             else
    //             {
                    
    //             }
    //             break;
    //         case (AppSettings.TYPESY):
    //             switch(FlexGlobals.topLevelApplication.applicationDPI)
    //             {
    //                 case 160:
    //                     AppSettings.upgradeLogo = ResourceClasses.upgrade_typesy_logo;
    //                     break;
    //                 case 240:
    //                     AppSettings.upgradeLogo = ResourceClasses.upgrade_typesy_logo;
    //                     break;
    //             }
    //             break;
    //         case (AppSettings.SPREEDER):
    //             switch(FlexGlobals.topLevelApplication.applicationDPI)
    //             {
    //                 case 160:
    //                     AppSettings.upgradeLogo = ResourceClasses.upgrade_spreeder_logo;
    //                     break;
    //                 case 240:
    //                     AppSettings.upgradeLogo = ResourceClasses.spreeder_logo_300x70;
    //                     break;
    //                 case 320:
    //                     switch(AppSettings.iPhoneModel())
    //                     {
    //                         case AppSettings.IPHONE4:
    //                         case AppSettings.IPHONE5:
    //                             AppSettings.upgradeLogo = ResourceClasses.spreeder_logo_300x70;
    //                             break;
    //                         case AppSettings.IPHONE6:
    //                             AppSettings.upgradeLogo = ResourceClasses.iphone_spreeder_logo;
    //                             break;
    //                         case AppSettings.IPHONE6PLUS:
    //                             AppSettings.upgradeLogo = ResourceClasses.spreeder_upgrade_1242;
    //                     }
    //             }
    //     }
        
    //     return AppSettings.upgradeLogo;
    // }
    
    // private static loginLogo:Class;
    // public static GetLoginLogo():Class
    // {
    //     if(AppSettings.loginLogo != null)
    //         return AppSettings.loginLogo;
    //     switch (AppSettings.CurrentProductId)
    //     {
    //         case (AppSettings.ULTIMATE_VOCABULARY):
    //                             if(AppSettings.ClientType == AppSettings.IPAD)
    //                             {
                                    
    //                             }
    //                             else
    //                             {
    //                                 AppSettings.loginLogo = ResourceClasses.uv_logo_300x50;
    //                             }
    //                             break;
    //         case (AppSettings.ULTIMATE_SPELLING):
    //                             if(AppSettings.ClientType == AppSettings.IPAD)
    //                             {
                                    
    //                             }
    //                             else
    //                             {
    //                                 AppSettings.loginLogo = ResourceClasses.us_logo_300x50;
    //                             }
    //                             break;
    //         case (AppSettings.ULTIMATE_TYPING):
    //                             if(AppSettings.ClientType == AppSettings.IPAD)
    //                             {
    //                                 AppSettings.loginLogo = ResourceClasses.mobile_ut_logo;
    //                             }
    //                             else
    //                             {
    //                                 AppSettings.loginLogo = ResourceClasses.ut_logo_300x50;
    //                             }
    //                             break;
    //         case (AppSettings.SPEED_READING):
    //                             if(AppSettings.ClientType == AppSettings.IPAD)
    //                             {
    //                                 AppSettings.loginLogo = ResourceClasses.mobile_sr_logo;
    //                             }
    //                             else
    //                             {
    //                                 AppSettings.loginLogo = ResourceClasses.sr_logo_300x50;
    //                             }
    //                             break;
    //         case (AppSettings.PREP_ED):
    //                             if(AppSettings.ClientType == AppSettings.IPAD)
    //                             {
                                    
    //                             }
    //                             else
    //                             {
    //                                 AppSettings.loginLogo = ResourceClasses.pe_logo_300x50;
    //                             }
    //                             break;
    //         case (AppSettings.PREP_ED_GRE_VOCAB):
    //                             if(AppSettings.ClientType == AppSettings.IPAD)
    //                             {
                                    
    //                             }
    //                             else
    //                             {
    //                                 AppSettings.loginLogo = ResourceClasses.pe_gre_vcb_logo_300x50;
    //                             }
    //                             break;
    //         case (AppSettings.PREP_ED_SAT_VOCAB):
    //                             if(AppSettings.ClientType == AppSettings.IPAD)
    //                             {
                                    
    //                             }
    //                             else
    //                             {
    //                                 AppSettings.loginLogo = ResourceClasses.pe_logo_300x50;
    //                             }
    //                             break;
    //         case (AppSettings.TYPESY):
    //                             switch(FlexGlobals.topLevelApplication.applicationDPI)
    //                             {
    //                                 case 160:
    //                                     AppSettings.loginLogo = ResourceClasses.typesy_logo_300x50;
    //                                     break;
    //                                 case 240:
    //                                     AppSettings.loginLogo = ResourceClasses.mobile_typesy_logo;
    //                                     break;
    //                             }
    //                             break;
    //         case (AppSettings.SPREEDER):
    //                             switch(FlexGlobals.topLevelApplication.applicationDPI)
    //                             {
    //                                 case 160:
    //                                     AppSettings.loginLogo = ResourceClasses.spreeder_logo_300x70;
    //                                     break;
    //                                 case 240:
    //                                     AppSettings.loginLogo = ResourceClasses.mobile_spreeder_logo;
    //                                     break;
    //                                 case 320:
    //                                     switch(AppSettings.iPhoneModel())
    //                                     {
    //                                         case AppSettings.IPHONE4:
    //                                         case AppSettings.IPHONE5:
    //                                         case AppSettings.IPHONE6:
    //                                             AppSettings.loginLogo = ResourceClasses.iphone_spreeder_logo;
    //                                             break;
    //                                         case AppSettings.IPHONE6PLUS:
    //                                             AppSettings.loginLogo = ResourceClasses.spreeder_logo_1242;
    //                                     }
    //                                     break;
    //                             }
    //     }
        
    //     return AppSettings.loginLogo;
    // }
    
    public static GetMediaDirectory():string
    {
        return AppSettings.MediaDirectory + AppSettings.ShortProductName + "/";
    }
    
    private static ResourcesURL:string = "https://resources.ereflect.com/";
    //public static var localNetworkLocationAvailable:boolean = false;
    //public static var localNetworkDirectory:string;
    /*public static function SetLocalNetworkDirectory(networkUrl:string):void
    {
        localNetworkDirectory = networkUrl;
    }*/
    public static GetAssetLocation():string
    {
        if (this.useCDN)
        {
            return AppSettings.CDNAssetLocation;
        }
        else
        {
            return './';
        }
    }
    public static GetResourcelocation2(useLocalNetworkDirectory:boolean):string
    {
        if (AppSettings.useMediaFolder)
        {
            return AppSettings.MediaDirectory;
        }
        /*else if (useLocalNetworkDirectory)
        {
            return localNetworkDirectory;
        }*/
        else
        {
            return AppSettings.ResourcesURL;
        }
        
        /*if (localNetworkLocationAvailable)
        {
            return localNetworkDirectory;
        }
        else
        {
            return ResourcesURL;
        }*/
    }
    
    public static GetResourcelocation():string
    {
        if (AppSettings.useMediaFolder)
        {
            return AppSettings.MediaDirectory;
        }
        /*if (localNetworkLocationAvailable)
        {
            return localNetworkDirectory;
        }
        else
        {*/
            return AppSettings.ResourcesURL;
        //}
    }
    
    //private static osString:string = Capabilities.os.substr(0, 3).toLowerCase();
    private static osString:string = "Win";
    //private static var osString:string = OS_MAC;
    public static get OsString():string
    {
        return AppSettings.osString;
    }
    
    public static get ProductResourcesURL():string
    {
        return AppSettings.GetResourcelocation() + AppSettings.ShortProductName + "/";
    }
    
    public static getProductResourcesURL2(useLocalNetowrkDirectory:boolean):string
    {
        return AppSettings.GetResourcelocation2(useLocalNetowrkDirectory) + AppSettings.ShortProductName + "/";
    }
    
    public static get SharedResourcesURL():string
    {
        return AppSettings.GetResourcelocation() + "Shared/";
    }
    
    public static get SoundLocationURL():string
    {
        return AppSettings.ResourcesURL + "Shared/" + "wordSounds/";
    }
    
    public static getVideoLocationURL(useLocalNetowrkDirectory:boolean):string
    {
        return AppSettings.getProductResourcesURL2(useLocalNetowrkDirectory) + "courseVideos/";
    }
    
    public static get ActivitySoundLocationURL():string
    {
        if (AppSettings.useMediaFolder)
        {
            /*if(ClientType == WEB)
            {
                return MediaDirectory + ShortProductName + "/audio/";
            }
            else
            {
                return "audio/";
            }		*/			
            return AppSettings.MediaDirectory + AppSettings.ShortProductName + "/audio/";
        }
        else
        {
            return AppSettings.ProductResourcesURL + "audio/";
        }
    }
    
    public static ActivitySoundLocationURLByType(type:string):string
    {
        if(type == AppSettings.LOCAL_MEDIA)
        {			
            return AppSettings.MediaDirectory + AppSettings.ShortProductName + "/audio/";
        }
        else
        {
            return AppSettings.ProductResourcesURL + "audio/";
        }
    }
    
    public static getVideoLocationURLByType(mediaType:string):string
    {
        if(mediaType == AppSettings.LOCAL_MEDIA)
        {
            return AppSettings.MediaDirectory + AppSettings.ShortProductName + "/courseVideos/";
        }
        else
        {
            return AppSettings.ResourcesURL + AppSettings.ShortProductName + "/courseVideos/";
        }
        
    }
    
    public static getPrepProgramIconLocationURL(id:number):string
    {
        return this.ResourcesURL + this.ShortProductName + "/prepProgramIcons/" + id + "_" + this.applicationDPI + ".png";
    }

    public static getPrepProgramScreenshootLocationURL(id:number):string
    {
        return this.ResourcesURL + this.ShortProductName + "/prepProgramIcons/" + id + "_screenshot.png";
    }

    public static getCourseIconLocationURL(id:number):string
    {
        return this.ResourcesURL + this.ShortProductName + "/courseIcons/" + id + "_" + this.applicationDPI + ".png";
    }
    
    public static getActivityIconLocationURL(id:number):string
    {
        return this.ResourcesURL + this.ShortProductName + "/activityIcons/" + id + "_" + this.applicationDPI + ".png";
    }
    
    public static getIntroIconLocationURL(id:number):string
    {
        return this.ResourcesURL + this.ShortProductName + "/courseIntros/" + id + "_" + this.applicationDPI + ".png";
    }
    
    public static getGameIntroIconSource(id:number):string
    {
        return this.GetAssetLocation() + "assets/icon/intro-icons/games/" + id + ".png"; //"_" + this.applicationDPI + ".png";
    }

    public static getCourseIntroIconSource(id:string): string {
        return this.GetAssetLocation() + "assets/icon/intro-icons/course-activities/" + id + ".png";        
    }

    /*public static getCourseIntroIconSource(courseID:number, activityID:number):string
    {
        if(courseID == -1) {
            return this.GetAssetLocation() + "assets/icon/intro-icons/" + activityID + "_" + this.applicationDPI + ".png";
        }
        else if(activityID == -1) {
            return this.GetAssetLocation() + "assets/icon/intro-icons/courses/" + courseID + "_" + this.applicationDPI + ".png";
        }
        else {
            return this.GetAssetLocation() + "assets/icon/intro-icons/courses/" + courseID + "_" + activityID + "_" + this.applicationDPI + ".png";
        }
        
    }*/
    
    // private static IOSType(type:number):number
    // {
    //     if(Capabilities.isDebugger)
    //     {
    //         return type; 
    //     }
    //     else
    //     {
    //         return Capabilities.os.indexOf("iPad") > -1 ? AppSettings.IPAD : AppSettings.IPHONE;	
    //     }
    // }
    
    // public static get isIOS():boolean
    // {
    //     return AppSettings.ClientType == AppSettings.IPAD || AppSettings.ClientType == AppSettings.IPHONE;
    // }
    
    // public static IPHONE4:number = 0;
    // public static IPHONE5:number = 1;
    // public static IPHONE6:number = 2;
    // public static IPHONE6PLUS:number = 3;
    // public static iPhoneModel():number
    // {
    //     //if(!isIOS)
    //     if(AppSettings.ClientType != AppSettings.IPHONE)
    //         trace("HEI DEV! YOU ARE USING IPHONEMODEL WITH INCORRECT CLIENT");
    //         //throw new Error("Error! Not using IOS");
        
    //     var retVal:number = -1;
    //     var resolution:string = Capabilities.isDebugger && UberReaderAccessor.GetUberReaderSprite() != null ? UberReaderAccessor.GetUberReaderSprite().width + "x" + UberReaderAccessor.GetUberReaderSprite().height : 
    //         Capabilities.screenResolutionX + "x" + Capabilities.screenResolutionY;
        
    //     if(Capabilities.isDebugger)
    //     {
    //         if(UberReaderAccessor.GetUberReaderSprite().width <= 640 || UberReaderAccessor.GetUberReaderSprite().height <= 640)
    //         {
    //             return AppSettings.IPHONE5;
    //         }				
    //         else if(UberReaderAccessor.GetUberReaderSprite().width <= 750 || UberReaderAccessor.GetUberReaderSprite().height <= 750)
    //         {
    //             return AppSettings.IPHONE6;
    //         }				
    //         else if(UberReaderAccessor.GetUberReaderSprite().width <= 1242 || UberReaderAccessor.GetUberReaderSprite().height <= 1242)
    //         {
    //             return AppSettings.IPHONE6PLUS;
    //         }
    //     }
    //     switch(resolution)
    //     {
    //         case "640x960":
    //         case "960x640":
    //             retVal = AppSettings.IPHONE4; 
    //             break;
    //         case "640×1136":
    //         case "1136×640":
    //             retVal = AppSettings.IPHONE5; 
    //             break;
    //         case "750×1334":
    //         case "1334x750":
    //             retVal = AppSettings.IPHONE6; 
    //             break;
    //         case "2208×1242":
    //         case "1242x2208":
    //             retVal = AppSettings.IPHONE6PLUS; 
    //             break;
    //         default: //use iphone6 as default phone
    //             retVal = AppSettings.IPHONE6; 
    //     }
    //     return retVal;
    // }
    
    // public static GetiPhoneIntroImageString():string
    // {
    //     var retVal:string = "iPhone6";
    //     switch(AppSettings.iPhoneModel())
    //     {
    //         case AppSettings.IPHONE4:
    //         case AppSettings.IPHONE5:
    //             retVal = "iPhone5";
    //             break;
    //         case AppSettings.IPHONE6:
    //             retVal = "iPhone6";
    //             break;
    //         case AppSettings.IPHONE6PLUS:
    //             retVal = "iPhone6Plus";
    //     }
    //     return retVal;
    // }
    
    public static GetDefaultButtonSize():number
    {
        var retVal:number = 0;
        //switch(FlexGlobals.topLevelApplication.applicationsDPI)
        var appDPI = 160;
        switch(appDPI)
        {
            case 160:
                switch(AppSettings.ClientType)
                {
                    case AppSettings.DESKTOP:
                    case AppSettings.WEB:
                        break;
                    case AppSettings.IPAD:
                        break;
                    case AppSettings.IPHONE:
                        retVal = 55;
                }
                break;
            case 240:
                switch(AppSettings.ClientType)
                {
                    case AppSettings.DESKTOP:
                    case AppSettings.WEB:
                        break;
                    case AppSettings.IPAD:
                        break;
                    case AppSettings.IPHONE:
                        retVal = 95;
                }
                break;
            case 320:
                switch(AppSettings.ClientType)
                {
                    case AppSettings.DESKTOP:
                    case AppSettings.WEB:
                        break;
                    case AppSettings.IPAD:
                        break;
                    case AppSettings.IPHONE:
                        retVal = 110;
                }
        }
        
        return retVal;
    }    
}
