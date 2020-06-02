//import AppSettings = com.er.ur.UberReaderData.AppSettings;
import { AControl_Activity } from './AControl_Activity';

export class Activity
{
    private _activity_id:number;
    public get Activity_id():number
    {
        return this._activity_id;
    }
    public set Activity_id(value:number)
    {
        this._activity_id = value;
    }
    
    private _activity_name:string;
    public get Activity_name():string
    {
        return this._activity_name;
    }
    public set Activity_name(value:string)
    {
        this._activity_name = value;
    }
    
    private _activity_description:string;
    public get Activity_description():string
    {
        return this._activity_description;
    }
    public set Activity_description(value:string)
    {
        this._activity_description = value;
    }
    
    private _dll_name:string;
    public get Dll_name():string
    {
        return this._dll_name;
    }
    public set Dll_name(value:string)
    {
        this._dll_name = value;
    }
    
    private _requires_text:boolean;
    public get Requires_text():boolean
    {
        return this._requires_text;
    }
    public set Requires_text(value:boolean)
    {
        this._requires_text = value;
    }
    
    private _requires_question:boolean;
    public get Requires_question():boolean
    {
        return this._requires_question;
    }
    public set Requires_question(value:boolean)
    {
        this._requires_question = value;
    }
    
    private _sequence:number;
    public get Sequence():number
    {
        return this._sequence;
    }
    public set Sequence(value:number)
    {
        this._sequence = value;
    }
    
    private _show:boolean;
    public get Show():boolean
    {
        return this._show;
    }
    public set Show(value:boolean)
    {
        this._show = value;
    }
    
    private _width:number ;
    public get Width():number
    {
        return this._width;
    }
    public set Width(value:number)
    {
        this._width = value;
    }
    
    private _height:number ;
    public get Height():number
    {
        return this._height;
    }
    public set Height(value:number)
    {
        this._height = value;
    }
    
    private _requires_test:boolean;
    public get Requires_test():boolean
    {
        return this._requires_test;
    }
    public set Requires_test(value:boolean)
    {
        this._requires_test = value;
    }
    
    private _category_id:number;
    public get Category_id():number
    {
        return this._category_id;
    }
    public set Category_id(value:number)
    {
        this._category_id = value;
    }
    
    private _num_sentences_required:number ;
    public get Num_sentences_required():number
    {
        return this._num_sentences_required;
    }
    public set Num_sentences_required(value:number)
    {
        this._num_sentences_required = value;
    }
    
    private _type_id:number;
    public get Type_id():number
    {
        return this._type_id;
    }
    public set Type_id(value:number)
    {
        this._type_id = value;
    }
    
    private _requires_wordlist:boolean;
    public get Requires_wordlist():boolean
    {
        return this._requires_wordlist;
    }
    public set Requires_wordlist(value:boolean)
    {
        this._requires_wordlist = value;
    }
    
    private _min_words_required:number ;
    public get Min_words_required():number
    {
        return this._min_words_required;
    }
    public set Min_words_required(value:number)
    {
        this._min_words_required = value;
    }
    
    private _max_words_displayed:number ;
    public get Max_words_displayed():number
    {
        return this._max_words_displayed;
    }
    public set Max_words_displayed(value:number)
    {
        this._max_words_displayed = value;
    }
    
    private _class_name:string;
    public get Class_name():string
    {
        return this._class_name;
    }
    public set Class_name(value:string)
    {
        this._class_name = value;
    }
    
    private _show_word_info:boolean ;
    public get Show_word_info():boolean
    {
        return this._show_word_info;
    }
    public set Show_word_info(value:boolean)
    {
        this._show_word_info = value;
    }
    
    private _usesComplexText:boolean;
    public get UsesComplexText():boolean
    {
        return this._usesComplexText;
    }
    public set UsesComplexText(value:boolean)
    {
        this._usesComplexText = value;
    }
    
    private _full_size:boolean;
    public get Full_size():boolean
    {
        return this._full_size;
    }
    public set Full_size(value:boolean)
    {
        this._full_size = value;
    }
    
    private _acontrol_activities:AControl_Activity[];
    public get AControl_Activities():AControl_Activity[]
    {
        return this._acontrol_activities;
    }
    public set AControl_Activities(value:AControl_Activity[])
    {
        this._acontrol_activities = value;
    }
    
    private _min_client_version:number ;
    public get Min_client_version():number
    {
        return this._min_client_version;
    }
    public set Min_client_version(value:number)
    {
        this._min_client_version = value;
    }
    
    private _max_client_version:number ;
    public get Max_client_version():number
    {
        return this._max_client_version;
    }
    public set Max_client_version(value:number)
    {
        this._max_client_version = value;
    }
    
    // public get Is_included():boolean
    // {
    //     var clientVersion:number = AppSettings.GetClientVersionCalculated();
    //     return ((this.Min_client_version == null || this.Min_client_version <= clientVersion)
    //         && (this.Max_client_version == null || this.Max_client_version >= clientVersion));
    // }
    
    private _requires_basic_test:boolean;
    public get Requires_basic_test():boolean
    {
        return this._requires_basic_test;
    }
    public set Requires_basic_test(value:boolean)
    {
        this._requires_basic_test = value;
    }

    private _adaptive_streaming_url:string;
    public get Adaptive_streaming_url():string
    {
        return this._adaptive_streaming_url;
    }
    public set Adaptive_streaming_url(value:string)
    {
        this._adaptive_streaming_url = value;
    }

    private _display_multimedia_screen:boolean;
    public get Display_multimedia_screen():boolean
    {
        return this._display_multimedia_screen;
    }
    public set Display_multimedia_screen(value:boolean)
    {
        this._display_multimedia_screen = value;
    }

    private _video_lesson_text:string;
    public get Video_lesson_text():string
    {
        return this._video_lesson_text;
    }
    public set Video_lesson_text(value:string)
    {
        this._video_lesson_text = value;
    }

    private _video_lesson_image:string;
    public get Video_lesson_image():string
    {
        return this._video_lesson_image;
    }
    public set Video_lesson_image(value:string)
    {
        this._video_lesson_image = value;
    }

    private _video_lesson_screenshot:string;
    public get Video_lesson_screenshot():string
    {
        return this._video_lesson_screenshot;
    }
    public set Video_lesson_screenshot(value:string)
    {
        this._video_lesson_screenshot = value;
    }
    
    public static fromJson(jsonObject:any):Activity
    {
        var retVal:Activity = new Activity();
        retVal.Activity_id = jsonObject.Activity_id;
        retVal.Activity_description = jsonObject.Activity_description;
        retVal.Activity_name = jsonObject.Activity_name;
        retVal.Category_id = jsonObject.Category_id;
        retVal.Class_name = jsonObject.Class_name;
        retVal.Dll_name = jsonObject.Dll_name;
        if (jsonObject.Max_words_displayed != null)
        {
            retVal.Max_words_displayed = jsonObject.Max_words_displayed;
        }
        if (jsonObject.Min_words_required != null)
        {
            retVal.Min_words_required = jsonObject.Min_words_required;
        }
        if (jsonObject.Num_sentences_required != null)
        {
            retVal.Num_sentences_required = jsonObject.Num_sentences_required;
        }
        if (jsonObject.Max_client_version != null)
        {
            retVal.Max_client_version = jsonObject.Max_client_version;
        }
        if (jsonObject.Min_client_version != null)
        {
            retVal.Min_client_version = jsonObject.Min_client_version;
        }
        retVal.Requires_text = jsonObject.Requires_text;
        retVal.Requires_test = jsonObject.Requires_test;
        retVal.Requires_wordlist = jsonObject.Requires_wordlist;
        retVal.Requires_question = jsonObject.Requires_question;
        retVal.Sequence = jsonObject.Sequence;
        retVal.Show = jsonObject.Show;
        if (jsonObject.Show_word_info != null)
        {
            retVal.Show_word_info = jsonObject.Show_word_info;
        }
        retVal.Type_id = jsonObject.Type_id;
        retVal.UsesComplexText = jsonObject.UsesComplexText;
        retVal.AControl_Activities = [];
        for  (var aControlActivityObject of jsonObject.AControl_Activities)
        {
            var aControlActivity:AControl_Activity = AControl_Activity.fromJson(aControlActivityObject);
            retVal.AControl_Activities.push(aControlActivity);
        }
        retVal.Requires_basic_test = jsonObject.Requires_basic_test;
        retVal.Full_size = jsonObject.Full_size;
        
        if (jsonObject.Adaptive_streaming_url != null)
        {
            retVal.Adaptive_streaming_url = jsonObject.Adaptive_streaming_url;
        }

        if(jsonObject.Display_multimedia_screen != null) {
            retVal.Display_multimedia_screen = jsonObject.Display_multimedia_screen;
        }

        if(jsonObject.Lesson_text != null) {
            retVal.Video_lesson_text = jsonObject.Lesson_text;
        }

        if(jsonObject.Lesson_image != null) {
            retVal.Video_lesson_image = jsonObject.Lesson_image;
        }

        if(jsonObject.Video_screenshot != null) {
            retVal.Video_lesson_screenshot = jsonObject.Video_screenshot;
        }

        return retVal;
    }
}