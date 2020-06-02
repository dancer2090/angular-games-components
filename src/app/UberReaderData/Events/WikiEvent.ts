import { UberApplicationEvent } from './UberApplicationEvent';

export class WikiEvent extends UberApplicationEvent
{
    private _wikiText:string;
    public get WikiText():string{ return this._wikiText; }
    
    private _wikiUrl:string;
    public get WikiUrl():string{ return this._wikiUrl; }
    
    private _title:string;
    public get Title():string{ return this._title; }
    
    private _readingLevel:string;
    public get ReadingLevel():string{ return this._readingLevel; }
    
    public static WIKI_SELECTED:string = "wikiSelected";
    
    constructor(type:string, wikiText:string, wikiUrl:string, title:string, readingLevel:string)
    {
        super(type);
        this._wikiText = wikiText;
        this._wikiUrl = wikiUrl;
        this._title = title;
        this._readingLevel = readingLevel;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new WikiEvent(this.type, this._wikiText, this._wikiUrl, this._title, this._readingLevel);
    }
}