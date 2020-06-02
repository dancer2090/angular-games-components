export class UpgradeOffer
{
    private _offer_Id: number;
    private _offer_title: string;
    private _offer_description: string;
    private _price: number;
    private _currency: string;
    private _appStoreProductId: string;
    private _playStoreInAppProductId: string;
    private _windowsStoreAddOnId: string;

    public get Offer_id():number
    {
        return this._offer_Id;
    }
    public set Offer_id(value:number)
    {
        this._offer_Id = value;
    }
        
    public get Offer_title():string
    {
        return this._offer_title;
    }
    public set Offer_title(value:string)
    {
        this._offer_title = value;
    }
        
    public get Offer_description():string
    {
        return this._offer_description;
    }
    public set Offer_description(value:string)
    {
        this._offer_description = value;
    }            
        
    public get Price():number
    {
        return this._price;
    }
    public set Price(value:number)
    {
        this._price = value;
    }

    public get Currency(): string
    {
        return this._currency;
    }
    public set Currency(value: string)
    {
        this._currency = value;
    }

    public get AppStoreProductId():string
    {
        return this._appStoreProductId;
    }
    public set AppStoreProductId(value:string)
    {
        this._appStoreProductId = value;
    }

    public get PlayStoreInAppProductId():string
    {
        return this._playStoreInAppProductId;
    }
    public set PlayStoreInAppProductId(value:string)
    {
        this._playStoreInAppProductId = value;
    }

    public get WindowsStoreAddOnId():string
    {
        return this._windowsStoreAddOnId;
    }
    public set WindowsStoreAddOnId(value:string)
    {
        this._windowsStoreAddOnId = value;
    }

    public static fromJson(jsonObject:any): UpgradeOffer
    {
        var retVal: UpgradeOffer = new UpgradeOffer();
        retVal.Offer_id = jsonObject.OfferId;
        retVal.Offer_title = jsonObject.OfferTitle;
        retVal.Offer_description = jsonObject.OfferDescText;        
        retVal.Price = jsonObject.Price;
        retVal.Currency = jsonObject.Currency;
        retVal.AppStoreProductId = jsonObject.AppStoreProductId;
        retVal.PlayStoreInAppProductId = jsonObject.PlayStoreInAppProductId;
        retVal.WindowsStoreAddOnId = jsonObject.WindowsStoreAddOnId;

        return retVal;
    }
}