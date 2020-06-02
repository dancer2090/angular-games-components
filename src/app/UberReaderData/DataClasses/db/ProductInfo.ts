//import AlertDialog = com.er.ur.UberReader.Dialogs.AlertDialog;
//import UberApplication = com.er.ur.UberReaderData.UberApplication;

//import Alert = mx.controls.Alert;

//import { StringUtils } from '../../Utils';

import { RecommendedVocabData } from '../other/RecommendedVocabData'

export class ProductInfo
{
    private _ProductId:number;
    public get ProductId():number
    {
        return this._ProductId;
    }
    public set ProductId(value:number)
    {
        this._ProductId = value;
    }
    
    private _ProductName:string;
    public get ProductName():string
    {
        return this._ProductName;
    }
    public set ProductName(value:string)
    {
        this._ProductName = value;
    }
    
    private _DisplayText:boolean;
    public get DisplayText():boolean
    {
        return this._DisplayText;
    }
    public set DisplayText(value:boolean)
    {
        this._DisplayText = value;
    }
    
    private _DisplayVocab:boolean;
    public get DisplayVocab():boolean
    {
        return this._DisplayVocab;
    }
    public set DisplayVocab(value:boolean)
    {
        this._DisplayVocab = value;
    }
    
    private _DisplayQuestion:boolean;
    public get DisplayQuestion():boolean
    {
        return this._DisplayQuestion;
    }
    public set DisplayQuestion(value:boolean)
    {
        this._DisplayQuestion = value;
    }
    
    private _Icon:string;
    public get Icon():string
    {
        return this._Icon;
    }
    public set Icon(value:string)
    {
        this._Icon = value;
    }
    
    private _HelpFile:string;
    public get HelpFile():string
    {
        return this._HelpFile;
    }
    public set HelpFile(value:string)
    {
        this._HelpFile = value;
    }
    
    private _CoursesFirst:boolean;
    public get CoursesFirst():boolean
    {
        return this._CoursesFirst;
    }
    public set CoursesFirst(value:boolean)
    {
        this._CoursesFirst = value;
    }
    
    private _CoursesText:string;
    public get CoursesText():string
    {
        return this._CoursesText;
    }
    public set CoursesText(value:string)
    {
        this._CoursesText = value;
    }
    
    private _ActivitiesText:string;
    public get ActivitiesText():string
    {
        return this._ActivitiesText;
    }
    public set ActivitiesText(value:string)
    {
        this._ActivitiesText = value;
    }
    
    private _ActivitiesImage:string;
    public get ActivitiesImage():string
    {
        return this._ActivitiesImage;
    }
    public set ActivitiesImage(value:string)
    {
        this._ActivitiesImage = value;
    }
    
    private _ActivitiesSubImage:string;
    public get ActivitiesSubImage():string
    {
        return this._ActivitiesSubImage;
    }
    public set ActivitiesSubImage(value:string)
    {
        this._ActivitiesSubImage = value;
    }
    
    private _VocabTabText:string;
    public get VocabTabText():string
    {
        return this._VocabTabText;
    }
    public set VocabTabText(value:string)
    {
        this._VocabTabText = value;
    }
    
    private _UsesHD:boolean;
    public get UsesHD():boolean
    {
        return this._UsesHD;
    }
    public set UsesHD(value:boolean)
    {
        this._UsesHD = value;
    }
    
    private _doPreprocessing:boolean;
    public get DoPreprocessing():boolean
    {
        return this._doPreprocessing;
    }
    public set DoPreprocessing(value:boolean)
    {
        this._doPreprocessing = value;
    }
    
    private _goal_1_name:string;
    public get Goal_1_name():string
    {
        return this._goal_1_name;
    }
    public set Goal_1_name(value:string)
    {
        this._goal_1_name = value;
    }
    
    private _goal_1_key:string;
    public get Goal_1_key():string
    {
        return this._goal_1_key;
    }
    public set Goal_1_key(value:string)
    {
        this._goal_1_key = value;
    }
    
    private _goal_1_desc:string;
    public get Goal_1_desc():string
    {
        return this._goal_1_desc;
    }
    public set Goal_1_desc(value:string)
    {
        this._goal_1_desc = value;
    }
    
    private _goal_1_unit:string;
    public get Goal_1_unit():string
    {
        return this._goal_1_unit;
    }
    public set Goal_1_unit(value:string)
    {
        this._goal_1_unit = value;
    }
    
    private _goal_1_default:number ;
    public get Goal_1_default():number
    {
        return this._goal_1_default;
    }
    public set Goal_1_default(value:number)
    {
        this._goal_1_default = value;
    }
    
    private _goal_2_name:string;
    public get Goal_2_name():string
    {
        return this._goal_2_name;
    }
    public set Goal_2_name(value:string)
    {
        this._goal_2_name = value;
    }
    
    private _goal_2_key:string;
    public get Goal_2_key():string
    {
        return this._goal_2_key;
    }
    public set Goal_2_key(value:string)
    {
        this._goal_2_key = value;
    }
    
    private _goal_2_desc:string;
    public get Goal_2_desc():string
    {
        return this._goal_2_desc;
    }
    public set Goal_2_desc(value:string)
    {
        this._goal_2_desc = value;
    }
    
    private _goal_2_unit:string;
    public get Goal_2_unit():string
    {
        return this._goal_2_unit;
    }
    public set Goal_2_unit(value:string)
    {
        this._goal_2_unit = value;
    }
    
    private _goal_2_default:number ;
    public get Goal_2_default():number
    {
        return this._goal_2_default;
    }
    public set Goal_2_default(value:number)
    {
        this._goal_2_default = value;
    }
    
    private _goal_1_min:number ;
    public get Goal_1_min():number
    {
        return this._goal_1_min;
    }
    public set Goal_1_min(value:number)
    {
        this._goal_1_min = value;
    }
    
    private _goal_1_max:number ;
    public get Goal_1_max():number
    {	
        return this._goal_1_max;
    }
    public set Goal_1_max(value:number)
    {
        this._goal_1_max = value;
    }
    
    private _goal_2_min:number ;
    public get Goal_2_min():number
    {
        return this._goal_2_min;
    }
    public set Goal_2_min(value:number)
    {
        this._goal_2_min = value;
    }
    
    private _goal_2_max:number ;
    public get Goal_2_max():number
    {
        return this._goal_2_max;
    }
    public set Goal_2_max(value:number)
    {
        this._goal_2_max = value;
    }
    
    private _fonts_used:string;
    public get Fonts_used():string
    {
        return this._fonts_used;
    }
    public set Fonts_used(value:string)
    {
        this._fonts_used = value;
    }
    
    private _default_wordlist_id:number ;
    public get Default_wordlist_id():number
    {
        return this._default_wordlist_id;
    }
    public set Default_wordlist_id(value:number)
    {
        this._default_wordlist_id = value;
    }
    
    // public checkGoal1String(number:string):boolean
    // {
    //     num:number = parseInt(number);
    //     if (isNaN(num))
    //     {
    //         AlertDialog.show(StringUtils.substitute(UberApplication.GetInstance().GetUiTextByKey("ERR_GOAL_ISNAN_MESSAGE"), this.Goal_1_min, this.Goal_1_max, this.Goal_1_name),
    //             UberApplication.GetInstance().GetUiTextByKey("ERR_GOAL_ISNAN_TITLE"), UberReaderAccessor.GetUberReaderSprite(),true);
    //         return false;
    //     }
    //     else
    //     {
    //         return this.checkGoal1(num);
    //     }
    // }
    
    // public checkGoal2String(number:string):boolean
    // {
    //     num:number = parseInt(number);
    //     if (isNaN(num))
    //     {
    //         AlertDialog.show(StringUtils.substitute(UberApplication.GetInstance().GetUiTextByKey("ERR_GOAL_ISNAN_MESSAGE"), this.Goal_2_min, this.Goal_2_max, this.Goal_2_name),
    //             UberApplication.GetInstance().GetUiTextByKey("ERR_GOAL_ISNAN_TITLE"), UberReaderAccessor.GetUberReaderSprite(),true);
    //         return false;
    //     }
    //     else
    //     {
    //         return this.checkGoal2(num);
    //     }
    // }
    
    // public checkGoal1(num:number):boolean
    // {
        
    //     if (num > this._goal_1_max || num < this._goal_1_min)
    //     {
    //         AlertDialog.show(StringUtils.substitute(UberApplication.GetInstance().GetUiTextByKey("ERR_GOAL_ISNAN_MESSAGE"), this.Goal_1_min, this.Goal_1_max, this.Goal_1_name),
    //             UberApplication.GetInstance().GetUiTextByKey("ERR_GOAL_ISNAN_TITLE"), UberReaderAccessor.GetUberReaderSprite(),true);
    //         return false;
    //     }
    //     else
    //     {
    //         return true;
    //     }
    // }
    
    // public checkGoal2(num:number):boolean
    // {
    
    //     if (num > this._goal_2_max || num < this._goal_2_min)
    //     {
    //         AlertDialog.show(StringUtils.substitute(UberApplication.GetInstance().GetUiTextByKey("ERR_GOAL_ISNAN_MESSAGE"), this.Goal_2_min, this.Goal_2_max, this.Goal_2_name),
    //             UberApplication.GetInstance().GetUiTextByKey("ERR_GOAL_ISNAN_TITLE"), UberReaderAccessor.GetUberReaderSprite(),true);
    //         return false;
    //     }
    //     else
    //     {
    //         return true;
    //     }
    // }
    
    private _home_view_class:string;
    public get Home_View_Class():string
    {
        return this._home_view_class;
    }
    
    private _facebook_post_link:string;
    public get Facebook_Post_Link():string
    {
        return this._facebook_post_link;
    }
    
    private _product_data_version:string;
    public get Product_Data_Version():string
    {
        return this._product_data_version;
    }
    
    public set Product_Data_Version(version:string)
    {
        this._product_data_version = version;
    }
    
    private _display_activity_settings:boolean;
    public get Display_Activity_Settings():boolean
    {
        return this._display_activity_settings;
    }
    
    public set Display_Activity_Settings(display:boolean)
    {
        this._display_activity_settings = display;
    }
    
    private default_chart_id:number = -1;
    public set Default_Chart_Id(id:number)
    {
        this.default_chart_id = id;
    }
    
    public get Default_Chart_Id():number
    {
        return this.default_chart_id;
    }
    
    private _readerText:string;
    public set ReaderText(val:string)
    {
        this._readerText = val;
    }
    public get ReaderText():string
    {
        return this._readerText;
    }
    
    private _contains_videos:Boolean = true;
    public set ContainsVideos(val:Boolean)
    {
        this._contains_videos = val;
    }
    public get ContainsVideos():Boolean
    {
        return this._contains_videos;
    }
    
    private _trial_dialog_class:String;
    public set Trial_dialog_class(val:String)
    {
        this._trial_dialog_class = val;
    }
    public get Trial_dialog_class():String
    {
        return this._trial_dialog_class;
    }
    
    private _allow_anonymous_login:boolean = null;
    public set Allow_anonymous_login(val:boolean)
    {
        this._allow_anonymous_login = val;
    }
    public get Allow_anonymous_login():boolean
    {
        return this._allow_anonymous_login;
    }
    
    private _points_required_create_account:number = null;
    public set Points_required_create_account(val:number)
    {
        this._points_required_create_account = val;
    }
    public get Points_required_create_account():number
    {
        return this._points_required_create_account;
    }
    
    private _rating_nag_pointslist:String;
    public set Rating_nag_pointslist(val:String)
    {
        this._rating_nag_pointslist = val;			
    }
    public get Rating_nag_pointslist():String
    {
        return this._rating_nag_pointslist;
    }
    
    private _ios_rating_link:String;
    public set Ios_rating_link(val:String)
    {
        this._ios_rating_link = val;			
    }
    public get Ios_rating_link():String
    {
        return this._ios_rating_link;
    }
    
    private _chrome_rating_link:String;
    public set Chrome_rating_link(val:String)
    {
        this._chrome_rating_link = val;			
    }
    public get Chrome_rating_link():String
    {
        return this._chrome_rating_link;
    }

    private _recommended_vocab_data:RecommendedVocabData;
	public set Recommended_Vocab_Product(val:RecommendedVocabData)
	{
		this._recommended_vocab_data = val;			
	}
	public get Recommended_Vocab_Product():RecommendedVocabData
	{
		return this._recommended_vocab_data;
	}

    private _recommended_vocab_product_id:number;
	public set Recommended_Vocab_Product_id(val:number)
	{
		this._recommended_vocab_product_id = val;			
	}
	public get Recommended_Vocab_Product_id():number
	{
		return this._recommended_vocab_product_id;
	}
    
    public static fromJson(jsonObject:any):ProductInfo
    {
        var retVal:ProductInfo = new ProductInfo();
        retVal._ActivitiesImage = jsonObject.ActivitiesImage;
        retVal._ActivitiesSubImage = jsonObject.ActivitiesSubImage;
        retVal._ActivitiesText = jsonObject.ActivitiesText;
        retVal._CoursesFirst = jsonObject.CoursesFirst;
        retVal._CoursesText = jsonObject.CoursesText;
        if (jsonObject.Default_wordlist_id != null)
        {
            retVal._default_wordlist_id = jsonObject.Default_wordlist_id;
        }
        retVal._DisplayText = jsonObject.DisplayText;
        retVal._DisplayVocab = jsonObject.DisplayVocab;
		retVal._DisplayQuestion = jsonObject.DisplayQuestion;
        retVal._doPreprocessing = jsonObject.DoPreprocessing;
        retVal._fonts_used = jsonObject.Fonts_used;
        if (jsonObject.Goal_1_default != null)
        {
            retVal._goal_1_default = jsonObject.Goal_1_default;
        }
        retVal._goal_1_desc = jsonObject.Goal_1_desc;
        retVal._goal_1_key = jsonObject.Goal_1_key;
        if (jsonObject.Goal_1_max != null)
        {
            //retVal._goal_1_max = 5000;
            retVal._goal_1_max = jsonObject.Goal_1_max;
        }
        if (jsonObject.Goal_1_min != null)
        {
            //retVal._goal_1_max = 50;
            retVal._goal_1_min = jsonObject.Goal_1_min;
        }
        retVal._goal_1_name = jsonObject.Goal_1_name;
        retVal._goal_1_unit = jsonObject.Goal_1_unit;
        
        if (jsonObject.Goal_2_default != null)
        {
            retVal._goal_2_default = jsonObject.Goal_2_default;
        }
        retVal._goal_2_desc = jsonObject.Goal_2_desc;
        retVal._goal_2_key = jsonObject.Goal_2_key;
        if (jsonObject.Goal_2_max != null)
        {
            retVal._goal_2_max = jsonObject.Goal_2_max;
        }
        if (jsonObject.Goal_2_min != null)
        {
            retVal._goal_2_min = jsonObject.Goal_2_min;
        }
        retVal._goal_2_name = jsonObject.Goal_2_name;
        retVal._goal_2_unit = jsonObject.Goal_2_unit;
        
        retVal.ContainsVideos = jsonObject.ContainsVideos;
        retVal._HelpFile = jsonObject.HelpFile;
        retVal._Icon = jsonObject.Icon;
        retVal._ProductId = jsonObject.ProductId;
        retVal._ProductName = jsonObject.ProductName;
        retVal._UsesHD = jsonObject.UsesHD;
        retVal._VocabTabText = jsonObject.HelpFile;
        retVal._home_view_class = jsonObject.Home_view_class;
        retVal._facebook_post_link = jsonObject.Facebook_post_link;
        retVal.Display_Activity_Settings = jsonObject.display_activity_settings;
        retVal.Default_Chart_Id = jsonObject.Default_chart_id;
        retVal.ReaderText = jsonObject.ReaderText;
        
        retVal.Trial_dialog_class = jsonObject.Trial_dialog_class;
        retVal.Rating_nag_pointslist = jsonObject.Rating_nag_pointlist;
        retVal.Ios_rating_link = jsonObject.Ios_rating_link;
        retVal.Chrome_rating_link = jsonObject.Chrome_rating_link;
        
        if (jsonObject.Allow_anonymous_login != null)
        {
            retVal.Allow_anonymous_login = jsonObject.Allow_anonymous_login;
        }
        if(jsonObject.Points_required_create_account != null)
        {
            retVal.Points_required_create_account = jsonObject.Points_required_create_account;
        }

        if(jsonObject.Recommended_Vocab_Product != null)
		{
			retVal.Recommended_Vocab_Product = RecommendedVocabData.fromJson(jsonObject.Recommended_Vocab_Product);
		}
			
		if(jsonObject.Recommended_vocab_product_id != null)
		{
			retVal.Recommended_Vocab_Product_id = jsonObject.Recommended_vocab_product_id;
		}

        if(jsonObject.Product_data_version != null)
		{
			retVal.Product_Data_Version = jsonObject.Product_data_version;
		}
        return retVal;
    }
}