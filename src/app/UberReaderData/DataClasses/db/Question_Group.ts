import { Course_Activity } from './Course_Activity';
import { StringUtils } from '../../Utils/StringUtils';

import { AppSettings } from '../../AppSettings';

export class Question_Group
{
    private _question_group_id:number;
    public get Question_group_id():number
    {
        return this._question_group_id;
    }
    public set Question_group_id(value:number)
    {
        this._question_group_id = value;
    }
    
    private _group_text:string;
    public get Group_text():string
    {
        var temp_group_text:string = this._group_text;
		var imgArr:string[] = temp_group_text.match(/\[IMG\[[^\]\s]+\]\]/ig);	
        if(imgArr != null && imgArr.length > 0)
        {
            var length:number = imgArr.length;
            for (let i:number=0; i<length; i++) {
                let imgSyntax:string = imgArr[i];
                let name:string = imgArr[i].substring(5, imgSyntax.length - 2);
                let url:string = "<img src='" + AppSettings.GetResourcelocation2(false) + "PrepEd/questionGroupData/" + this.Question_group_id + "/" + name + "'/>";
                
                temp_group_text = temp_group_text.replace(imgSyntax, url);
            }
        }
		
		return temp_group_text;
    }
    public set Group_text(value:string)
    {
        this._group_text = value;
    }
    
    private _group_image:string;
    public get Group_image():string
    {
        return this._group_image;
    }
    public set Group_image(value:string)
    {
        this._group_image = value;
    }
    
    private _type_id:number;
    public get Type_id():number
    {
        return this._type_id;
    }
    public set Type_id(value:number)
    {
        this._type_id = value;
    }
    
    private _group_tags:string;
    public get Group_tags():string
    {
        return this._group_tags;
    }
    public set Group_tags(value:string)
    {
        this._group_tags = value;
    }
    
    private _course_id:number;
    public get Course_id():number
    {
        return this._course_id;
    }
    public set Course_id(value:number)
    {
        this._course_id = value;
    }
    
    private _explanation_video:string;
    public get Explanation_video():string
    {
        return this._explanation_video;
    }
    public set Explanation_video(value:string)
    {
        this._explanation_video = value;
    }
    
    private _questions:Course_Activity[];
    public get Questions():Course_Activity[]
    {
        return this._questions;
    }
    public set Questions(value:Course_Activity[])
    {
        this._questions = value;
    }
    
    
    public static fromJson(jsonObject:any):Question_Group
    {
        var retVal:Question_Group = new Question_Group();
        retVal.Course_id = jsonObject.Course_id;
        retVal.Question_group_id = jsonObject.Question_group_id;
        retVal.Group_tags = StringUtils.DecodeFromJSONUri(jsonObject.Group_tags);
        retVal.Group_text = StringUtils.DecodeFromJSONUri(jsonObject.Group_text);
        retVal.Group_image = jsonObject.Group_image;
        retVal.Type_id = jsonObject.Type_id;
        retVal.Explanation_video = jsonObject.Explanation_video;
        retVal.Questions = [];
        
        return retVal;
    }
    
    public toJson():any
    {
        var retVal =  
        {
            Question_group_id: this._question_group_id,
            Group_tags: StringUtils.EncodeToJSONUri(this._group_tags),
            Group_text: StringUtils.EncodeToJSONUri(this._group_text),
            Type_id: this._type_id,
            Group_image: this._group_image,
            Course_id: this._course_id,
            Explanation_video: this._explanation_video
        };
        
        return retVal;
    }
}