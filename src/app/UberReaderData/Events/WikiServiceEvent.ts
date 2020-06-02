import { UberApplicationEvent } from './UberApplicationEvent';

export class WikiServiceEvent extends UberApplicationEvent
{
    public static WIKI_ARTICLE_ERROR:string = "wikiArticleError";
    public static WIKI_ARTICLE_TIMEOUT:string = "wikiArticleTimeout";
    public static WIKI_ARTICLE_RESULT:string = "wikiArticleResults";
    
    public static WIKI_SEARCH_ERROR:string = "wikiSearchError";
    public static WIKI_SEARCH_TIMEOUT:string = "wikiSearchTimeout";
    public static WIKI_SEARCH_RESULTS:string = "wikiSearchResults";
    
    private _result:any;
    public get Result():any
    {
        return this._result;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, result:any, errorMessage:string="")
    {
        super(type);
        this._result = result;
        this._errorMessage = errorMessage;
    }
}