import { NewsItem } from '../DataClasses/other/NewsItem';
import { UberApplicationEvent } from './UberApplicationEvent';

export class NewsItemsEvent extends UberApplicationEvent
{
    public static NEWS_ITEMS_RECEIVED:string = "newsItemsReceived";
    public static NEWS_ITEMS_ERROR:string = "newsItemsError";
    
    private _newsItems:NewsItem[];
    public get NewsItems():NewsItem[]
    {
        return this._newsItems;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, newsItems:NewsItem[], errorMessage:string=null)
    {
        super(type);
        this._newsItems = newsItems;
        this._errorMessage = errorMessage;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new NewsItemsEvent(this.type, this._newsItems, this._errorMessage);
    }
}