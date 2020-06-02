import { UberApplication } from '../../UberApplication';
import { Question_Group } from './Question_Group';
import { StringUtils } from '../../Utils/StringUtils';
import { AppSettings } from '../../AppSettings';


export class Question
{
    private _question_id:number;
    public get Question_id():number
    {
        return this._question_id;
    }
    public set Question_id(value:number)
    {
        this._question_id = value;
    }
    
    private _question_text:string;
    public get Question_text():string
    {
        return this._question_text;
    }
    public set Question_text(value:string)
    {
        this._question_text = value;
    }
    
    private _question_image:string;
    public get Question_image():string
    {
        return this._question_image;
    }
    public set Question_image(value:string)
    {
        this._question_image = value;
    }
    
    private _option_1:string;
    public get Option_1():string
    {
        return this._option_1;
    }
    public set Option_1(value:string)
    {
        this._option_1 = value;
    }
    
    private _option_2:string;
    public get Option_2():string
    {
        return this._option_2;
    }
    public set Option_2(value:string)
    {
        this._option_2 = value;
    }
    
    private _option_3:string;
    public get Option_3():string
    {
        return this._option_3;
    }
    public set Option_3(value:string)
    {
        this._option_3 = value;
    }
    
    private _option_4:string;
    public get Option_4():string
    {
        return this._option_4;
    }
    public set Option_4(value:string)
    {
        this._option_4 = value;
    }
    
    private _option_5:string;
    public get Option_5():string
    {
        return this._option_5;
    }
    public set Option_5(value:string)
    {
        this._option_5 = value;
    }
    
    private _option_6:string;
    public get Option_6():string
    {
        return this._option_6;
    }
    public set Option_6(value:string)
    {
        this._option_6 = value;
    }

    private _option_7:string;
    public get Option_7():string
    {
        return this._option_7;
    }
    public set Option_7(value:string)
    {
        this._option_7 = value;
    }

    private _option_8:string;
    public get Option_8():string
    {
        return this._option_8;
    }
    public set Option_8(value:string)
    {
        this._option_8 = value;
    }
    
    private _correct_option:number;
    public get Correct_option():number
    {
        return this._correct_option;
    }
    public set Correct_option(value:number)
    {
        this._correct_option = value;
    }
    
    private _correct_answer:string;
    public get Correct_answer():string
    {
        return this._correct_answer;
    }
    public set Correct_answer(value:string)
    {
        this._correct_answer = value;
    }
    
    private _explanation_text:string;
    public get Explanation_text():string
    {
        return this._explanation_text;
    }
    public set Explanation_text(value:string)
    {
        this._explanation_text = value;
    }
    
    private _explanation_image:string;
    public get Explanation_image():string
    {
        return this._explanation_image;
    }
    public set Explanation_image(value:string)
    {
        this._explanation_image = value;
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
    
    private _test_id:number ;
    public get Test_id():number
    {
        return this._test_id;
    }
    public set Test_id(value:number)
    {
        this._test_id = value;
    }
    
    private _product_id:number ;
    public get Product_id():number
    {
        return this._product_id;
    }
    public set Product_id(value:number)
    {
        this._product_id = value;
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

    private _allow_in_preview:boolean = null;
    public get Allow_in_preview():boolean
    {
        return this._allow_in_preview;
    }
    public set Allow_in_preview(value:boolean)
    {
        this._allow_in_preview = value;
    }
    
    private  _question_group_id:number = null;
    public get Question_group_id():number
    {
        return this._question_group_id;
    }
        public set Question_group_id(value:number)
    {
        this._question_group_id = value;
    }
    
    private _question_tag:string;
    public get Question_tag():string
    {
        return this._question_tag;
    }
    public set Question_tag(value:string)
    {
        this._question_tag = value;
    }
    
    private _subject:string;
    public get Subject():string
    {
        return this._subject;
    }
    public set Subject(value:string)
    {
        this._subject = value;
    }
    
    private _difficulty:string;
    public get Difficulty():string
    {
        return this._difficulty;
    }
    public set Difficulty(value:string)
    {
        this._difficulty = value;
    }
    
    private _instruction_text:string;
    public get Instruction_text():string
    {
        return this._instruction_text;
    }
    public set Instruction_text(value:string)
    {
        this._instruction_text = value;
    }

    private _average_time_taken:number;
    public get Average_time_taken():number
    {
        return this._average_time_taken;
    }
    public set Average_time_taken(value:number)
    {
        this._average_time_taken = value;
    }
    
    public GetXml():string
    {
        var xml:string = "<question>\n";
        xml += "\t<correct-option>" + this.Correct_option + "</correct-option>\n";
        xml += "\t<option-1>" + this.Option_1 + "</option-1>\n";
        xml += "\t<option-2>" + this.Option_2 + "</option-2>\n";
        xml += "\t<option-3>" + this.Option_3 + "</option-3>\n";
        xml += "\t<option-4>" + this.Option_4 + "</option-4>\n";
        xml += "\t<question-text>" + this.Question_text + "</question-text>\n";
        xml += "</question>";
        
        return xml;
    }
    
    public GetXml2(courseId:number):string
    {
        var questionGroup:Question_Group;
        if(this.Question_group_id != null)
        {
            questionGroup = UberApplication.GetInstance().GetQuestionGroupById(this.Question_group_id);
        }

        var xml:string = "<question>\n";
        xml += "\t<question_id>" + this.Question_id + "</question_id>\n";
        xml += "\t<question_type>" + UberApplication.GetInstance().getCodeNameById(this.Type_id) + "</question_type>\n";

        xml += "\t<correct-answer>" + this.Correct_answer + "</correct-answer>\n";
        if (this.Option_1 != null && this.Option_1.length > 0)
        {
            let temp_option_1:string = this.processPipedImages(this.Option_1, courseId);
			xml += "\t<option-1>" + StringUtils.EncodeToJSONUri(temp_option_1) + "</option-1>\n";
        }
        if (this.Option_2 != null && this.Option_2.length > 0)
        {
            let temp_option_2:string = this.processPipedImages(this.Option_2, courseId);
			xml += "\t<option-2>" + StringUtils.EncodeToJSONUri(temp_option_2) + "</option-2>\n";
        }
        if (this.Option_3 != null && this.Option_3.length > 0)
        {
            let temp_option_3:string = this.processPipedImages(this.Option_3, courseId);
			xml += "\t<option-3>" + StringUtils.EncodeToJSONUri(temp_option_3) + "</option-3>\n";
        }
        if (this.Option_4 != null && this.Option_4.length > 0)
        {
            let temp_option_4:string = this.processPipedImages(this.Option_4, courseId);
			xml += "\t<option-4>" + StringUtils.EncodeToJSONUri(temp_option_4) + "</option-4>\n";
        }
        if (this.Option_5 != null && this.Option_5.length > 0)
        {
            let temp_option_5:string = this.processPipedImages(this.Option_5, courseId);
			xml += "\t<option-5>" + StringUtils.EncodeToJSONUri(temp_option_5) + "</option-5>\n";
        }
        if (this.Option_6 != null && this.Option_6.length > 0)
        {
            let temp_option_6:string = this.processPipedImages(this.Option_6, courseId);
			xml += "\t<option-6>" + StringUtils.EncodeToJSONUri(temp_option_6) + "</option-6>\n";
        }
        if (this.Option_7 != null && this.Option_7.length > 0)
        {
            let temp_option_7:string = this.processPipedImages(this.Option_7, courseId);
			xml += "\t<option-7>" + StringUtils.EncodeToJSONUri(temp_option_7) + "</option-7>\n";
        }
        if (this.Option_8 != null && this.Option_8.length > 0)
        {
            let temp_option_8:string = this.processPipedImages(this.Option_8, courseId);
			xml += "\t<option-8>" + StringUtils.EncodeToJSONUri(temp_option_8) + "</option-8>\n";
        }
        
        if (this.Question_image != null && this.Question_image.length > 0)
            xml += "\t<question-image>" + this.Question_image + "</question-image>\n";
        
        if (this.Explanation_image != null && this.Explanation_image.length > 0)
            xml += "\t<explanation-image>" + this.Explanation_image + "</explanation-image>\n";
        if (this.Explanation_video != null && this.Explanation_video.length > 0)
            xml += "\t<explanation-video>" + this.Explanation_video + "</explanation-video>\n";
        var userAnswer:String = UberApplication.GetInstance().getQuestionAnswer(this.Question_id);
        if (userAnswer.length > 0)
            xml += "\t<user_answer>" + UberApplication.GetInstance().getQuestionAnswer(this.Question_id) + "</user_answer>\n";
        
        
        var temp_explanation_text:string = this.processPipedImages(this.Explanation_text, courseId);
		xml += "\t<explanation-text>" + StringUtils.EncodeToJSONUri(temp_explanation_text) + "</explanation-text>\n";

        if(questionGroup)
        {
            xml += "\t<group-text>" + StringUtils.EncodeToJSONUri(questionGroup.Group_text) + "</group-text>\n";
            xml += "\t<group-explanation-video>" + questionGroup.Explanation_video + "</group-explanation-video>\n";
        }
        var temp_question_text:string = this.processPipedImages(this.Question_text, courseId);
		xml += "\t<question-text>" + StringUtils.EncodeToJSONUri(temp_question_text) + "</question-text>\n";
        xml += "</question>";
        
        return xml;
    }

    private processPipedImages(val:string, courseId:number):string
    {
        var imgArr:string[] = val.match(/\[IMG\[[^\]\s]+\]\]/ig);
        if (imgArr != null)
        {
            for (var imgSyntax of imgArr)
            {
                var name:string = imgSyntax.substring(5, imgSyntax.length - 2);
                var url:string = url = "<img class='questionImg' src='" + AppSettings.GetResourcelocation2(false) + "PrepEd/questionData/" + this._question_id + "/" + name + "' /> ";
                
                val = val.replace(imgSyntax, url);
            }
        }
        return val;
    }
    
    private _adaptive_streaming_url:string;
    public get Adaptive_streaming_url():string
    {
        return this._adaptive_streaming_url;
    }
    public set Adaptive_streaming_url(value:string)
    {
        this._adaptive_streaming_url = value;
    }

    public static fromJson(jsonObject:any):Question
    {
        var retVal:Question = new Question();
        retVal.Question_id = jsonObject.Question_id;
        retVal.Question_text = StringUtils.DecodeFromJSONUri(jsonObject.Question_text);
        retVal.Question_image = StringUtils.DecodeFromJSONUri(jsonObject.Question_image);			
        retVal.Option_3 = StringUtils.DecodeFromJSONUri(jsonObject.Option_3);
        retVal.Option_4 = StringUtils.DecodeFromJSONUri(jsonObject.Option_4);
        retVal.Option_5 = StringUtils.DecodeFromJSONUri(jsonObject.Option_5);
        retVal.Option_6 = StringUtils.DecodeFromJSONUri(jsonObject.Option_6);
        retVal.Option_7 = StringUtils.DecodeFromJSONUri(jsonObject.Option_7);
        retVal.Option_8 = StringUtils.DecodeFromJSONUri(jsonObject.Option_8);
        retVal.Correct_option = jsonObject.Correct_option;
        retVal.Correct_answer = StringUtils.DecodeFromJSONUri(jsonObject.Correct_answer);
        retVal.Explanation_text = StringUtils.DecodeFromJSONUri(jsonObject.Explanation_text);
        retVal.Explanation_image = StringUtils.DecodeFromJSONUri(jsonObject.Explanation_image);
        retVal.Explanation_video = StringUtils.DecodeFromJSONUri(jsonObject.Explanation_video);
        retVal.Type_id = jsonObject.Type_id;
        if (jsonObject.Test_id != null)
        {
            retVal.Test_id = jsonObject.Test_id;
        }
        
        if (jsonObject.Product_id != null)
        {
            retVal.Product_id = jsonObject.Product_id;
        }
        
        if (jsonObject.Option_1 != null)
        {
            retVal.Option_1 = StringUtils.DecodeFromJSONUri(jsonObject.Option_1);				
        }
        
        if (jsonObject.Option_2 != null)
        {
            retVal.Option_2 = StringUtils.DecodeFromJSONUri(jsonObject.Option_2);
        }

        //PREP ED
        if (jsonObject.Allow_in_preview != null)
        {
            retVal.Allow_in_preview = jsonObject.Allow_in_preview;
        }

        if (jsonObject.Product_id != null)
        {
            retVal.Product_id = jsonObject.Product_id;
        }

        if (jsonObject.Question_group_id != null)
        {
            retVal.Question_group_id = jsonObject.Question_group_id;
        }

        if (jsonObject.Average_time_taken != null)
        {
            retVal.Average_time_taken = jsonObject.Average_time_taken;
        }

        retVal.Question_tag = jsonObject.Question_tag;
        retVal.Subject = jsonObject.subject;
        retVal.Difficulty = jsonObject.Difficulty;
        retVal.Instruction_text = StringUtils.DecodeFromJSONUri(jsonObject.Instruction_text);
        
        if (jsonObject.Adaptive_streaming_url != null)
        {
            retVal.Adaptive_streaming_url = jsonObject.Adaptive_streaming_url;
        }

        return retVal;
    }
}