import { ISO8601Util } from '../../Utils/ISO8601Util';
import { StringUtils } from '../../Utils/StringUtils';

export class User_Question
{
    private _user_question_id:number;
    public get User_question_id():number
    {
        return this._user_question_id;
    }
    public set User_question_id(value:number)
    {
        this._user_question_id = value;
    }
    
    private _user_id:number;
    public get User_id():number
    {
        return this._user_id;
    }
    public set User_id(value:number)
    {
        this._user_id = value;
    }
    
    private _question_id:number;
    public get Question_id():number
    {
        return this._question_id;
    }
    public set Question_id(value:number)
    {
        this._question_id = value;
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
    
    private _answer:string;
    public get Answer():string
    {
        return this._answer;
    }
    public set Answer(value:string)
    {
        this._answer = value;
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
    
    private _deleted:boolean;
    public get Deleted():boolean
    {
        return this._deleted;
    }
    public set Deleted(value:boolean)
    {
        this._deleted = value;
    }

    private _time_taken:number = null;
    public get Time_taken():number
    {
        return this._time_taken;
    }
    public set Time_taken(value:number)
    {
        this._time_taken = value;
    }

    private _correct:boolean = null;
    public get Correct():boolean
    {
        return this._correct;
    }
    public set Correct(value:boolean)
    {
        this._correct = value;
    }

    private _explanation_video_length:number
    public get Explanation_video_length():number
    {
        return this._explanation_video_length;
    }
    public set Explanation_video_length(value:number)
    {
        this._explanation_video_length = value;
    }

    private _explanation_video_watched:number
    public get Explanation_video_watched():number
    {
        return this._explanation_video_watched;
    }
    public set Explanation_video_watched(value:number)
    {
        this._explanation_video_watched = value;
    }
    
    public static fromJson(jsonObject:any):User_Question
    {
        var retVal:User_Question = new User_Question();
        retVal.User_question_id = jsonObject.User_question_id;
        retVal.User_id = jsonObject.User_id;
        retVal.Question_id = jsonObject.Question_id;
        retVal.Course_id = jsonObject.Course_id;
        retVal.Answer = jsonObject.Answer;
        retVal.Last_updated = ISO8601Util.parseDateTimeString(jsonObject.Last_updated);
        retVal.Deleted = jsonObject.Deleted;
        
        if(jsonObject.Time_taken != null)
        {
            retVal.Time_taken = jsonObject.Time_taken;
        }

        if(jsonObject.Explanation_video_length != null)
        {
            retVal.Explanation_video_length = jsonObject.Explanation_video_length;
        }

        if(jsonObject.Explanation_video_watched != null)
        {
            retVal.Explanation_video_watched = jsonObject.Explanation_video_watched;
        }
        
        if(jsonObject.Correct != null)
        {
            retVal.Correct = jsonObject.Correct;
        }
        
        return retVal;
    }
    
    public toJson():any
    {
        var jsonObject:any = 
            {
                User_question_id: this.User_question_id,
                User_id: this.User_id,
                Question_id: this.Question_id,
                Course_id: this.Course_id,
                Answer: this.Answer,
                Last_updated: ISO8601Util.formatExtendedDateTime(this.Last_updated),
                Deleted: this.Deleted,
                Time_taken: this.Time_taken != null ? this.Time_taken : null,
                Correct: this.Correct != null ? this.Correct : null,
                Explanation_video_length: this.Explanation_video_length != null ? this.Explanation_video_length : null,
                Explanation_video_watched: this.Explanation_video_watched != null ? this.Explanation_video_watched : null
            };
        return jsonObject;
    }
}