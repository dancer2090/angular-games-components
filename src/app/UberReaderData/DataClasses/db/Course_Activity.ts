import { Setting } from './Setting';
import { Course } from './Course';
import { Question } from './Question';
import { StringUtils } from '../../Utils/StringUtils';

export class Course_Activity
{
    private _course_activity_id:number;
    public get Course_activity_id():number
    {
        return this._course_activity_id;
    }
    public set Course_activity_id(value:number)
    {
        this._course_activity_id = value;
    }
    
    private _course_id:number;
    public get Course_id():number
    {
        return this._course_id;
    }
    public set Course_id(value:number)
    {
        this._course_id = value;
    }
    
    private _activity_id:number;
    public get Activity_id():number
    {
        return this._activity_id;
    }
    public set Activity_id(value:number)
    {
        this._activity_id = value;
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
    
    private _intro_title:string;
    public get Intro_title():string
    {
        return this._intro_title;
    }
    public set Intro_title(value:string)
    {
        this._intro_title = value;
    }
    
    private _intro_text:string;
    public get Intro_text():string
    {
        return this._intro_text;
    }
    public set Intro_text(value:string)
    {
        this._intro_text = value;
    }
    
    private _intro_countdown:number ;
    public get Intro_countdown():number
    {
        return this._intro_countdown;
    }
    public set Intro_countdown(value:number)
    {
        this._intro_countdown = value;
    }
    
    private _uses_intro:boolean;
    public get Uses_intro():boolean
    {
        return this._uses_intro;
    }
    public set Uses_intro(value:boolean)
    {
        this._uses_intro = value;
    }
    
    private _button_text:string;
    public get Button_text():string
    {
        return this._button_text;
    }
    public set Button_text(value:string)
    {
        this._button_text = value;
    }
    
    private _text_id:number ;
    public get Text_id():number
    {
        return this._text_id;
    }
    public set Text_id(value:number)
    {
        this._text_id = value;
    }
    
    private _question_id:number ;
    public get Question_id():number
    {
        return this._question_id;
    }
    public set Question_id(value:number)
    {
        this._question_id = value;
    }
    
    private _key_1:string;
    public get Key_1():string
    {
        return this._key_1;
    }
    public set Key_1(value:string)
    {
        this._key_1 = value;
    }
    
    private _key_1_min:number ;
    public get Key_1_min():number
    {
        return this._key_1_min;
    }
    public set Key_1_min(value:number)
    {
        this._key_1_min = value;
    }
    
    private _key_2:string;
    public get Key_2():string
    {
        return this._key_2;
    }
    public set Key_2(value:string)
    {
        this._key_2 = value;
    }
    
    private _key_2_min:number ;
    public get Key_2_min():number
    {
        return this._key_2_min;
    }
    public set Key_2_min(value:number)
    {
        this._key_2_min = value;
    }

    private _allow_in_preview:boolean ;
    public get Allow_in_preview():boolean
    {
        return this._allow_in_preview;
    }
    public set Allow_in_preview(value:boolean)
    {
        this._allow_in_preview = value;
    }
    
    private _course:Course;
    public get course():Course
    {
        return this._course;
    }
    public set course(value:Course)
    {
        this._course = value;
    }
    
    private _question:Question;
    public get question():Question
    {
        return this._question;
    }
    public set question(value:Question)
    {
        this._question = value;
    }
    
    private _settings:Setting[];
    public get Settings():Setting[]
    {
        return this._settings;
    }
    public set Settings(value:Setting[])
    {
        this._settings = value;
    }

    private _course_step_name:string
    public get Course_step_name():string
    {
        return this._course_step_name;
    }
    public set Course_step_name(value:string)
    {
        this._course_step_name = value;
    }
    
    public static fromJson(jsonObject:any):Course_Activity
    {
        let retVal:Course_Activity = new Course_Activity();
        retVal.Course_activity_id = jsonObject.Course_activity_id;
        retVal.Activity_id = jsonObject.Activity_id;
        retVal.Button_text = jsonObject.Button_text;
        retVal.Course_id = jsonObject.Course_id;
        
        if (jsonObject.Intro_countdown != null)
        {
            retVal.Intro_countdown = jsonObject.Intro_countdown;
        }
        retVal.Intro_text = jsonObject.Intro_text;
        retVal.Intro_title = jsonObject.Intro_title;
        retVal.Key_1 = jsonObject.Key_1 == "" ? null : jsonObject.Key_1;
        if (jsonObject.Key_1_min != null)
        {
            retVal.Key_1_min = jsonObject.Key_1_min;
        }        
        retVal.Key_2 = jsonObject.Key_2 == "" ? null : jsonObject.Key_2;
        if (jsonObject.Key_2_min != null)
        {
            retVal.Key_2_min = jsonObject.Key_2_min;
        }
        if (jsonObject.Allow_in_preview != null)
        {
            retVal.Allow_in_preview = jsonObject.Allow_in_preview
        }
        retVal.Sequence = jsonObject.Sequence;
        if (jsonObject.Text_id != null)
        {
            retVal.Text_id = jsonObject.Text_id;
        }
        if (jsonObject.Question_id != null)
        {
            retVal.Question_id = jsonObject.Question_id;
        }
        if (jsonObject.Question_id != null)
        {
            retVal.question = Question.fromJson(jsonObject.Question);
        }
        if (jsonObject.Course_step_name != null)
        {
            retVal.Course_step_name = StringUtils.DecodeFromJSONUri(jsonObject.Course_step_name);
        }
        
        retVal.Uses_intro = jsonObject.Uses_intro;
        retVal.Settings = [];
        for  (var settingObject of jsonObject.Settings)
        {
            var setting:Setting = Setting.fromJson(settingObject);
            retVal.Settings.push(setting);
        }
        
        return retVal;
    }
}