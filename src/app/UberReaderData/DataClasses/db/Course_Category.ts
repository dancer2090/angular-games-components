import { ProxyCourse } from '../other/ProxyCourse';

export class Course_Category
{
    private _course_category_id:number;
    public get Course_category_id():number
    {
        return this._course_category_id;
    }
    public set Course_category_id(value:number)
    {
        this._course_category_id = value;
    }
    
    private _description:string;
    public get Description():string
    {
        return this._description;
    }
    public set Description(value:string)
    {
        this._description = value;
    }
    
    private _icon:string;
    public get Icon():string
    {
        return this._icon;
    }
    public set Icon(value:string)
    {
        this._icon = value;
    }
    
    private _uses_certificate:boolean ;
    public get Uses_certificate():boolean
    {
        return this._uses_certificate;
    }
    public set Uses_certificate(value:boolean)
    {
        this._uses_certificate = value;
    }
    
    private _certificate_tagline:string;
    public get Certificate_tagline():string
    {
        return this._certificate_tagline;
    }
    public set Certificate_tagline(value:string)
    {
        this._certificate_tagline = value;
    }
    
    private _enable_preq:boolean;
    public get Enable_preq():boolean
    {
        return this._enable_preq;
    }
    public set Enable_preq(value:boolean)
    {
        this._enable_preq = value;
    }
    
    // Change to ProxyCourses
    private _proxy_courses:ProxyCourse[]
    public get ProxyCourses():ProxyCourse[]
    {
        return this._proxy_courses;
    }
    public set ProxyCourses(value:ProxyCourse[])
    {
        this._proxy_courses = value;
    }
    
    public static fromJson(jsonObject:any):Course_Category
    {
        var retVal:Course_Category = new Course_Category();
        retVal.Course_category_id = jsonObject.Course_category_id;
        retVal.Certificate_tagline = jsonObject.Certificate_tagline;
        retVal.Description = jsonObject.Desctiption;			
        retVal.Icon = jsonObject.Icon;
        retVal.Enable_preq = jsonObject.Enable_preq;
        
        if (jsonObject.Uses_certificate != null)
        {
            retVal.Uses_certificate = jsonObject.Uses_certificate;
        }
        retVal.ProxyCourses = [];
        for  (var courseObject of jsonObject.Courses)
        {
            var course:ProxyCourse = ProxyCourse.fromJson(courseObject);
            //course.course_category = retVal;
            //if(course.Is_included)
            //{
                retVal.ProxyCourses.push(course);
            //}
        }
        
        return retVal;
    }
}