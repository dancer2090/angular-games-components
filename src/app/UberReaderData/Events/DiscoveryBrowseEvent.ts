import { UberApplicationEvent } from './UberApplicationEvent';
import { ProxyCourse } from '../DataClasses/other/ProxyCourse';

export class DiscoveryBrowseEvent extends UberApplicationEvent
{
    public static COURSES_RECEIVED:string = "discoveryCoursesReceived";
    public static COURSES_FAILED:string = "discoveryCoursesFailed";

    public static PREP_RECOMMENDATIONS_RECEIVED:string = "prepRecommendationsReceived";
    public static PREP_RECOMMENDATIONS_FAILED:string = "prepRecommendationsFailed";
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    private _proxyCourses:ProxyCourse[];
    public get Courses():ProxyCourse[]
    {
        return this._proxyCourses;
    }
    
    private _pageNum:number = 0;
    public get PageNumber():number
    {
        return this._pageNum;
    }
    
    private _numOfPages:number = 0;
    public get NumberOfPages():number
    {
        return this._numOfPages;
    }
    
    constructor(type:string, proxyCourses:ProxyCourse[], pageNum:number, numOfPages:number, errMsg:string="")
		{
        super(type);
        this._proxyCourses = proxyCourses;
        this._errMsg = errMsg;
        this._pageNum = pageNum;
        this._numOfPages = numOfPages;
    }
    
    public clone():UberApplicationEvent
    {
        return new DiscoveryBrowseEvent(this.type, this._proxyCourses, this._pageNum, this._numOfPages, this._errMsg);
    }
}