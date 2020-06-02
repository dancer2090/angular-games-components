import { ISO8601Util } from '../../Utils/ISO8601Util';

import { Course } from './Course';

export class User_Course
{
    private _user_course_id:number;
    public get User_course_id():number
    {
        return this._user_course_id;
    }
    public set User_course_id(value:number)
    {
        this._user_course_id = value;
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
    
    private _course_id:number;
    public get Course_id():number
    {
        return this._course_id;
    }
    public set Course_id(value:number)
    {
        this._course_id = value;
    }
    
    private _sequence_upto:number;
    public get Sequence_upto():number
    {
        return this._sequence_upto;
    }
    public set Sequence_upto(value:number)
    {
        this._sequence_upto = value;
    }
    
    private _finished:boolean;
    public get Finished():boolean
    {
        return this._finished;
    }
    public set Finished(value:boolean)
    {
        this._finished = value;
    }
    
    private _date:Date;
    public get _Date():Date
    {
        return this._date;
    }
    public set _Date(value:Date)
    {
        this._date = value;
    }
    
    private _date_finished:Date;
    public get Date_finished():Date
    {
        return this._date_finished;
    }
    public set Date_finished(value:Date)
    {
        this._date_finished = value;
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
    
    private _test_id:number ;
    public get Test_id():number
    {
        return this._test_id;
    }
    public set Test_id(value:number)
    {
        this._test_id = value;
    }
    
    private _step_position:number ;
    public get Step_position():number
    {
        return this._step_position;
    }
    public set Step_position(value:number)
    {
        this._step_position = value;
    }
    
    private _in_my_courses:boolean = null;
    public get In_my_courses():boolean
    {
        return this._in_my_courses;
    }
    public set In_my_courses(val:boolean)
    {
        this._in_my_courses = val;
    }
    
    private _on_wishlist:boolean = null;
    public get On_wishlist():boolean
    {
        return this._on_wishlist;
    }
    public set On_wishlist(val:boolean)
    {
        this._on_wishlist = val;
    }
    
    private _questions_answered:number = null;
    public get Questions_answered():number
    {
        return this._questions_answered;
    }
    public set Questions_answered(val:number)
    {
        this._questions_answered = val;
    }

    private _seen:boolean = null;
    public get Seen():boolean
    {
        return this._seen;
    }
    public set Seen(val:boolean)
    {
        this._seen = val;
    }

    private _score:number = null;
    public get Score():number
    {
        return this._score;
    }
    public set Score(val:number)
    {
        this._score = val;
    }

    private _percentile:number = null;
    public get Percentile():number
    {
        return this._percentile;
    }
    public set Percentile(val:number)
    {
        this._percentile = val;
    }
    
    public static fromJson(jsonObject:any):User_Course
    {
        var retVal:User_Course = new User_Course();
        retVal.User_course_id = jsonObject.User_course_id;
        retVal.Course_id = jsonObject.Course_id;
        retVal.User_id = jsonObject.User_id;
        retVal.Finished = jsonObject.Finished;
        retVal.Sequence_upto = jsonObject.Sequence_upto;
        retVal._Date = ISO8601Util.parseDateTimeString(jsonObject.Date);
        if(jsonObject.Date_finished != null)
        {
            retVal.Date_finished = ISO8601Util.parseDateTimeString(jsonObject.Date_finished);
        }
        
        if(jsonObject.Test_id != null)
        {
            retVal.Test_id = jsonObject.Test_id;
        }
        
        if(jsonObject.Step_position != null)
        {
            retVal.Step_position = jsonObject.Step_position;
        }
        if(jsonObject.In_my_courses != null)
        {
            retVal.In_my_courses = jsonObject.In_my_courses;
        }
        
        if(jsonObject.On_wishlist != null)
        {
            retVal.On_wishlist = jsonObject.On_wishlist;
        }
        
        if(jsonObject.Questions_answered != null)
        {
            retVal.Questions_answered = jsonObject.Questions_answered;
        }

        if(jsonObject.Seen != null)
        {
            retVal.Seen = jsonObject.Seen;
        }

        if(jsonObject.Score != null)
        {
            retVal.Score = jsonObject.Score;
        }

        if(jsonObject.Percentile != null)
        {
            retVal.Percentile = jsonObject.Percentile;
        }
        
        return retVal;
    }
    
    public toJson():any
    {
        var jsonObject:any = 
            {
                User_course_id: this.User_course_id,
                Course_id: this.Course_id,
                User_id: this.User_id,
                Finished: this.Finished,
                Sequence_upto: this.Sequence_upto,
                Test_id: this.Test_id != null ? this.Test_id : null,
                Step_position: this.Step_position != null ? this.Step_position : null,
                On_wishlist: this.On_wishlist != null ? this.On_wishlist : null,
                In_my_courses: this.In_my_courses != null ? this.In_my_courses : null,
                Questions_answered: this.Questions_answered != null ? this.Questions_answered : null,
                Seen: this.Seen != null ? this.Seen : null
                //Score: this.Score != null ? this.Score : null,
                //Percentile: this.Percentile != null ? this.Percentile : null
            };
        return jsonObject;
    }

    public toJSON():any
    {
        return {
            _user_course_id: this._user_course_id,
            _user_id: this._user_id,
            _course_id: this._course_id,
            _sequence_upto: this._sequence_upto,
            _finished: this._finished,
            _date: this._date,
            _date_finished: this._date_finished,
            _test_id: this._test_id,
            _step_position: this._step_position,
            _in_my_courses: this._in_my_courses,
            _on_wishlist: this._on_wishlist,
            _questions_answered: this._questions_answered,
            _seen: this._seen,
            _score: this._score,
            _percentile: this._percentile,
        };
    }
}