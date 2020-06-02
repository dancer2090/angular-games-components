import { ProxyActivity } from '../other/ProxyActivity';
import { ProxyCourse } from '../other/ProxyCourse';

export class Activity_Category
{
    private _activity_category_id:number;
    public get Activity_category_id():number
    {
        return this._activity_category_id;
    }
    public set Activity_category_id(value:number)
    {
        this._activity_category_id = value;
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
    
    // Change to ProxyCourses
    private _proxy_activities:ProxyActivity[]
    public get ProxyActivities():ProxyActivity[]
    {
        return this._proxy_activities;
    }
    public set ProxyActivities(value:ProxyActivity[])
    {
        this._proxy_activities = value;
    }
    
    public static fromJson(jsonObject:any):Activity_Category
    {
        var retVal:Activity_Category = new Activity_Category();
        retVal.Activity_category_id = jsonObject.Activity_category_id;
        retVal.Description = jsonObject.Desctiption;
        retVal.Icon = jsonObject.Icon;
        
        retVal.ProxyActivities = [];
        for  (var activityObject of jsonObject.Activities)
        {
            var activity:ProxyActivity = ProxyActivity.fromJson(activityObject);
            //course.course_category = retVal;				
            //if(activity.Is_included)
            //{
                retVal.ProxyActivities.push(activity);
            //}
        }
        
        return retVal;
    }
}