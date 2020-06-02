import { Prep_Program_Course } from '../db/Prep_Program_Course';
import { Author } from '../db/Author';

import { StringUtils } from '../../Utils/StringUtils';

export class Prep_Program_Info{

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

    private _about:string;
    public set About(val:string)
    {
        this._about = val;
    }
    public get About():string
    {
        return this._about;
    }

    private _benefits:string;
    public set Benefits(val:string)
    {
        this._benefits = val;
    }
    public get Benefits():string
    {
        return this._benefits;
    }

    private _features:string;
    public set Features(val:string)
    {
        this._features = val;
    }
    public get Features():string
    {
        return this._features;
    }

    private _intro:string;
    public set Intro(val:string)
    {
        this._intro = val;
    }
    public get Intro():string
    {
        return this._intro;
    }

    private _sales_page_link:string;
    public set Sales_page_link(val:string)
    {
        this._sales_page_link = val;
    }
    public get Sales_page_link():string
    {
        return this._sales_page_link;
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

    private _prep_program_courses:Prep_Program_Course[];
    public set Prep_Program_Courses(val:Prep_Program_Course[])
    {
        this._prep_program_courses = val;
    }
    public get Prep_Program_Courses():Prep_Program_Course[]
    {
        return this._prep_program_courses;
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

    private _exam:string;
    public set Exam(val:string)
    {
        this._exam = val;
    }
    public get Exam():string
    {
        return this._exam;
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

    private _authors:Author[];
    public set Authors(val:Author[])
    {
        this._authors = val;
    }
    public get Authors():Author[]
    {
        return this._authors;
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

    private _num_video_explanations:number;
    public set Num_video_explanations(val:number)
    {
        this._num_video_explanations = val;
    }
    public get Num_video_explanations():number
    {
        return this._num_video_explanations;
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
    
    private _program_intro_video:string;
    public set Program_intro_video(val:string)
    {
        this._program_intro_video = val;
    }
    public get Program_intro_video():string
    {
        return this._program_intro_video;
    }

    private _main_section_header:string;
    public set Main_section_header(val:string)
    {
        this._main_section_header = val;
    }
    public get Main_section_header():string
    {
        return this._main_section_header;
    }

    private _main_section_content:string;
    public set Main_section_content(val:string)
    {
        this._main_section_content = val;
    }
    public get Main_section_content():string
    {
        return this._main_section_content;
    }

    private _bullet_1:string;
    public set Bullet_1(val:string)
    {
        this._bullet_1 = val;
    }
    public get Bullet_1():string
    {
        return this._bullet_1;
    }

    private _bullet_2:string;
    public set Bullet_2(val:string)
    {
        this._bullet_2 = val;
    }
    public get Bullet_2():string
    {
        return this._bullet_2;
    }

    private _bullet_3:string;
    public set Bullet_3(val:string)
    {
        this._bullet_3 = val;
    }
    public get Bullet_3():string
    {
        return this._bullet_3;
    }

    private _section_1_header:string;
    public set Section_1_header(val:string)
    {
        this._section_1_header = val;
    }
    public get Section_1_header():string
    {
        return this._section_1_header;
    }

    private _section_1_content:string;
    public set Section_1_content(val:string)
    {
        this._section_1_content = val;
    }
    public get Section_1_content():string
    {
        return this._section_1_content;
    }

    private _question_card_text:string;
    public set Question_card_text(val:string)
    {
        this._question_card_text = val;
    }
    public get Question_card_text():string
    {
        return this._question_card_text;
    }

    private _video_explanation_card_text:string;
    public set Video_explanation_card_text(val:string)
    {
        this._video_explanation_card_text = val;
    }
    public get Video_explanation_card_text():string
    {
        return this._video_explanation_card_text;
    }

    private _video_lesson_card_text:string;
    public set Video_lesson_card_text(val:string)
    {
        this._video_lesson_card_text = val;
    }
    public get Video_lesson_card_text():string
    {
        return this._video_lesson_card_text;
    }

    private _section_2_header:string;
    public set Section_2_header(val:string)
    {
        this._section_2_header = val;
    }
    public get Section_2_header():string
    {
        return this._section_2_header;
    }

    private _section_2_content:string;
    public set Section_2_content(val:string)
    {
        this._section_2_content = val;
    }
    public get Section_2_content():string
    {
        return this._section_2_content;
    }

    private _guarantee_header:string;
    public set Guarantee_header(val:string)
    {
        this._guarantee_header = val;
    }
    public get Guarantee_header():string
    {
        return this._guarantee_header;
    }

    private _guarantee_content:string;
    public set Guarantee_content(val:string)
    {
        this._guarantee_content = val;
    }
    public get Guarantee_content():string
    {
        return this._guarantee_content;
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

    public static fromJson(jsonObject:any):Prep_Program_Info
    {
        var retVal:Prep_Program_Info = new Prep_Program_Info();

        retVal.Prep_program_id = jsonObject.Prep_program_id;
        retVal.Program_name = jsonObject.Program_name;
        retVal.About = StringUtils.DecodeFromJSONUri(jsonObject.About);
        retVal.Benefits = StringUtils.DecodeFromJSONUri(jsonObject.Benefits);
        retVal.Features = StringUtils.DecodeFromJSONUri(jsonObject.Features);
        retVal.Intro = StringUtils.DecodeFromJSONUri(jsonObject.Intro);
        retVal.Sales_page_link = StringUtils.DecodeFromJSONUri(jsonObject.Sales_page_link);
        retVal.Web_url = jsonObject.Web_url;
        retVal.Exam_id = jsonObject.Exam_id;
        retVal.Exam = jsonObject.Exam;
        retVal.Review_Score = jsonObject.Review_Score;

        retVal.Num_questions = jsonObject.Num_questions,
        retVal.Num_video_explanations = jsonObject.Num_video_explanations,
        retVal.Num_video_lessons = jsonObject.Num_video_lessons,

        retVal.Program_intro_video = jsonObject.Program_intro_video;
        retVal.Main_section_header = jsonObject.Main_section_header;
        retVal.Main_section_content = jsonObject.Main_section_content;
        retVal.Bullet_1 = jsonObject.Bullet_1;
        retVal.Bullet_2 = jsonObject.Bullet_2;
        retVal.Bullet_3 = jsonObject.Bullet_3;
        retVal.Section_1_header = jsonObject.Section_1_header;
        retVal.Section_1_content = jsonObject.Section_1_content;
        retVal.Question_card_text = jsonObject.Question_card_text;
        retVal.Video_explanation_card_text = jsonObject.Video_explanation_card_text;
        retVal.Video_lesson_card_text = jsonObject.Video_lesson_card_text;
        retVal.Section_2_header = jsonObject.Section_2_header;
        retVal.Section_2_content = jsonObject.Section_2_content;
        retVal.Guarantee_header = jsonObject.Guarantee_header;
        retVal.Guarantee_content = jsonObject.Guarantee_content;

        retVal.On_sale = jsonObject.On_sale;
        retVal.Sale_end_date = jsonObject.Sale_end_date;

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

        return retVal;
    }
}