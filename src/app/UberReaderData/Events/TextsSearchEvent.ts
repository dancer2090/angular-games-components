import { SearchTextSessionCache } from '../UberDataAccess/SearchTextSessionCache';
import { ProxyText } from '../DataClasses/other/ProxyText';
import { SharedProxyText } from '../DataClasses/other/SharedProxyText';

import { UberApplicationEvent } from './UberApplicationEvent';

export class TextsSearchEvent extends UberApplicationEvent
{
    public static TEXTS_SEARCHED:string = "textsSearch";
    public static TEXT_SEARCHED_FAILED:string = "textSearchFailed";
    
    public static TEXTS_BROWSE:string = "textBrowse";
    public static TEXTS_BROWSE_FAILED:string = "textBrowseFailed";
    
    private _sharedTexts:SharedProxyText[];
    public get SharedTexts():SharedProxyText[]
    {
        return this._sharedTexts;
    }
    
    private _defaultTexts:ProxyText[];
    public get DefaultTexts():ProxyText[]
    {
        return this._defaultTexts;
    }
    
    private _userTexts:ProxyText[];
    public get UserTexts():ProxyText[]
    {
        return this._userTexts;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    private _numberOfpages:number;
    public get Number_Of_Pages():number
    {
        return this._numberOfpages;
    }
    
    private _searchCache:SearchTextSessionCache;
    public get SearchSession():SearchTextSessionCache
    {
        return this._searchCache;
    }
    
    constructor(type:string, defaultTexts:ProxyText[], userTexts:ProxyText[], sharedTexts:SharedProxyText[], numOfPages:number, searchSession:SearchTextSessionCache = null, errorMessage:string=null)
    {
        super(type);
        this._errorMessage = errorMessage;
        this._sharedTexts = sharedTexts;
        this._defaultTexts = defaultTexts;
        this._userTexts = userTexts;
        this._numberOfpages = numOfPages;
        this._searchCache = searchSession;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new TextsSearchEvent(this.type, this._defaultTexts, this._userTexts, this._sharedTexts, this._numberOfpages, this._searchCache, this._errorMessage);
    }
}