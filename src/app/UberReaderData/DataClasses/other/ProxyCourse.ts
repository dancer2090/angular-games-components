import { ISO8601Util } from '../../Utils/ISO8601Util';

import { Author } from '../db/Author';
import { ProxyCourseActivity } from './ProxyCourseActivity';
import { StringUtils } from '../../Utils/StringUtils';
export class ProxyCourse
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
    
    private _track_progress:boolean;
    public get Track_progress():boolean
    {
        return this._track_progress;
    }
    public set Track_progress(value:boolean)
    {
        this._track_progress = value;
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
    
    private _disabled_platforms:string;
    public get Disabled_platforms():string
    {
        return this._disabled_platforms;
    }
    public set Disabled_platforms(value:string)
    {
        this._disabled_platforms = value;
    }
    
    private _max_client_version:number;
    public get Max_client_version():number
    {
        return this._max_client_version;
    }
    public set Max_client_version(value:number)
    {
        this._max_client_version = value;
    }
    
    private _min_client_version:number;
    public get Min_client_version():number
    {
        return this._min_client_version;
    }
    public set Min_client_version(value:number)
    {
        this._min_client_version = value;
    }
    
    private _allow_review:boolean = false;
    public get Allow_review():boolean
    {
        return this._allow_review;
    }
    public set Allow_review(value:boolean)
    {
        this._allow_review = value;
    }
    
    // public get Is_included():boolean
    // {
    //     clientVersion:number = AppSettings.GetClientVersionCalculated();
    //     return ((this.Disabled_platforms == null || this.Disabled_platforms.toLowerCase().indexOf(AppSettings.GetClientTypeString().toLowerCase()) == -1)
    //                 && (this.Min_client_version == null || this.Min_client_version <= clientVersion)
    //                 && (this.Max_client_version == null || this.Max_client_version >= clientVersion));
    // }
    
    private _author:string;
    public get Author():string
    {
        return this._author;
    }
    public set Author(value:string)
    {
        this._author = value;
    }
    
    private _allow_download:boolean = null;
    public set Allow_download(val:boolean)
    {
        this._allow_download = val;
    }
    public get Allow_download():boolean
    {
        return this._allow_download;
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
    public get Last_updated_valueOf():Number
    {
        return this._last_updated != null ? this._last_updated.valueOf() : 0;
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

    private _num_reviews:number = null;
    public get Num_reviews():number
    {
        return this._num_reviews;
    }
    public set Num_reviews(value:number)
    {
        this._num_reviews = value;
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

    private _authors:Author[] = [];
    public get Authors():Author[]
    {
        return this._authors;
    }
    public set Authors(val:Author[])
    {
        this._authors = val;
    }

    private _proxyCourseActivities:ProxyCourseActivity[] = [];
    public get ProxyCourseActivities():ProxyCourseActivity[]
    {
        return this._proxyCourseActivities;
    }
    public set ProxyCourseActivities(val:ProxyCourseActivity[])
    {
        this._proxyCourseActivities = val;
    }

    private _proxyCourseActivitiesFirstHalf:ProxyCourseActivity[] = null;
    public get ProxyCourseActivitiesFirstHalf():ProxyCourseActivity[]
    {
        if (this._proxyCourseActivitiesFirstHalf == null)
        {
            this._proxyCourseActivitiesFirstHalf = this._proxyCourseActivities.slice(0, (this._proxyCourseActivities.length + 1) / 2);
        }
        return this._proxyCourseActivitiesFirstHalf;
    }

    private _proxyCourseActivitiesSecondHalf:ProxyCourseActivity[] = null;
    public get ProxyCourseActivitiesSecondHalf():ProxyCourseActivity[]
    {
        if (this._proxyCourseActivitiesSecondHalf == null)
        {
            this._proxyCourseActivitiesSecondHalf = this._proxyCourseActivities.slice((this._proxyCourseActivities.length + 1) / 2);
        }
        return this._proxyCourseActivitiesSecondHalf;
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
    
    private _course_type:string;
    public get Course_type():string
    {
        return this._course_type;
    }
    public set Course_type(value:string)
    {
        this._course_type = value;
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
    
    private _child_sections:string
    public get Child_sections():string
    {
        return this._child_sections;
    }
    public set Child_sections(val:string)
    {
        this._child_sections = val;
    }
    
    private _download_size:number = null;
    public get Download_size():number
    {
        return this._download_size;
    }
    public set Download_size(val:number)
    {
        this._download_size = val;
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

    private _exam_id:number;
    public get Exam_id():number
    {
        return this._exam_id;
    }
    public set Exam_id(value:number)
    {
        this._exam_id = value;
    }

    private _course_description:string;
    public get CourseDescription():string
    {
        return this._course_description;
    }
    public set CourseDescription(value:string)
    {
        this._course_description = value;
    }
    
    private _num_audio_lessons:number;
    public get Num_audio_lessons():number
    {
        return this._num_audio_lessons;
    }
    public set Num_audio_lessons(value:number)
    {
        this._num_audio_lessons = value;
    }

    private _num_text_exercises:number;
    public get Num_text_exercises():number
    {
        return this._num_text_exercises;
    }
    public set Num_text_exercises(value:number)
    {
        this._num_text_exercises = value;
    }

    private _num_games:number = null;
    public get Num_games():number
    {
        return this._num_games;
    }
    public set Num_games(value:number)
    {
        this._num_games = value;
    }

    public static fromJson(jsonObject:any):ProxyCourse
    {
        var retVal:ProxyCourse = new ProxyCourse();
        retVal.Course_id = jsonObject.Course_id;
        retVal.Course_name = jsonObject.Course_name;
        retVal.CourseDescription = StringUtils.DecodeFromJSONUri(jsonObject.Course_description);
        retVal.Track_progress = jsonObject.Track_progress;
        retVal.Course_length = jsonObject.Course_length;
        retVal.Allow_review = jsonObject.Allow_review;
        retVal.Author = jsonObject.Author;
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        retVal.Difficulty = jsonObject.Difficulty;
        retVal.Web_url = jsonObject.Web_url;
        retVal.Course_type = jsonObject.Course_type;
        retVal.Child_sections = jsonObject.Child_sections;
        
        retVal.Disabled_platforms = jsonObject.Disabled_platforms;
        retVal.Max_client_version = jsonObject.Max_client_version;
        retVal.Min_client_version = jsonObject.Min_client_version;
        retVal.Allow_download = jsonObject.Allow_download;
        retVal.Price = jsonObject.Price;
        retVal.Review_score = jsonObject.Review_Score;
        retVal.Num_reviews = jsonObject.Num_reviews;

        if(jsonObject.Authors && jsonObject.Authors.length > 0)
        {
            var authors:Author[] = [];
            for(var author of jsonObject.Authors)
            {
                authors.push(Author.fromJson(author));
            }
            retVal.Authors = authors;
        }

        if(jsonObject.Course_steps && jsonObject.Course_steps.length > 0)
        {
            var proxyCourseActivities:ProxyCourseActivity[] = [];
            for(var proxyCourseActivity of jsonObject.Course_steps)
            {
                proxyCourseActivities.push(ProxyCourseActivity.fromJson(proxyCourseActivity));
            }
            retVal.ProxyCourseActivities = proxyCourseActivities;
        }
        
        retVal.Num_questions = jsonObject.Num_questions;
        retVal.Num_video_explanations = jsonObject.Num_video_explanations;
        retVal.Num_video_lessons = jsonObject.Num_video_lessons;
        retVal.Parent_section_id = jsonObject.Parent_section_id;
        retVal.Download_size = jsonObject.Download_size;
        retVal.Exam_id = jsonObject.Exam_id;
        retVal.Num_audio_lessons = jsonObject.Num_audio_lessons;
        retVal.Num_text_exercises = jsonObject.Num_text_exercises;
        retVal.Num_games = jsonObject.Num_games;        
        
        return retVal;
    }
}