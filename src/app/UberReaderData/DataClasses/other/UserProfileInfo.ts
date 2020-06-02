export class UserProfileInfo
{
    private _exam_studying:string;
    public get Exam_studying():string
    {
        return this._exam_studying;
    }
    public set Exam_studying(value:string)
    {
        this._exam_studying = value;        
    }

    private _exam_date:Date;
    public get Exam_date():Date
    {
        return this._exam_date;
    }
    
    public set Exam_date(value:Date)
    {
        this._exam_date = value;        
    }

    private _native_english_speaker:boolean;
    public get Native_english_speaker():boolean
    {
        return this._native_english_speaker;
    }
    public set Native_english_speaker(value:boolean)
    {
        this._native_english_speaker = value;        
    }

    private _exam_biggest_challenge:string;
    public get Exam_biggest_challenge():string
    {
        return this._exam_biggest_challenge;
    }
    public set Exam_biggest_challenge(value:string)
    {
        this._exam_biggest_challenge = value;        
    }

    private _phone_num:string;
    public get Phone_num():string
    {
        return this._phone_num;
    }
    public set Phone_num(value:string)
    {
        this._phone_num = value;        
    }

    private _timezone_city:string;
    public get Timezone_city():string
    {
        return this._timezone_city;
    }
    public set Timezone_city(value:string)
    {
        this._timezone_city = value;        
    }

    private _best_time_to_call:string;
    public get Best_time_to_call():string
    {
        return this._best_time_to_call;
    }
    public set Best_time_to_call(value:string)
    {
        this._best_time_to_call = value;        
    }
    
    public toJson():any
    {
        var retVal:any = {
            Exam_Studying: this.Exam_studying,
            Exam_date: this.Exam_date ? this.Exam_date.toDateString() : this.Exam_date,
            Native_english_speaker: this.Native_english_speaker,
            Exam_biggest_challenge: this.Exam_biggest_challenge,
            Phone_num: this.Phone_num,
            Timezone_city: this.Timezone_city,
            Best_time_to_call: this.Best_time_to_call
        };        
        
        return retVal;
    }
}