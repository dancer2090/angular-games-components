import { Author } from '../db/Author';
import { ISO8601Util } from '../../Utils/ISO8601Util';
import { StringUtils } from '../../Utils/StringUtils';

export class CourseInfo
{
    private _course_id:number;
    public get Course_id():number
    {
        return this._course_id;
    }
    public set Course_id(value:number)
    {
        this._course_id = value;
    }
    
    private _course_name:string;
    public get Course_name():string
    {
        return this._course_name;
    }
    public set Course_name(value:string)
    {
        this._course_name = value;
    }
    
    private _allow_preview:boolean = null;
    public get Allow_preview():boolean
    {
        return this._allow_preview;
    }
    public set Allow_preview(value:boolean)
    {
        this._allow_preview = value;
    }
    
    private _child_sections:string;
    public get Child_sections():string
    {
        return this._child_sections;
    }
    public set Child_sections(value:string)
    {
        this._child_sections = value;
    }
    
    private _course_length:number;
    public get Course_length():number
    {
        return this._course_length;
    }
    public set Course_length(value:number)
    {
        this._course_length = value;
    }
    
    private _last_updated:Date;
    public get Last_updated():Date
    {
        return this._last_updated;
    }
    public set Last_updated(value:Date)
    {
        this._last_updated = value;
    }
    
    private _difficulty:string;
    public get Difficulty():string
    {
        return this._difficulty;
    }
    public set Difficulty(value:string)
    {
        this._difficulty = value;
    }
    
    private _course_description:string;
    public get Course_description():string
    {
        return this._course_description;
    }
    public set Course_description(value:string)
    {
        this._course_description = value;
    }
    
    private _exam_other:string;
    public get Exam_other():string
    {
        return this._exam_other;
    }
    public set Exam_other(value:string)
    {
        this._exam_other = value;
    }
    
    private _short_description:string;
    public get Short_description():string
    {
        return this._short_description;
    }
    public set Short_description(value:string)
    {
        this._short_description = value;
    }
    
    private _max_client_version:number = null;
    public get Max_client_version():number
    {
        return this._max_client_version;
    }
    public set Max_client_version(value:number)
    {
        this._max_client_version = value;
    }
    
    private _min_client_version:number = null;
    public get Min_client_version():number
    {
        return this._min_client_version;
    }
    public set Min_client_version(value:number)
    {
        this._min_client_version = value;
    }
    
    private _price:number = null;
    public get Price():number
    {
        return this._price;
    }
    public set Price(value:number)
    {
        this._price = value;
    }

    private _review_score:number = null;
    public get Review_score():number
    {
        return this._review_score;
    }
    public set Review_score(value:number)
    {
        this._review_score = value;
    }
    
    private _exam_id:number = null;
    public get Exam_id():number
    {
        return this._exam_id;
    }
    public set Exam_id(val:number)
    {
        this._exam_id = val;
    }
    
    private _parent_section_id:number = null;
    public get Parent_section_id():number
    {
        return this._parent_section_id;
    }
    public set Parent_section_id(val:number)
    {
        this._parent_section_id = val;
    }
            
    private _status_id:number = null;
    public get Status_id():number
    {
        return this._status_id;
    }
    public set Status_id(val:number)
    {
        this._status_id = val;
    }
    
    private _authors:Author[] = [];
    public get Authors():Author[]
    {
        return this._authors;
    }
    public set Authors(val:Author[])
    {
        this._authors = val;
    }
    
    private _web_url:string;
    public get Web_url():string
    {
        return this._web_url;
    }
    public set Web_url(value:string)
    {
        this._web_url = value;
    }

    private _num_questions:number = null;
    public get Num_questions():number
    {
        return this._num_questions;
    }
    public set Num_questions(value:number)
    {
        this._num_questions = value;
    }

    private _num_video_explanations:number = null;
    public get Num_video_explanations():number
    {
        return this._num_video_explanations;
    }
    public set Num_video_explanations(value:number)
    {
        this._num_video_explanations = value;
    }

    private _num_video_lessons:number = null;
    public get Num_video_lessons():number
    {
        return this._num_video_lessons;
    }
    public set Num_video_lessons(value:number)
    {
        this._num_video_lessons = value;
    }

    private _num_students:number = null;
    public get Num_students():number
    {
        return this._num_students;
    }
    public set Num_students(value:number)
    {
        this._num_students = value;
    }

    private _intro:string;
    public get Intro():string
    {
        return this._intro;
    }
    public set Intro(value:string)
    {
        this._intro = value;
    }

    private _about:string;
    public get About():string
    {
        return this._about;
    }
    public set About(value:string)
    {
        this._about = value;
    }

    private _features:string;
    public get Features():string
    {
        return this._features;
    }
    public set Features(value:string)
    {
        this._features = value;
    }

    private _benefits:string;
    public get Benefits():string
    {
        return this._benefits;
    }
    public set Benefits(value:string)
    {
        this._benefits = value;
    }
    
    public static fromJson(jsonObject:any):CourseInfo
    {
        var retVal:CourseInfo = new CourseInfo();
        retVal.Course_id = jsonObject.Course_id;
        retVal.Course_name = jsonObject.Course_name;
        retVal.Course_length = jsonObject.Course_length;
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        retVal.Difficulty = jsonObject.Difficulty;
        retVal.Child_sections = jsonObject.Child_Sections;
        retVal.Course_description = StringUtils.DecodeFromJSONUri(jsonObject.Course_description);
        retVal.Exam_other = jsonObject.Exam_other;
        retVal.Short_description = jsonObject.Short_description;
        retVal.Web_url = jsonObject.Web_url;
        if(jsonObject.Max_client_version != null)
        {
            retVal.Max_client_version = jsonObject.Max_client_version;
        }
        
        if(jsonObject.Min_client_version != null)
        {
            retVal.Min_client_version = jsonObject.Min_client_version;
        }
        
        if(jsonObject.Price != null)
        {
            retVal.Price = jsonObject.Price;
        }

        if(jsonObject.Review_Score != null)
        {
            retVal.Review_score = jsonObject.Review_Score;
        }
        
        if(jsonObject.Allow_preview != null)
        {
            retVal.Allow_preview = jsonObject.Allow_preview;
        }
        
        if(jsonObject.Exam_id != null)
        {
            retVal.Exam_id = jsonObject.Exam_id;
        }
        
        if(jsonObject.Parent_section_id != null)
        {
            retVal.Parent_section_id = jsonObject.Parent_section_id;
        }
        
        if(jsonObject.Status_id != null)
        {
            retVal.Status_id = jsonObject.Status_id;
        }
        
        if(jsonObject.Authors && jsonObject.Authors.length > 0)
        {
            var authors:Author[] = [];
            for (var author of jsonObject.Authors)
            {
                authors.push(Author.fromJson(author));
            }
            retVal.Authors = authors;
        }

        if(jsonObject.Num_questions != null)
        {
            retVal.Num_questions = jsonObject.Num_questions;
        }
        
        if(jsonObject.Num_video_explanations != null)
        {
            retVal.Num_video_explanations = jsonObject.Num_video_explanations;
        }
        
        if(jsonObject.Num_video_lessons != null)
        {
            retVal.Num_video_lessons = jsonObject.Num_video_lessons;
        }

        if(jsonObject.Num_students != null)
        {
            retVal.Num_students = jsonObject.Num_students;
        }

        if(jsonObject.Intro != null)
        {
            retVal.Intro = jsonObject.Intro;
        }

        if(jsonObject.About != null)
        {
            retVal.About = jsonObject.About;
        }

        if(jsonObject.Features != null)
        {
            retVal.Features = jsonObject.Features;
        }

        if(jsonObject.Benefits != null)
        {
            retVal.Benefits = jsonObject.Benefits;
        }
        
        return retVal;
    }
}