export class Offer
{
    private _offer_Id:number;
    public get Offer_id():number
    {
        return this._offer_Id;
    }
    public set Offer_id(value:number)
    {
        this._offer_Id = value;
    }
    
    private _offer_title:string;
    public get Offer_title():string
    {
        return this._offer_title;
    }
    public set Offer_title(value:string)
    {
        this._offer_title = value;
    }
    
    private _offer_description:string;
    public get Offer_description():string
    {
        return this._offer_description;
    }
    public set Offer_description(value:string)
    {
        this._offer_description = value;
    }
    
    private _appStoreProductId:string;
    public get App_store_product_id():string
    {
        return this._appStoreProductId;
    }
    public set App_store_product_id(value:string)
    {
        this._appStoreProductId = value;
    }
    
    private _numUsers:number;
    public get Num_users():number
    {
        return this._numUsers;
    }
    public set Num_users(value:number)
    {
        this._numUsers = value;
    }
    
    private _numDays:number;
    public get Num_days():number
    {
        return this._numDays;
    }
    public set Num_days(value:number)
    {
        this._numDays = value;
    }

    private _course_id:number = null;
    public get Course_id():number
    {
        return this._course_id;
    }
    public set Course_id(value:number)
    {
        this._course_id = value;
    }

    private _prep_program_id:number = null;
    public get Prep_program_id():number
    {
        return this._prep_program_id;
    }
    public set Prep_program_id(value:number)
    {
        this._prep_program_id = value;
    }

    private _price:number;
    public get Price():number
    {
        return this._price;
    }
    public set Price(value:number)
    {
        this._price = value;
    }

    private _isSale:boolean;
    public get IsSale():boolean
    {
        return this._isSale;
    }
    public set IsSale(value:boolean)
    {
        this._isSale = value;
    }

    private _originalOfferId:number = null;
    public get OriginalOfferId():number
    {
        return this._originalOfferId;
    }
    public set OriginalOfferId(value:number)
    {
        this._originalOfferId = value;
    }
    
    public static fromJson(jsonObject:any):Offer
    {
        var retVal:Offer = new Offer();
        retVal.Offer_id = jsonObject.OfferId;
        retVal.Offer_title = jsonObject.OfferTitle;
        retVal.Offer_description = jsonObject.OfferDescText;
        retVal.App_store_product_id = jsonObject.AppStoreProductId;
        retVal.Num_users = jsonObject.NumUsers;
        retVal.Num_days = jsonObject.NumDays;
        retVal.Price = jsonObject.Price;
        retVal.IsSale = jsonObject.isSale;

        if(jsonObject.PrepProgramId != null)
        {
             retVal.Prep_program_id = jsonObject.PrepProgramId;
        }

        if(jsonObject.CourseId != null)
        {
            retVal.Course_id = jsonObject.CourseId;
        }

        if(jsonObject.OriginalOfferId != null)
        {
             retVal.OriginalOfferId = jsonObject.OriginalOfferId;
        }

        return retVal;
    }
}