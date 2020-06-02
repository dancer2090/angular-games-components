import { UberApplicationEvent } from './UberApplicationEvent';
import { ProxyCourse } from '../DataClasses/other/ProxyCourse';

export class PrepRecommendationEvent extends UberApplicationEvent
{
    public static PREP_RECOMMENDATIONS_RECEIVED:string = "prepRecommendationsReceived";
    public static PREP_RECOMMENDATIONS_FAILED:string = "prepRecommendationsFailed";
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    private _personalRecommendations:ProxyCourse[];
    public get PersonalRecommendations():ProxyCourse[]
    {
        return this._personalRecommendations;
    }

    private _popularRecommendations:ProxyCourse[];
    public get PopularRecommendations():ProxyCourse[]
    {
        return this._popularRecommendations;
    }

    private _prepedRecommendations:ProxyCourse[];
    public get PrepEdRecommendations():ProxyCourse[]
    {
        return this._prepedRecommendations;
    }
    
    constructor(type:string, personalRecommendations:ProxyCourse[], popularRecommendations:ProxyCourse[], prepedRecommendations:ProxyCourse[], errMsg:string="")
	{
        super(type);
        this._personalRecommendations = personalRecommendations;
        this._popularRecommendations = popularRecommendations;
        this._prepedRecommendations = prepedRecommendations;
        this._errMsg = errMsg;
    }
    
    public clone():UberApplicationEvent
    {
        return new PrepRecommendationEvent(this.type, this._personalRecommendations, this._popularRecommendations, this._prepedRecommendations, this._errMsg);
    }
}