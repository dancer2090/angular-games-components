import { StringUtils } from '../../Utils/StringUtils';
export class SurveyReview {
    private user_id: number;
    private product_id: number;
    private purchase_source: string;
    private rating: number;
    private text_review: string;

    constructor(user_id: number, product_id: number, purchase_source?: string, rating?: number, text_review?: string) {
        this.user_id = user_id;
        this.product_id = product_id;
        this.purchase_source = purchase_source;
        this.rating = rating;
        this.text_review = text_review;
    }

    public get User_id(): number {
        return this.user_id;
    }

    public set User_id(value: number) {
        this.user_id = value
    }

    public get Product_id(): number {
        return this.product_id;
    }

    public set Product_id(value: number) {
        this.product_id = value
    }

    public get Purchase_source(): string {
        return this.purchase_source;
    }

    public set Purchase_source(value: string) {
        this.purchase_source = value
    }

    public get Rating(): number {
        return this.rating;
    }

    public set Rating(value: number) {
        this.rating = value
    }

    public get Text_review(): string {
        return this.text_review;
    }

    public set Text_review(value: string) {
        this.text_review = value
    }

    public static fromJson(jsonObject: any): SurveyReview {        
        let retVal: SurveyReview = new SurveyReview(jsonObject.User_id, jsonObject.Product_id);
        //retVal.User_id = jsonObject.User_id;
        //retVal.Product_id = jsonObject.Product_id;
        retVal.Purchase_source = StringUtils.DecodeFromJSONUri(jsonObject.Purchase_source);
        retVal.Rating = jsonObject.Rating;
        retVal.Text_review = StringUtils.DecodeFromJSONUri(jsonObject.Text_review);
        return retVal;
    }

    public toJson(): any {
        let jsonObject: any = {
            User_id: this.User_id,
            Product_id: this.Product_id,
            Purchase_source: StringUtils.EncodeToJSONUri(this.Purchase_source),
            Rating: this.Rating,
            Text_review: StringUtils.EncodeToJSONUri(this.Text_review),
        };
        return jsonObject;
    }
}