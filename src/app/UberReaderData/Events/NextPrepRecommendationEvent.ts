import { UberApplicationEvent } from './UberApplicationEvent';
import { ProxyCourse } from '../DataClasses/other/ProxyCourse';

export class NextPrepRecommendationEvent extends UberApplicationEvent
{
    public static PREP_RECOMMENDATIONS_RECEIVED:string = "prepRecommendationsReceived";
    public static PREP_RECOMMENDATIONS_FAILED:string = "prepRecommendationsFailed";
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    private _nextRecommendedCourses:ProxyCourse[];
    public get NextRecommendedCourses():ProxyCourse[]
    {
        return this._nextRecommendedCourses;
    }

    constructor(type:string, nextRecommendedCourses:ProxyCourse[], errMsg:string="")
	{
        super(type);
        this._nextRecommendedCourses = nextRecommendedCourses;
        this._errMsg = errMsg;
    }
    
    public clone():UberApplicationEvent
    {
        return new NextPrepRecommendationEvent(this.type, this._nextRecommendedCourses, this._errMsg);
    }
}