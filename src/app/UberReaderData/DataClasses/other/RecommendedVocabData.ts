export class RecommendedVocabData
{
    private _more_info_link:string;
	public set More_info_link(val:string)
	{
		this._more_info_link = val;
	}
	public get More_info_link():string
	{
		return this._more_info_link;
	}
	
	private _product_id:number;
	public set Product_id(val:number)
	{
		this._product_id = val;
	}
	public get Product_id():number
	{
		return this._product_id;
	}
	
	private _product_name:string;
	public set Product_name(val:string)
	{
		this._product_name = val;
	}
	public get Product_name():string
	{
		return this._product_name;
	}
	
	public static  fromJson(jsonObject:any):RecommendedVocabData
	{
		var retVal:RecommendedVocabData = new RecommendedVocabData();
		retVal.More_info_link = jsonObject.More_info_link;
		retVal.Product_id = jsonObject.ProductId;
		retVal.Product_name = jsonObject.ProductName;
		return retVal;
	}
}