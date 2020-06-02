import { ProxyWordlist } from '../other/ProxyWordlist';

export class Wordlist_Category
{
    private _wordlist_category_id:number;
    public get Wordlist_category_id():number
    {
        return this._wordlist_category_id;
    }
    public set Wordlist_category_id(value:number)
    {
        this._wordlist_category_id = value;
    }
    
    private _name:string;
    public get Name():string
    {
        return this._name;
    }
    public set Name(value:string)
    {
        this._name = value;
    }
    
    private _parent_category_id:number ;
    public get Parent_category_id():number
    {
        return this._parent_category_id;
    }
    public set Parent_category_id(value:number)
    {
        this._parent_category_id = value;
    }
    
    private _subCategories:Wordlist_Category[];
    public get SubCategories():Wordlist_Category[]
    {
        return this._subCategories;
    }
    public set SubCategories(value:Wordlist_Category[])
    {
        this._subCategories = value;
    }
    
    private _proxyWordlists:ProxyWordlist[];
    public get ProxyWordlists():ProxyWordlist[]
    {
        return this._proxyWordlists;
    }
    public set ProxyWordlists(value:ProxyWordlist[])
    {
        this._proxyWordlists = value;
    }
    
    public ContainsWordlist(wordlistName:string):boolean
    {
        for (var wl of this._proxyWordlists)
        {
            if (wl.Name.toLowerCase() == wordlistName.toLowerCase())
            {
                return true;
            }
        }
        for (var subCategory of this._subCategories)
        {
            if (subCategory.ContainsWordlist(wordlistName))
            {
                return true;
            }
        }
        return false;
    }
    
    public static fromJson(jsonObject:any):Wordlist_Category
    {
        let retVal:Wordlist_Category = new Wordlist_Category();
        retVal.Wordlist_category_id = jsonObject.Wordlist_category_id;
        retVal.Name = jsonObject.Name;
        if (jsonObject.Parent_category_id != null)
        {
            retVal.Parent_category_id = jsonObject.Parent_category_id;
        }
        retVal.SubCategories = [];
        if (jsonObject.SubCategories != null) {
            for  (let wordlistCategoryObject of jsonObject.SubCategories)
            {
                let wordlistCategory:Wordlist_Category = Wordlist_Category.fromJson(wordlistCategoryObject);
                retVal.SubCategories.push(wordlistCategory);
            }
        }
        
        retVal.ProxyWordlists = [];
        if (jsonObject.ProxyWordlists != null) {
            for  (let proxyWordlistObject of jsonObject.ProxyWordlists)
            {
                let proxyWordlist:ProxyWordlist = ProxyWordlist.fromJson(proxyWordlistObject);
                retVal.ProxyWordlists.push(proxyWordlist);
            }
        }
        return retVal;
    }
}