import { UberApplicationEvent } from './UberApplicationEvent';

export class WordlistVisibilityEvent extends UberApplicationEvent
{
    public static WORDLIST_VISIBILITY_CHANGED:string = "wordlistVisibilityChanged";
    
    private _isPublic:boolean;
	public get IsPublic():boolean
	{
		return this._isPublic;
	}
    
    constructor(type:string, isPublic:boolean)
    {
        super(type);
        this._isPublic = isPublic;
    }
    
    public clone():UberApplicationEvent
    {
        return new WordlistVisibilityEvent(this.type, this._isPublic);
    }
    
}