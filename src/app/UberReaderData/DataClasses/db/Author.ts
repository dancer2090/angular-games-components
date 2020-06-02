export class Author
{
    private _author_id:number;
    public  get Author_id():number
    {
        return this._author_id;
    }
    public  set Author_id(val:number)
    {
        this._author_id = val;
    }

    private _author_title:string;
    public  get Author_title():string
    {
        return this._author_title;
    }
    public  set Author_title(val:string)
    {
        this._author_title = val;
    }
    
    private _biography:string
    public  get Biography():string
    {
        return this._biography;
    }
    public  set Biography(val:string)
    {
        this._biography = val;
    }
    
    private _name:string;
    public  get Name():string
    {
        return this._name;
    }
    public  set Name(val:string)
    {
        this._name = val;
    }
    
    private _profile_pic:string;
    public  get Profile_picture():string
    {
        return this._profile_pic;
    }
    public  set Profile_picture(val:string)
    {
        this._profile_pic = val;
    }

    private _author_web_url:string;
    public  get Author_web_url():string
    {
        return this._author_web_url;
    }
    public  set Author_web_url(val:string)
    {
        this._author_web_url = val;
    }

    private _num_students:number;
    public  get Num_students():number
    {
        return this._num_students;
    }
    public  set Num_students(val:number)
    {
        this._num_students = val;
    }

    private _num_reviews:string;
    public  get Num_reviews():string
    {
        return this._num_reviews;
    }
    public  set Num_reviews(val:string)
    {
        this._num_reviews = val;
    }
    
    public static  fromJson(jsonObject:any):Author
    {        
        var retVal:Author = new Author();
        retVal.Author_id = jsonObject.Author_id;
        retVal.Author_title = jsonObject.Author_title;
        retVal.Biography = jsonObject.Biography;
        retVal.Name = jsonObject.Name;
        retVal.Profile_picture = jsonObject.Profile_pic;
        retVal.Author_web_url = jsonObject.Author_web_url;
        retVal.Num_reviews = jsonObject.Num_reviews;
        retVal.Num_students = jsonObject.Num_students;
        return retVal;
    }
}