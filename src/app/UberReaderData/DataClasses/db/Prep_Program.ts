import { Author } from './Author';
import { Offer } from './Offer';

import { Prep_Program_Course } from './Prep_Program_Course';

import { StringUtils } from '../../Utils/StringUtils';

export class Prep_Program
{
    private _prep_program_id:number;
    public set Prep_program_id(val:number)
    {
        this._prep_program_id = val;
    }
    public get Prep_program_id():number
    {
        return this._prep_program_id;
    }

    private _program_name:string;
    public set Program_name(val:string)
    {
        this._program_name = val;
    }
    public get Program_name():string
    {
        return this._program_name;
    }

    private _review_score:number;
    public set Review_Score(val:number)
    {
        this._review_score = val;
    }
    public get Review_Score():number
    {
        return this._review_score;
    }

    private _web_url:string;
    public set Web_url(val:string)
    {
        this._web_url = val;
    }
    public get Web_url():string
    {
        return this._web_url;
    }

    private _exam_id:number;
    public set Exam_id(val:number)
    {
        this._exam_id = val;
    }
    public get Exam_id():number
    {
        return this._exam_id;
    }

    private _num_courses:number;
    public set Num_courses(val:number)
    {
        this._num_courses = val;
    }
    public get Num_courses():number
    {
        return this._num_courses;
    }

    private _num_questions:number;
    public set Num_questions(val:number)
    {
        this._num_questions = val;
    }
    public get Num_questions():number
    {
        return this._num_questions;
    }

    private _num_video_lessons:number;
    public set Num_video_lessons(val:number)
    {
        this._num_video_lessons = val;
    }
    public get Num_video_lessons():number
    {
        return this._num_video_lessons;
    }

    private _num_video_explanations:number;
    public set Num_video_explanations(val:number)
    {
        this._num_video_explanations = val;
    }
    public get Num_video_explanations():number
    {
        return this._num_video_explanations;
    }

    private _authors:Author[];
    public set Authors(val:Author[])
    {
        this._authors = val;
    }
    public get Authors():Author[]
    {
        return this._authors;
    }

    private _prep_program_courses:Prep_Program_Course[];
    public set Prep_Program_Courses(val:Prep_Program_Course[])
    {
        this._prep_program_courses = val;
    }
    public get Prep_Program_Courses():Prep_Program_Course[]
    {
        return this._prep_program_courses;
    }

    private _offer:Offer[];
    public set Offers(val:Offer[])
    {
        this._offer = val;
    }
    public get Offers():Offer[]
    {
        return this._offer;
    }

    private _sale_end_date:Date = null;
    public get Sale_end_date():Date
    {
        return this._sale_end_date;
    }
    public set Sale_end_date(value:Date)
    {
        this._sale_end_date = value;
    }

    private _on_sale:boolean;
    public get On_sale():boolean
    {
        return this._on_sale;
    }
    public set On_sale(value:boolean)
    {
        this._on_sale = value;
    }

    public static fromJson(jsonObject:any):Prep_Program
    {
        var retVal:Prep_Program = new Prep_Program();

        retVal.Prep_program_id = jsonObject.Prep_program_id;
        retVal.Program_name = jsonObject.Program_name;
        retVal.Review_Score = jsonObject.Review_Score;
        retVal.Web_url = StringUtils.DecodeFromJSONUri(jsonObject.Web_url);
        retVal.Exam_id = jsonObject.Exam_id;
        retVal.Num_courses = jsonObject.Num_courses;
        
        retVal.On_sale = jsonObject.On_sale;
        retVal.Sale_end_date = jsonObject.Sale_end_date;

        if(jsonObject.Num_questions != null)
        {
            retVal.Num_questions = jsonObject.Num_questions;
        }
        
        if(jsonObject.Num_video_lessons != null)
        {
            retVal.Num_video_lessons = jsonObject.Num_video_lessons;
        }

        if(jsonObject.Num_video_explanations != null)
        {
            retVal.Num_video_explanations = jsonObject.Num_video_explanations;
        }
        
        if(jsonObject.Authors != null)
        {
            let authors:Author[] = [];
            for (let a of jsonObject.Authors)
            {
                authors.push(Author.fromJson(a));
            }            
            retVal.Authors = authors;
        }
        
        if(jsonObject.Prep_Program_Courses != null)
        {
            let courses:Prep_Program_Course[] = [];
            for (let p of jsonObject.Prep_Program_Courses)
            {
                courses.push(Prep_Program_Course.fromJson(p));
            }            
            retVal.Prep_Program_Courses = courses;
        }

        if(jsonObject.Offers != null)
        {
            let offers:Offer[] = [];
            for (let offer of jsonObject.Offers)
            {
                offers.push(Offer.fromJson(offer));
            }            
            retVal.Offers = offers;
        }

        return retVal;
    }
}