import { UberApplicationEvent } from './UberApplicationEvent';

export class VocabSyncEvent extends UberApplicationEvent
{
    public static VOCAB_DATA_SYNC:string = "vocabDataSync";
    
    private _refreshCurrentWordlist:boolean;
    public get RefreshCurrentWordlist():boolean
    {
        return this._refreshCurrentWordlist;
    }
    
    private _resetWordlist:boolean;
    public get ResetWordlist():boolean
    {
        return this._resetWordlist;
    }
    
    public set ResetWordlist(value:boolean)
    {
        this._resetWordlist = value;
    }
    
    private _refreshWordDiscovers:boolean;
    public get RefreshWordDiscovers():boolean
    {
        return this._refreshWordDiscovers;
    }
    
    constructor(type:string, refreshCurrentWordlist:boolean, resetWordlist:boolean, refreshWordDiscovers:boolean)
    {
        super(type);
        this._refreshCurrentWordlist = refreshCurrentWordlist;
        this._resetWordlist = resetWordlist;
        this._refreshWordDiscovers = refreshWordDiscovers;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new VocabSyncEvent(this.type, this._refreshCurrentWordlist, this._resetWordlist, this._refreshWordDiscovers);
    }
}