import { Course_Activity } from './Course_Activity';

export class Course
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
    
    private _allow_navigation:boolean;
    public get Allow_navigation():boolean
    {
        return this._allow_navigation;
    }
    public set Allow_navigation(value:boolean)
    {
        this._allow_navigation = value;
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
    
    private _course_activities:Course_Activity[];
    public get Course_Activities():Course_Activity[]
    {
        return this._course_activities;
    }
    public set Course_Activities(value:Course_Activity[])
    {
        this._course_activities = value;
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
    
    private _author:string;
    public get Author():string
    {
        return this._author;
    }
    public set Author(value:string)
    {
        this._author = value;
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

    private _preview_sales_text:string;
    public get Preview_sales_text():string
    {
        return this._preview_sales_text;
    }
    public set Preview_sales_text(value:string)
    {
        this._preview_sales_text = value;
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
    
    public static fromJson(jsonObject:any):Course
    {
        var retVal:Course = new Course();
        retVal.Course_id = jsonObject.Course_id;
        retVal.Allow_navigation = jsonObject.Allow_navigation;
        retVal.Course_name = jsonObject.Course_name;
        retVal.Track_progress = jsonObject.Track_progress;
        retVal.Course_Activities = [];
        retVal.Allow_review = jsonObject.Allow_review;
        retVal.Author = jsonObject.Author;
        retVal.Course_type = jsonObject.Course_type;
        retVal.Preview_sales_text = jsonObject.Preview_sales_text;
        
        if(jsonObject.Price != null)
        {
            retVal.Price = jsonObject.Price;
        }
        
        for (var courseActivityObject of jsonObject.Course_Activities)
        {
            //var activity:Activity = UberApplication.GetInstance().getActivityById(courseActivityObject.Activity_id);
            //if(activity.Is_included)
            //{
            var courseActivity:Course_Activity = Course_Activity.fromJson(courseActivityObject);
            courseActivity.course = retVal;
            retVal.Course_Activities.push(courseActivity);
            //}
        }
        
        return retVal;
    }
}