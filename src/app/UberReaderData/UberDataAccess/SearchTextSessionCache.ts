import { DictionaryNumber } from '../Utils/Dictionary';

export class SearchTextSessionCache
{
    private textId:DictionaryNumber<number>;
    private idDictionaryLength:number = 0;
    constructor()
    {
        this.textId = {};
    }
    
    public addId(id:number):void
    {
        if(this.textId == null)
            this.textId = {};
        
        if(this.textId[id] == null)
        {
            this.idDictionaryLength++;
        }
        
        this.textId[id] = id;
    }
    
    public removeId(id:number):void
    {
        if(this.textId == null)
            this.textId = {};
        
        this.textId[id] = null;
        this.idDictionaryLength--;
    }
    
    public get length():number
    {
        if(this.textId == null)
            this.textId = {};
        
        return this.idDictionaryLength;
    }
    
    public dispose():void
    {
        this.textId = null;
    }
    
    public isPresent(id:number):boolean
    {
        if(this.textId == null)
            this.textId = {};
        
        return this.textId[id] != null;
    }
}