import { UberApplicationEvent } from './UberApplicationEvent';

export class UserAnswerEvent extends UberApplicationEvent
{
    public static QUESTION_ANSWERED:string = "questionAnswered";
    
    private _questionId:number;
    public get Question_id():number
    {
        return this._questionId;
    }
    
    private _answer:string;
    public get Answer():string
    {
        return this._answer;
    }
    
    private _correct:boolean;
    public get Correct():boolean
    {
        return this._correct;
    }
    
    constructor(type:string, questionId:number, answer:string, correct:boolean)
    {
        super(type);
        this._questionId = questionId;
        this._answer = answer;
        this._correct = correct;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new UserAnswerEvent(this.type, this._questionId, this._answer, this._correct);
    }
}